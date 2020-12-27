const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const bookSchema= new Schema({
  name:String,
  genre: String,
  authorId:String
});


//export this model under bookSchema
module.exports=mongoose.model("Book",bookSchema);
