const express = require("express");
const router = express.Router();
const itemDB = require("../db/queries/items");

//this routes start with /api/items

// Read: display all items
router.get("/", (req, res) => {

  itemDB
    .getAllItems()
    .then((items) => {
      res.render("item-list", { items });

    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    });
});

// Create: add a new item
router.post("/new", (req, res) => {
  const newItemData = req.body;

  itemDB
    .addItem(newItemData)
    .then((newItem) => {

      res.redirect("../../items");

    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "An error occurred" });
    });
});

// Read: display an item by ID
router.get("/:itemId", (req, res) => {
  const itemId = req.params.itemId;

  itemDB
    .getItemById(itemId)
    .then((item) => {
      console.log(item);
      res.render("item", { item });
  })
  .catch((err) => {
    console.error(err.message);
    res.send("error occured");
  })
});

// Update: update an item by ID
router.put("/:itemId", (req, res) => {
  const itemId = req.params.id;
  const updatedItemData = req.body;
});

// Destroy: delete an item by ID
router.delete("/:itemId", (req, res) => {
  const itemId = req.params.itemId;

  itemDB
    .deleteItem(itemId)
    .then((result) => {
      if (res.error) {
        res.status(500).json({ error: "Cannot delete item" });
      } else {

        res.redirect("../../items");

      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "An error occured" });
    });
});

module.exports = router;
