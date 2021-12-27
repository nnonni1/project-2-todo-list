const {Schema , model} =require("mongoose");

const userSchema = new Schema({
 email: {type:String ,requied:true, uniqe:true},
 password: {type:String ,requied:true},
 username: String ,
 

})

const Users = model ("User",userSchema);
module.exports = Users;