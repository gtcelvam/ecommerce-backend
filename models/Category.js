const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title :{type:String,required:true,unique:true},
    img : {type:String,required:true},
    category:{type:Array,required:true}
})



module.exports = mongoose.model('Catergory',categorySchema);