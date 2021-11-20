const Jwt = require('jsonwebtoken');

const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token;
    if(authHeader){
        var token = authHeader.split(" ")[1];
        Jwt.verify(token,process.env.Jwt,(err,data)=>{
            if(err){
                res.status(403).json("Token Invalid");
            }
            req.data = data;
            next();
        })
    }else{
        res.status(401).json('Not Authenticated!');
    }
}

const verifyAndAuthenticate = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.params.id === req.data.id || req.data.isAdmin){
            next();
        }else{
            res.status(403).json("You're not authenticated to access this!");
        }
    })
}
const verifyAndAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.data.isAdmin){
            next();
        }else{
            res.status(403).json("You're not authenticated to access this!");
        }
    })
}

module.exports = {verifyToken,verifyAndAuthenticate,verifyAndAdmin};