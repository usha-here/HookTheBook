const router =require("express").Router();
const User=require("../models/user");
const {authenticateToken}=require("./userAuth")
const Book=require("../models/book")
const order =require("../models/order")


//place order
router.post("/placeorder",authenticateToken,async(req,res)=>{
    try{
        const {id} =req.headers
        const {order} =req.body
        for(const orderData of order){
            const newOrder=newOrder({user:id,book:orderData._id});
            const orderDataFromDb=await newOrder.save();

            //saving  order in user model
            await User.findByIdAndUpdate(id,{
                $push:{orders:orderDataFromDb._id}
            })
            //clearing cart
            await User.findByIdAndUpdate(id,{
                $pull:{cart:orderData._id}
            })
        }
        return res.json({
            status:"success",
            message:"order placed successfully"
        })
    }catch(error){
        return res.status(500).json({message:"an error occcured"})
    }
})


//get order history of a particular user
router.get("/getorderhistory",authenticateToken,async(req,res)=>{
    try{
        const {id} =req.headers
        const userData=await User.findById(id).populate({
            path:"orders",
            populate:{path:"book"}
        })
        const ordersData=userData.orders.reverse()
        return res.json({
            status:"success",
            orders:ordersData
        })}
    catch(error){
        return res.status(500).json({message:"an error occcured"})
    }
})



//get all orders for admin
router.get("/getallorders",authenticateToken,async(req,res)=>{
    try{
        const userData=await order.find().populate({
            path:"book",
        }).populate({
            path:"user",
        }).sort({
            createdAt:-1})
            return res.json({
                status:"success",
                data:userData,})
    }
    catch(error){
        return res.status(500).json({message:"an error occcured"})
    }
})

//update the condition of order by admin if in transaction or delivered etc
router.put("/updateorderstatus/:id",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers
        await order.findByIdAndUpdate(id,{
            status:req.body.status
        })
        return res.json({
            status:"success",
            message:"status updated succesfully"})
    }catch(error){
        return res.status(500).json({message:"an error occcured"})
    }
})
module.exports=router