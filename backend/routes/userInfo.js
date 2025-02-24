import { Router } from "express";
import userDetails from "../models/userSchema.js";

const router = Router()

// To find all Users
router.get("/", async (req,res)=>{
  try{
    const user = await userDetails.find();

    res.status(200).json(user);
  }
  catch(error){
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
})

// to find single user by id
router.get("/:id", async(req,res)=>{
  const {id} = req.params;
  try{
    const user = await userDetails.findById(id);
    // we use await to synchrose the route so we donot face timeout error
    // to find by id we use => "<Schema>.findById(<id>)"

    if(!user){
      return res.status(404).json({success:false, message:"user not found"})
    }
    else{
      res.status(200).json({success: true, data:user});
    }
  }
  catch(error)
  {
    res.status(500).json({message: error.message})
  }
})

// userDetails.find() returns a Mongoose Query object, not the actual documents. 
// To resolve this, you need to await the execution of the query to get the actual results from MongoDB

// to add new user
router.post("/register", async (req,res)=>{
  const { name, email, phone } = req.body
  try{

    // const newUser = new userDetails({name,email,phone});
    // await newUser.save();
    // res.status(201).json({data: newUser});

    const newUser = await userDetails.create(
      { name:name,
        email:email,
        phone:phone}
    )
    res.status(201).json({message: `Hello ${newUser.name}`})
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
})

// To change/update a user using id
router.put("/:id", async(req,res)=>{
  const {id} = req.params;
  const {name,email,phone} = req.body;

  try {
    const user = await userDetails.findByIdAndUpdate(id,{
      name:name,
      email:email,
      phone:phone
      },
      {new:true}
    )
    if(!user){
      return res.status(404).json({success:false, message:"user not found"})
    }
    else{
      return res.status(200).json({success:true,data:user})
    }
  }catch (error) {
    res.status(500).json({success:false,message:error.message});
  }
})

// To delete a user based on id
router.delete("/:id", async(req,res)=>{
  const {id} = req.params;
  try{
    const user = await userDetails.findByIdAndDelete(id)
    if(!user){
      return res.status(404).json({success:false, message:"user not found"})
    }
    else{
      return res.status(200).json({success:true,data:user})
    }
  }catch(error){
    res.status(500).json({success:false,message:error.message})
  }
})

export default router;


