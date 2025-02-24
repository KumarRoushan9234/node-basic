import mongoose from "mongoose";

const userDetailsSchema = new mongoose.Schema({
    name: { 
      type: String, 
      required: true 
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      // validate: {
      //   validator: function(v) {
      //     return v.length === 10;
      //   },
      //   message: props => `${props.value} is not a valid phone number!`
      // }
      required: true
    }  
},{
  collection: "UserInfo"
})

const userDetails = mongoose.model('UserDetails',userDetailsSchema)

export default userDetails