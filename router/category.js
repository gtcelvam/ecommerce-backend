const categoryRoute = require('express').Router();
const schemaTemplate = require("../models/Category");
const {verifyAndAdmin} = require("./verifyToken");

//Add Category
categoryRoute.post('/add',verifyAndAdmin,async (req,res)=>{
    var addCategory = new schemaTemplate(req.body);
    try {
        var categoryData = await addCategory.save();
        res.status(200).json(categoryData);
    } catch (error) {
        res.status(401).json(error);
    }
});

categoryRoute.get("/",async(req,res)=>{
    try {
        category = await schemaTemplate.find();
        res.status(200).json(category);
    } catch (error) {
        res.status(401).json(error);
    }
})


module.exports = categoryRoute;