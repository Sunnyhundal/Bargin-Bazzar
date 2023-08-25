const express = require("express");
const router = express.Router();
const itemDB = require("../db/queries/items");
const usersDB = require("../db/queries/users");
const db = require("../db/connection");

//this routes start with /api/items

// Read: display all items
router.get("/", (req, res) => {
  const userId = req.cookies.userId;

  itemDB
    .getAllItems()
    .then((items) => {
      res.render("index2", { items, userId });

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
      res.redirect("/api/items");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "An error occurred" });
    });
});

// Read: display an item by ID
router.get("/:itemId", async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const userId = req.cookies.userId;

    const item = await itemDB.getItemById(itemId)
    let itemArray = Object.values(item);
    // console.log(item);

    let userEmail
    if (item) {
     userEmail = await usersDB.getEmailByUserId (itemArray[6])
    }

    const sellerID = item.seller_id;
    const sellerInfo = await usersDB.getUserInfo(sellerID);

    res.render("item", { item, userEmail, sellerInfo, userId });
  } catch (err) {
    console.error(err.message);
    res.send("error occured");
  }
});

// Update: update an item by ID
router.put("/:itemId", (req, res) => {
  const itemId = req.params.id;
  const updatedItemData = req.body;
});

// Destroy: delete an item by ID
router.delete("/:itemId/delete", (req, res) => {
  const itemId = req.params.itemId;

  itemDB
    .deleteItem(itemId)
    .then((result) => {
      if (result.error) {
        res.status(500).json({ error: "Cannot delete item" });
      } else {
        res.redirect("api/items");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "An error occured" });
    });
});

router.get("/mylisting/:userId", (req, res) => {
  const userId = req.params.userId;

  itemDB
    .getItemsByUserId(userId)
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "An error occured" });
    });
});

router.post('/filter', (req, res) => {
  const choice = req.body.choice;
  const userId = req.cookies.userId;

  // Perform database query based on choice
  let query;
  if (choice === 'high-to-low') {
    query = 'SELECT * FROM items ORDER BY price DESC';
  } else if (choice === 'low-to-high') {
    query = 'SELECT * FROM items ORDER BY price ASC';
  } else if (choice === 'a-to-z') {
    query = 'SELECT * FROM items ORDER BY title ASC';
  } else if (choice === 'z-to-a') {
    query = 'SELECT * FROM items ORDER BY title DESC'
  } else {
    // Handle other choices as needed
    query = 'SELECT * FROM items';
  }

  db.query(query)
    .then(result => {
      const items = result.rows;
      // res.json(rows);
      res.render('index2', { items, userId })
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});



module.exports = router;
