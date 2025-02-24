import mongoose from "mongoose"

// const connectDB = async ()=>{
//   try{
//     const mongourl = "mongodb+srv://roushan:roushan@user.ebtzrje.mongodb.net/?retryWrites=true&w=majority&appName=user"
//     const conn = await mongoose.connect(mongourl,{
//       useUnifiedTopology: true,
//     })
//     console.log(`MongoDB Connected`)
//   }
//   catch(error){
//     console.log(`Error : ${error.message}`)
//     process.exit(1)
//   }
// }

const connectDB = ()=>{

  const mongourl = "mongodb+srv://roushan:roushan@user.ebtzrje.mongodb.net/?retryWrites=true&w=majority&appName=user"

  const conn = mongoose.connect(mongourl, {
    // useUnifiedTopology: true,
  })
  .then(()=>{
    console.log(`Connected to MongoDB Server`)
  })
  .catch(err => console.log(err))
}


export default connectDB;