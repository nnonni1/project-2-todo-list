const {Schema , model} =require("mongoose");

const todoShema=new Schema({
    title: String,
    isCompleted: Boolean
})

//model 1
const Todo=model('Todo',todoShema)

module.exports = Todo