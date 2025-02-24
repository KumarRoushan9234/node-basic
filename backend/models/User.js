import mongoose from "mongoose";

const userInfoSchema = new mongoose.Schema({
  fname:{
    type: String,
    required: true
  },
  lname:{
    type: String,
    required: false,
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  phone:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  }
},{
  collection:"UserInfo"
})

const userInfo = mongoose.model("UserInfo",userInfoSchema);



export default userInfo;