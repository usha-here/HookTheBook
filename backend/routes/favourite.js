const router =require("express").Router();
const User=require("../models/user");
const {authenticateToken}=require("./userAuth")

//add book to favourite      
router.put("/add-book-fav",authenticateToken,async(req,res)=>{
    try{
        const{bookid,id}=req.headers;
        const userData=await User.findById(id)
        const isBookFavourite=userData.favourites.includes(bookid);
        if(isBookFavourite){
            return res.status(200).json({message:"book is already in fav"})
        }
        await User.findByIdAndUpdate(id,{$push:{favourites:bookid}})   //$push because of array 
        return res.status(200).json({message:"book added to favorite"})
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
})

//delete a favourite book
router.put("/remove-fav-book",authenticateToken,async(req,res)=>{
    try{
        const{bookid,id}=req.headers;
        const userData=await User.findById(id)
        const isBookFavourite=userData.favourites.includes(bookid);
        if(isBookFavourite){
            await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}}) 
        }
        return res.status(200).json({message:"book removed from favorite"})
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
})

//show all fav books in the profile
router.get("/show-fav-books",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;   
        const userData=await User.findById(id).populate("favourites") //if we will not populate then only fav book id will be shown not all data 
        const favoritebooks=userData.favourites;
        return res.json({
            status:"Success",
            data:favoritebooks,
        })
    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
})
module.exports=router;
