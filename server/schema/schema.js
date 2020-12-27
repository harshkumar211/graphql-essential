const graphql = require('graphql');

//for quick lookup in the array we use loadash
const _=require('lodash');
//two object book and author
const Book  =require('../models/book');
const Author=require('../models/author');

//we are using GraphQLString and GraphQLType from the graphQL module
const {GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
GraphQLInt,
GraphQLList,
GraphQLNonNull} = graphql;


//GraphQLID it can take any type string Integer while doing query

//dummy data

/* var books =[
  {name:'Name of the Wind',genre:'Fantasy',id:'1',authorId:'1'},
  {name:'The Final Empire',genre:'Fantasy',id:'2',authorId:'2'},
  {name:'The Long Earth',genre:'Sci-Fi',id:'3',authorId:'3'},
  {name:'There is love',genre:'Fantasy',id:'1',authorId:'1'},
  {name:'You ARE HERO',genre:'Fantasy',id:'2',authorId:'2'},
  {name:'My Life My Rules',genre:'Sci-Fi',id:'3',authorId:'3'}
];*/

//define dummy author type
/*
var authors=[
  {name:'Harsh',age:29,id:'1'},
  {name:'Arijit',age:30,id:'2'},
  {name:'Siddharth',age:28,id:'3'}
]
*/
// define our custom BookType


const BookType = new GraphQLObjectType({
  name:'Book',
  fields:()=>({
    id: {type: GraphQLID},
    name:{type:GraphQLString},
    genre:{type:GraphQLString},
    //defining sub child with author for a given book
    author:{
      type:AuthorType,
      resolve(parent,args){
        console.log(parent);
        //return _.find(authors,{id:parent.authorId})
        return Author.findById(parent.authorId);
      }
    }
  })
});

//define custom AuthType
const AuthorType = new GraphQLObjectType({
  name:'Author',
  fields:()=>({   //defining this as a function, otherwise it will report error if the
    //relevant data type is not defined before its reference. We are marking as a function
    //so that it will come into picture only when it is invoked.
    id: {type: GraphQLID},
    name:{type:GraphQLString},
    age:{type:GraphQLInt},
    books:{
      type:new GraphQLList(BookType),
      resolve(parent,args){
        console.log(parent);
        //return _.filter(books,{authorId:parent.id})
        //looks for all books with this authorId
        return Book.find({authorId:parent.id});
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name:'RootQueryType',
  fields:{
    book:{
      type:BookType,
      args:{id:{type:GraphQLID}}, //pass id to get some book
      resolve(parent,args){
        //code to get data from db or other source
        //console.log(typeof(args.id))
        //return _.find(books,{id:args.id});
        console.log(args.id);
        return Book.findById(args.id);

      }
    },
    author:{
      type:AuthorType,
      args:{id:{type:GraphQLID}},
      resolve(parent,args){
        //return _.find(authors,{id:args.id});
        return Author.findById(args.id);
      }
    },
    books:{
      type: new GraphQLList(BookType),
      resolve(parent,args){
        //return books;
        return Book.find({}); //return all the books
      }
    },
    authors:{
      type: new GraphQLList(AuthorType),
      resolve(parent,args){
        //return authors;
        return Author.find({}); //return all the authors
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args){
              console.log(typeof(Author));
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
              console.log(typeof(Book));
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
});
//rootQuery to list all the books or all the authors
module.exports = new GraphQLSchema({
  query:RootQuery,
  mutation:Mutation
});
