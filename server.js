const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const routes = require("./routers");

//env file
dotenv.config();
var URL = process.env.Access_Url;

//DB Connection
mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true},()=>{
    console.log("Connected with DB...")})
//Body Parser
app.use(express.json());
//Secure transition
app.use(cors());
app.use("/app",routes);
var port = process.env.PORT || 2000
app.listen(port,()=>{
    console.log("Server connected succesfully");
})