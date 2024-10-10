const express=require("express")
const app =express()
require("dotenv").config();
require("./connection/conn")
const cors=require("cors");
const User=require("./routes/user")
const Book=require("./routes/book")
const favourites=require("./routes/favourite")
const cart=require("./routes/cart")
const order=require("./routes/order")
app.use(express.json());
app.use(cors());
//routes
app.use("/ap1/v1",User);
app.use("/ap1/v1",Book);
app.use("/ap1/v1",favourites);
app.use("/ap1/v1",cart);
app.use("/ap1/v1",order);

//creating port
app.listen(process.env.PORT,()=>{
    console.log(`Server started at port ${process.env.PORT}`)
})