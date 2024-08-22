//specifically for admin role

const router =require("express").Router();
const User=require("../models/user");
const jwt =require("jsonwebtoken")
const Book=require("../models/book");
const {authenticateToken}=require("./userAuth")


//add book by the admin
router.post("/add-book",authenticateToken,async(req,res)=>{
    try{
        const {id} =req.headers;   //check through id if user or admin
        const user= await User.findById(id)
        if(user.role!=="admin"){
            return res.status(400).json({message:"Unauthorized access to perform admin work"})
        }

        const book=new Book({
            url: req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language,
        });
        await book.save();
        res.status(200).json({message:"Book added successfully"})
}catch(error){
    res.status(500).json({message:"internal server error"})
}
})

//update book
router.put("/update-book",authenticateToken,async(req,res)=>{
    try{
        const {bookid}=req.headers;
        await Book.findByIdAndUpdate(bookid,{
            url: req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language,
        })
        return res.status(200).json({message:"Book updated successfully"});


    }catch(error){
        res.status(500).json({message:"An error occured"})
    }
})

// api to delete the book
router.delete("/delete-book",authenticateToken,async(req,res)=>{
    try{
        const{bookid}=req.headers;
        await Book.findByIdAndDelete(bookid)
        return res.status(200).json({message:"Book deleted successfully"})
    }catch(error){
        res.status(500).json({message:"An error occured"})
    }

})

//get all books api  with limited no of books to be shown
router.get("/get-all-books", async(req,res)=>{
    try{
        const books=await Book.find().sort({createdAt:-1}).limit(4);//for recently added
        return res.json({
            status:"Success",
            data:books,});
}catch(error){
    res.status(500).json({message:"internal server error"})
}

})

//get book by id to fetch a particular book
router.get("/get-book/:id",async(req,res)=>{
    try{
        const {id}=req.params;   //req headers can also be used
        const book=await Book.findById(id)
        return res.json({
            status:"Success",
            data:book,

        })
    }catch(error){
            return res.status(400).json({message:"Book not found"})
        }
    })


module.exports=router;
