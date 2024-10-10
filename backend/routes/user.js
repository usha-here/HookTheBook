const router =require("express").Router();
const User=require("../models/user");
const bcrypt=require("bcryptjs")
const jwt =require("jsonwebtoken")
const {authenticateToken}=require("./userAuth")

//signup signin using post
router.post("/sign-up",async(req,res)=>{
    try{
        const {username,email,password,address}=req.body;
        //validations
        if(username.length<4){
            return res.status(400).json({error:"Username must be at least 4 characters"})
        }
        //check if username already exists
        const existingUsername=await User.findOne({username:username}) //findOne: This is a method provided by Mongoose, a popular Object Data Modeling (ODM) library for MongoDB.
        if (existingUsername){
            return res.status(400).json({error:"Username already exists"})
        }
        //check if email already exists
        const existingEmail=await User.findOne({email:email})  //findOne is used to retrieve a single document from the collection that matches the specified filter.
        if (existingEmail){
            return res.status(400).json({error:"Email already exists"})
        }
        
        if(password.length<=6){
            return res.status(400).json({error:"Password must be at least 6 characters"})
        }
        const hashPass= await bcrypt.hash(password,10);

        const newUser= new User({       //from models User
            username:username,
            email:email,
            password:hashPass,
            address:address,
        })
        await newUser.save();
        return res.status(200).json({message:"Sign-Up successfully"})
}catch(error){
        res.status(500).json({error:"internal server error"})
}    //400(error due to user wrong input) //200(success)
})

//sign-in
router.post("/sign-in",async(req,res)=>{
    try{
        const {username,password}=req.body;            //password added by the user right now

        const existingUser= await User.findOne({username})
        if(!existingUser){
            res.status(400).json({error:"invalid credentials"})
        }
        await bcrypt.compare(password,existingUser.password,(err,data)=>{    //existingUser.password = that is already present in database
            if(data){
                const authClaims=[
                    {name: existingUser.username},
                    {role: existingUser.role},
                ]
                const token =jwt.sign({authClaims},"bookStore123",{
                    expiresIn: "30d"
                })
                res.status(200).json({ 
                    id:existingUser._id,
                    role:existingUser.role,
                    token:token,
                })
            }
            else{
                res.status(400).json({error:"invalid credentials"})
            }
        })
        }
        catch(error){
        res.status(500).json({error:"internal server error"})
}    //400(error due to user wrong input) //200(success)
})


//get user information     using get command
router.get("/get-user-information",authenticateToken, async(req,res)=>{   //authenticateToken func will go to userAuth.js file ->run it ->next()->will take to async(req,res)
    try{
        const {id}=req.headers;
        const data=await User.findById(id).select('-password'); //password is not shown in database
        return res.status(200).json(data);


}catch(error){
    res.status(500).json({message:"internal server error"})
}

})


//api for update address  using put command
router.put("/update-address",authenticateToken,async(req,res)=>{
        try{
            const {id}=req.headers;
            const {address}=req.body;
            await User.findByIdAndUpdate(id,{address:address})
            return res.status(200).json({message:"Address updated successfully"});


        }catch(error){
            res.status(500).json({message:"internal server error"})
        }
})

module.exports=router;
