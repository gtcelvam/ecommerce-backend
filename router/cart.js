const cartRoute = require('express').Router();
const schemaTemplate = require("../models/Cart");
const {verifyToken,verifyAndAuthenticate,verifyAndAdmin} = require("./verifyToken");

//Create cart
cartRoute.post('/',verifyToken, async (req,res)=>{
    var newCart = new schemaTemplate(req.body);
    try {
        var cartData = await newCart.save();
        res.status(200).json(cartData);
    } catch (error) {
        res.status(500).json(error);
    }
})

//Update cart
cartRoute.put("/:id",verifyAndAuthenticate,async (req,res)=>{
    try {
        const updatedData = await schemaTemplate.findByIdAndUpdate(req.params.id,{$set : req.body},{new:true});
        res.status(200).json(updatedData);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Delete cart
cartRoute.delete("/:id",verifyAndAuthenticate,async (req,res)=>{
    try {
        await schemaTemplate.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart Removed Successfully!");
    } catch (error) {
        res.status(500).json(error);
    }
});

//Get User Cart
cartRoute.get("/find/:userId", async (req,res)=>{
    try {
        var cart = await schemaTemplate.find({userId : req.params.userId}).sort({createdAt : -1});
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error);
    }
})

//Get All Product
cartRoute.get("/",verifyAndAdmin,async (req,res)=>{
    try {
        var cart = schemaTemplate.find();
        res.status(200).json(cart); 
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = cartRoute;