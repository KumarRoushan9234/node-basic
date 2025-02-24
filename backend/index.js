// import express from 'express';

// const app = express();

// app.listen(5000,()=>{
//   console.log('Server is running on port 5000');
// })

// ----------------------------------------


import express from 'express';
import basicApiRouter from './routes/basicApi.js'
import cors from 'cors';
// import mongoose from 'mongoose';
import connectDB from './config/database.js';

// for using the routes for CURD operation in Item schema
import itemRouter from './routes/item.js'
import userinfoRouter from './routes/userInfo.js'

import authRouter from './routes/auth.js'

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDb connection

// const mongourl = "mongodb+srv://roushan:roushan@user.ebtzrje.mongodb.net/?retryWrites=true&w=majority&appName=user"

// const conn = mongoose.connect(mongourl, { 
//   useNewUrlParser: true,
// }).then(()=>{
//   console.log(`MongoDb connected`);
// })
// .catch(e=>{
//   console.log(e.message);
// })

// Or import variable from a other file   
connectDB();

app.use(cors());
// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
// since we send data in json format
app.use(express.urlencoded({ extended: false }));

// Use the index router for API paths
app.use('/api', basicApiRouter);

// Use the item router for api paths for curd operation in Item Schema 
app.use("/items", itemRouter);

// for user details 
app.use("/users", userinfoRouter);

app.use("/",authRouter);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
