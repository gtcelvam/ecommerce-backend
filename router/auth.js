const authRoute = require('express').Router();
const schemaTemplate = require("../models/User");
//For password protection
const CryptoJS = require('crypto-js');
//For user Authentication
const jwt = require('jsonwebtoken');


authRoute.post('/register',async (req,res)=>{
    var userValue = new schemaTemplate({
        name : req.body.name,
        email : req.body.email,
        password : CryptoJS.AES.encrypt(req.body.password, process.env.Password).toString() 
    });
    try {
        const savedUser = await userValue.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json(error)
    }
});

authRoute.post('/login',async(req,res)=>{
    try {
        var user = await schemaTemplate.findOne({name : req.body.name});
        if(!user){
           return res.status(401).json("Wrong Credentials");
        }else{
            const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.Password);
            const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
            if(originalPassword !== req.body.password){
                return res.status(401).json("Wrong Credentials");
            }
            const {password,...other} = user._doc;
            const accesstoken = jwt.sign({
                id : user._id,
                isAdmin : user.isAdmin
            },process.env.Jwt,{expiresIn : "3d"});
            res.status(200).json({...other,accesstoken});    
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = authRoute;