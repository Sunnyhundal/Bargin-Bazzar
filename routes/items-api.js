const express = require('express');
const router = express.Router();
const itemQueries = require('../db/queries/items');

// Read: display all items
router.get('/items', (req, res) => {
  userQueries.getAllItems()
    .then(items => {
      res.json({ items });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// Create: add a new item
router.post('/items/new', (req, res) => {
  const newItemData = req.body;

  itemQueries.addItem(newItemData, (err, newItem) => {
    if(err) {
      console.error(err);
      res.status(500).json({error: 'error occured'})
    } else {
      res.status(201).json(newItem);
    }
  })
});

// // Read: display add new item form
// router.get('items/new', (req, res) => {

// })

// Update: update an item by ID
router.put('items/:itemId', (req, res) => {
  const itemId = req.params.id;
  const updatedItemData = req.body;
});

// Destroy: delete an item by ID
router.delete('items/:itemId', (req, res) => {
  const itemId = req.params.id;

});

module.exports = router;
