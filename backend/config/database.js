import mongoose from "mongoose"

// const connectDB = async ()=>{
//   try{
//     const mongourl = "<your_mongo_db_link>"
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

  const mongourl = "<your_mongo_db_link>"

  const conn = mongoose.connect(mongourl, {
    // useUnifiedTopology: true,
  })
  .then(()=>{
    console.log(`Connected to MongoDB Server`)
  })
  .catch(err => console.log(err))
}


export default connectDB;
