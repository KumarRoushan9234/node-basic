import { Router } from "express";
import userInfo from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from 'cors'

const router = Router();
router.use(cors())

const JWT_SECRET = "yevryaobviqbaeviqbv1243546576879hav"
const JWT_EXPIRE = "1h"
// npm install bcryptjs => to encrypt password
// npm install jsonwebtoken

// Signup api
router.post("/register", async(req,res)=>{
  const {fname,lname,email,password,phone} = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await userInfo.findOne({email});

    if(oldUser){
      res.send({success:false,message:"Email already exists."})
    }
    else{
      const newUser = await userInfo.create({
        fname,
        lname,
        email,
        phone,
        password:encryptedPassword
      })
      res.status(200).json({
        success:true,
        message:`Hello ${fname} ${lname}`,
        data:newUser
      });
    }
  }catch(error){
    res.status(500).json({success:false,message:error.message});
  }
})

// Login Api
router.post("/login-user", async(req,res)=>{
  const {email,password} = req.body;

  const user = await userInfo.findOne({email});

  // and since the password was encrypted so we need to decrypt it

  // we also generate jwt token to get user details using that token

  try {
    if(!user){
      return res.send({success:false,message:"User not found."})
    }
    if(await bcrypt.compare(password, user.password)){
      //since it may take time
      const token = jwt.sign({email:user.email},JWT_SECRET,{expiresIn:"2h"});

      if(res.status(201)){
        return res.status(201).json({success:true,message:"Token Recived",data:token})
      }
      else{
        return res.status(400).json({success:false,message:"Error, Token not Recived !"})
      }
    }
  } 
  catch(error){
    res.status(500).json({success:false,message:"Password Wrong"})
  }
})

// Api to get user Details
router.post("/userData", async(req,res)=>{
  const {token} = req.body;
  try{
    const user = jwt.verify(token,JWT_SECRET,(err,res) => {
      if(err){
        return "token expired";
      }
      return res;
    })
    console.log(user)
    if(user==="token expired"){
      return res.send({success:false,message:"token expired"})
    }
    

    const usermail = user.email;

    const data = await userInfo.findOne({email:usermail})
    if(!data){
      return res.status(400).json({success:false,message:"User not found."})
    }
    else{
      return res.status(200).json({success:true,message:"User found.",data:data})
    }
      // .then((data)=>{
      //   res.status(201).json({success: true,message: "User Found",data: data})
      // })
      // .catch((error)=>{
      //   res.status(400).json({success: false,message: error.message})
      // })

    // res.status(201).json({succ})
    
  }catch(error){
    res.status(500).json({success:false,message:error.message});
  }
})

// for Logout functionality from UserDetail.js => directly in frontend component


router.post("/forgot-password", async (req,res)=>{
  const {email} = req.body;
  console.log("Request received to /forgot-password with email:", email);

  try{
    const user = await userInfo.findOne({email});

    if(!user){
      return res.json({success:false,message:"User not found."});
    }
    else{
      const secret = JWT_SECRET + user.password; // why? => to add more security

      const token = jwt.sign({email:user.email, id:user._id},secret,{expiresIn:"5m"}
      );

      const link = `http://localhost:5000/auth/reset-password/${user.id}/${token}`;

      const message = `Your password reset link is here: ${link}`;

      console.log(message);
      alert(message);
      return res.json({success: true,message: "Reset Link Generated!"})
    }
  }  
  catch(error){
    res.status(500).json({success:false,message:error.message});
  }
});

// api for reset link after forgot-password

router.get('/reset-password',(req,res)=>{
  const {id,token} = req.params;
  console.log(req.params);
   
})


export default router;
