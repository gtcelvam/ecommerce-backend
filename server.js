const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("./router/user");
const authRouter = require("./router/auth");
const productRouter = require("./router/product");
const cartRouter = require("./router/cart");
const orderRouter = require("./router/order");

//env file
dotenv.config();
var URL = process.env.Access_Url;
//process.env.Access_Url ;

//DB Connection
mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true},()=>{
    console.log("Connected with DB...")})
//Body Parser
app.use(express.json());
//Secure transition
app.use(cors());
app.use("/app/user",userRouter);
app.use("/app/auth",authRouter);
app.use("/app/product",productRouter);
app.use("/app/cart",cartRouter);
app.use("/app/order",orderRouter);
var port = process.env.PORT || 2000
app.listen(port,()=>{
    console.log("Server connected succesfully");
})