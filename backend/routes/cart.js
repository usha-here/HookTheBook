const router =require("express").Router();
const User=require("../models/user");
const {authenticateToken}=require("./userAuth")

//move to cart
router.put("/add-to-cart",authenticateToken,async(req,res)=>{
    try{
        const{bookid,id}=req.headers;
        const userData=await User.findById(id)
        const isBookFavourited=userData.cart.includes(bookid);
        if(isBookFavourited){
            return res.status(200).json({
                status:"success",
                message:"book is already in cart"})
        }
        await User.findByIdAndUpdate(id,{$push:{cart:bookid}})   //$push because of array 
        return res.status(200).json({
            status:"success",
            message:"book added to cart"})
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
})

//delete from cart
router.put("/delete-from-cart/:bookid",authenticateToken,async(req,res)=>{
    try{
        const{bookid,id}=req.headers;
        await User.findByIdAndUpdate(id,
            {$pull:{cart:bookid}})   //$push because of array 
        return res.status(200).json({
        status:"success",
        message:"book removed from cart"})
}
catch(error){
    res.status(500).json({message:"Internal server error"});
}
})
//get cart of a particular user
router.get("/get-cart",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        const userData=await User.findById(id).populate("cart")
        const cart=userData.cart.reverse();
        return res.json({
            status:"Success",
            data:cart,
        })
    }
    catch(error){
        return res.status(500).json({message:"Cart not found"})
    }


})

module.exports=router;