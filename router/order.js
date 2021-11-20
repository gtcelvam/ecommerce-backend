const orderRoute = require('express').Router();
const schemaTemplate = require("../models/Order");
const {verifyToken,verifyAndAuthenticate,verifyAndAdmin} = require("./verifyToken");

//Create order
orderRoute.post('/',verifyToken, async (req,res)=>{
    var newOrder = new schemaTemplate(req.body);
    try {
        var orderData = await newOrder.save();
        res.status(200).json(orderData);
    } catch (error) {
        res.status(500).json(error);
    }
})

//Update order
orderRoute.put("/:id",verifyAndAdmin,async (req,res)=>{
    try {
        const updatedData = await schemaTemplate.findByIdAndUpdate(req.params.id,{$set : req.body},{new:true});
        res.status(200).json(updatedData);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Delete order
orderRoute.delete("/:id",verifyAndAuthenticate,async (req,res)=>{
    try {
        await schemaTemplate.findByIdAndDelete(req.params.id);
        res.status(200).json("Order Removed Successfully!");
    } catch (error) {
        res.status(500).json(error);
    }
});

//Get User Order
orderRoute.get("/find/:userId",verifyAndAuthenticate,async (req,res)=>{
    try {
        var order = await schemaTemplate.find({userId : req.params.userId});
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json(error);
    }
})

//Get All Order
orderRoute.get("/",verifyAndAdmin,async (req,res)=>{
    try {
        var order = schemaTemplate.find();
        res.status(200).json(order); 
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = orderRoute;

