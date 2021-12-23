const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId : {type:String,required:true},
    products : [{
        title:{type:String,required:true},
        desc:{type:String},
        categories : {type:Array},
        productId : {type:String,required:true},
        size:{type:String,required:true},
        color:{type:String,required:true},
        quantity : {type:Number,default:1},
        img:{type:String,required:true},
        price:{type:Number,required:true}
    }]
},
{
    timestamps : true
});

module.exports = mongoose.model("Carts",cartSchema);