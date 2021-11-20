const express = require("express");
const userRouter = express.Router();
const schemaTemplate = require("../models/User");
const {verifyAndAuthenticate,verifyAndAdmin} = require("./verifyToken");
//For password protection
const CryptoJS = require('crypto-js');


userRouter.put("/:id",verifyAndAuthenticate,async (req,res)=>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.Password).toString();
    }
    try {
        const updatedData = await schemaTemplate.findByIdAndUpdate(req.params.id,{$set : req.body},{new:true});
        res.status(200).json(updatedData);
    } catch (error) {
        res.status(500).json(error);
    }
});

userRouter.delete("/:id",verifyAndAuthenticate,async (req,res)=>{
    try {
        await schemaTemplate.findByIdAndDelete(req.params.id);
        res.status(200).json("User Removed Successfully!");
    } catch (error) {
        res.status(500).json(error);
    }
});

//Get User 
userRouter.get("/find/:id",verifyAndAdmin,async (req,res)=>{
    try {
        const getData = await schemaTemplate.findById(req.params.id);
        var {password,...other} = getData._doc;
        res.status(200).json(other);
    } catch (error) {
        res.status(500).json(error);
    }
});
//Get All User
userRouter.get("/",verifyAndAdmin,async (req,res)=>{
    var query = req.query.new;
    try {
        const users = query ? await schemaTemplate.find().sort({_id:-1}).limit(1) : await schemaTemplate.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
});
module.exports = userRouter; 