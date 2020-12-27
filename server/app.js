const express=require('express');

const mongoose= require('mongoose');
const graphqlHTTP=require('express-graphql').graphqlHTTP;
const schema=require('./schema/schema')
const app=express();

const cors=require('cors');

//allow cross origin request

app.use(cors());

//connect to mongoose lab database
mongoose.connect('mongodb+srv://harshk:harshk2211@mycluster.ibnra.mongodb.net/test?retryWrites=true&w=majority')

mongoose.connection.once('open',()=>{
  console.log('connected to Mongo DB');
})
app.use('/graphql',graphqlHTTP({
schema,
graphiql:true
}));
app.listen(4000,()=>{ console.log("now listening for request on port 4000")})
