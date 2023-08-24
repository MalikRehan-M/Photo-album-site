const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {type:String,unique:true},
  email: String,
  role: String,
  password: String,
},{
    versionKey:false
});
const UserModel=mongoose.model("user",userSchema)
module.exports={
    UserModel
}
