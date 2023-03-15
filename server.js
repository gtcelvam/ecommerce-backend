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
const categoryRouter = require("./router/category");

//env file
dotenv.config();
var URL = process.env.Access_Url;
//process.env.Access_Url ;

// Suppress DeprecationWarnings related to collection.ensureIndex()
process.on('warning', (warning) => {
  if (warning.name === 'DeprecationWarning' && warning.message.includes('collection.ensureIndex')) {
    // Suppress the warning
    return;
  }
  // Handle other warnings as normal
  console.warn(warning);
});

//DB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(URL,{
    useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected : ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

//Body Parser
app.use(express.json());
//Secure transition
app.get("/",(req,res)=>{
  res.status(200).json({message :  "Working fine"})
})

app.use(cors());
app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use("/api/cart",cartRouter);
app.use("/api/product",productRouter);
app.use("/api/order",orderRouter);
app.use("/api/category",categoryRouter);
var port = process.env.PORT || 2000;

//Connect to the database before listening
connectDB().then(() => {
    app.listen(port,()=>{
        console.log("Server connected succesfully");
    })
})

