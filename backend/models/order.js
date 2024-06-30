const mongoose=require("mongoose");

const order =new mongoose.Schema(
    {
        user:{
            type:mongoose.Types.ObjectId,
            ref:"user",
        },
        book:{
            type: mongoose.Types.ObjectId,
            ref:"books",
        },
        status:{
            type: String,
            default: "Order placed",
            enum:["Order Placed","out for delivery","delivered","canceled"],
        },
       

},{timestamps:true}
);

module.exports= new mongoose.model("order",order);
