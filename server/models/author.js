const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const authorSchema= new Schema({
  name:String,
  age: Number
});


//export this model under bookSchema
module.exports=mongoose.model("Author",authorSchema);
