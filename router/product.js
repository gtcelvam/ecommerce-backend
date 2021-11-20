const productRoute = require('express').Router();
const schemaTemplate = require("../models/Product");
const {verifyAndAuthenticate,verifyAndAdmin} = require("./verifyToken");

//Add Product
productRoute.post('/',verifyAndAdmin, async (req,res)=>{
    var newProduct = new schemaTemplate(req.body);
    try {
        var productData = await newProduct.save();
        res.status(200).json(productData);
    } catch (error) {
        res.status(500).json(error);
    }
})

//Update Product
productRoute.put("/:id",verifyAndAdmin,async (req,res)=>{
    try {
        const updatedData = await schemaTemplate.findByIdAndUpdate(req.params.id,{$set : req.body},{new:true});
        res.status(200).json(updatedData);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Delete Product
productRoute.delete("/:id",verifyAndAdmin,async (req,res)=>{
    try {
        await schemaTemplate.findByIdAndDelete(req.params.id);
        res.status(200).json("Product Removed Successfully!");
    } catch (error) {
        res.status(500).json(error);
    }
});

//Get Product
productRoute.get("/:id", async (req,res)=>{
    try {
        var product = await schemaTemplate.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
})

//Get All Product
productRoute.get("/", async (req,res)=>{
    var pNew = req.query.new;
    var pCategory = req.query.category;
    let product;
    try {
        pNew ? product = await schemaTemplate.find().sort({createdAt : -1}).limit(5) : pCategory ? product = await schemaTemplate.find({categories : {$in : [pCategory]}}) : product = await schemaTemplate.find();
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
})
module.exports = productRoute;