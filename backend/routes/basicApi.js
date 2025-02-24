import { Router } from 'express';
import Item from '../models/Item.js';

const router = Router();

let items = []; // In-memory storage for simplicity

// GET all items
router.get('/items', (req, res) => {
  res.status(200).json({ success: true, data: items });
});

//  GET one item
router.get('/items/:id', (req, res) => {
  const {id} = req.params;
  const item = items.find(item => item.id === id);

  if(!item){
    res.status(404).json({success: false, message: "Item not found" })
  }
  res.status(200).json({success: true, data: item.title })
});



// POST a new item
let x = 0
router.post('/items', (req, res) => {

  const newItem = { id: new Date().getTime().toString(), title: req.body.title };

  items.push(newItem);
  res.status(201).json({ success: true, data: newItem });
});

// Proper format API example
router.post('/post', async (req, res) => {
  console.log(req.body);
  const { data } = req.body;

  try{
    if (data === "roushan") {
      return res.json({ status: "ok" });
    }
    else{
      res.status(400).json({ status: "error", message: "Invalid data" });
    }
  }
  catch(error){
    res.status(500).json({ status: "error", message: "Internal server error"})
  }
});


// PUT to update an item
router.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  console.log(title)
  const item = items.find(item => item.id === id);

  try{
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    else{
      item.title = title;
      res.status(200).json({ success: true, data: item });
    }
  }
  catch(error){
    res.status(500).json({success: error, message: error})
  }
});
// http://localhost:5000/api/items/1720332547794



// DELETE an item
router.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const index = items.findIndex(item => item.id === id);
  try{
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    else{
      items.splice(index, 1);
      res.status(200).json({ success: true, message: 'Item deleted' });
    }
  } 
  catch(error){
    res.status(500).json({success: error, message: error})
  }
});

export default router;
