const express = require("express");
const route = express.Router();
const schemaTemplate = require("./schema");

route.post("/signup",(req,res)=>{
    const users = new schemaTemplate({
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    });
    users.save().then(data=> res.json(data)).catch(err => res.json(err));
});

route.get("/signup",(req,res)=>{
    res.send("Hello")
});

module.exports = route;