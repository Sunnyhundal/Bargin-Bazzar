const express = require("express");
const router = express.Router();
const itemDB = require("../db/queries/items");


//this routes start with /api/items

// Read: display all items
router.get("/", (req, res) => {
  // console.log("we are hitting the get items aPi route");
  itemDB.getAllItems()
    .then((items) => {
      // console.log(items);
      return res.json({ items });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({ error: err.message });
      throw err;
    });
});

// Create: add a new item
router.post("/new", (req, res) => {

  const newItemData = req.body;

  itemDB.addItem(newItemData)
    .then((newItem) => {
      res.status(201).json(newItem);
      console.log(newItem);
      console.log('success');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "An error occurred" });
    });
});

// Update: update an item by ID
router.put("/:itemId", (req, res) => {
  const itemId = req.params.id;
  const updatedItemData = req.body;
});

// Destroy: delete an item by ID
router.delete("/:itemId", (req, res) => {
  const itemId = req.params.itemId;

  itemDB.deleteItem(itemId)
    .then((result) => {
      if(res.error) {
        res.status(500).json( { error: 'Cannot delete item'});
      } else {
        res.status(200).json({});
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500)
      .json( {error: 'An error occured'});
    });
});

module.exports = router;
