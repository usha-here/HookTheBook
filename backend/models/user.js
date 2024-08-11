const mongoose=require("mongoose");

const user =new mongoose.Schema(
    {
        username:{
            type: String,
            required:true,
            unique:true,
        },
        email:{
            type: String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
            
        },
        address:{
            type:String,
            required:true,
        },
        avatar:{
            type:String,
            default:"https://images.squarespace-cdn.com/content/v1/6425c19e4d543f40fa406953/4e02bc5c-fdec-45d7-8d82-0ef6db9b9ff4/PSR-LA_052423_1x1_Avatar.jpeg?format=1000w"
        },
        role:{
            type:String,
            default:"user",
            enum:["user","admin"],
        },
        favourites:[{
            type:mongoose.Types.ObjectId,
            ref:"books",
        }],
        
        cart:[{
            type:mongoose.Types.ObjectId,
            ref:"books",
        }],
        
        orders:[{
            type:mongoose.Types.ObjectId,
            ref:"order",
        }],

},{timestamps:true}
);

module.exports= new mongoose.model("user",user);
