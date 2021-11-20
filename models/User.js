const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {type : String,required:true,unique:true},
    email : {type : String,required:true,unique:true},
    password : {type : String,required:true},
    isAdmin : {type:Boolean,default:false}
},
{
    timestamps : true
});

userSchema.pre('save',(next)=>{
    console.log("Doc is "+this);
    next();
})
module.exports = mongoose.model("Users",userSchema);