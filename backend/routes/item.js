import {Router} from 'express'
import Item from '../models/Item.js'

const router = Router()

// get all items
router.get('/', async (req, res) =>{
  try{
    // to find all the items in that schema 
    const items = await Item.find();

    res.status(200).json({success: true, data: items})
    console.log("data: "+items)
  }
  catch(error){
    console.log("message: "+error.message)
    res.status(500).json({message: error.message})
  }
})

router.post('/', async(req,res)=>{
  const {title} = req.body;
  try{
    // to make a new item in schema
    const newItem = new Item({title});
    await newItem.save()

    res.status(201).json({success: true, data: newItem,message:"new item saved"})
  }
  catch(error){
    console.log("message: "+error.message)
    res.status(500).json({message: error.message})
  }
})

export default router;