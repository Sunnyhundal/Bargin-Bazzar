const express = require("express");
const router = express.Router();
const itemDB = require("../db/queries/items");
const usersDB = require("../db/queries/users");
const db = require("../db/connection");
const bodyParser = require("body-parser");
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
router.post
("/new", (req, res) => {
  const newItemData = req.body;
  const userId = req.cookies.userId;

  itemDB
    .addItem(newItemData, userId)
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

    const item = await itemDB.getItemById(itemId);
    let itemArray = Object.values(item);
    // console.log(item);

    let userEmail;
    if (item) {
      userEmail = await usersDB.getEmailByUserId(itemArray[6]);
    }

    const sellerID = item.seller_id;
    const sellerInfo = await usersDB.getUserInfo(sellerID);

    res.render("item", { item, userEmail, sellerInfo, userId });
  } catch (err) {
    console.error(err.message);
    res.send("error occured");
  }
});

// Handle item update (POST method)
router.post("/:itemId", (req, res) => {
  const itemId = req.params.itemId;
  const updatedItemData = req.body;

  console.log("Updating item with ID:", itemId);
  console.log("Updated data:", updatedItemData);
  itemDB
    .updateItem(itemId, updatedItemData) // Update the item in the database
    .then(() => {
      res.redirect(`/api/items/${itemId}`);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "An error occurred" });
    });
});





// Destroy: delete an item by ID
router.post
('/:itemId/delete', async (req, res) => {
  const itemId = req.params.itemId;

  try {
    // First, get the item details
    const item = await itemDB.getItemById(itemId);

    if (!item) {
      return res.status(404).send('Item not found');
    }

    // Proceed to delete the item
    await itemDB.deleteItem(itemId);
    res.redirect(`/items/`);
  } catch (err) {
    console.error(err);
    res.status(500).send(`An error occurred: ${err.message}`);
  }
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

router.post("/sort", (req, res) => {
  const choice = req.body.choice;
  const userId = req.cookies.userId;

  // Perform database query based on choice
  let query;
  if (choice === "high-to-low") {
    query = "SELECT * FROM items ORDER BY price DESC";
  } else if (choice === "low-to-high") {
    query = "SELECT * FROM items ORDER BY price ASC";
  } else if (choice === "a-to-z") {
    query = "SELECT * FROM items ORDER BY title ASC";
  } else if (choice === "z-to-a") {
    query = "SELECT * FROM items ORDER BY title DESC";
  } else {
    // Handle other choices as needed
    query = "SELECT * FROM items";
  }

  db.query(query)
    .then((result) => {
      const items = result.rows;
      // res.json(rows);
      res.render("index2", { items, userId });
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.post("/filter", (req, res) => {
  const userId = req.cookies.userId;

  const minPrice = parseInt(req.body.minPrice, 10);
  const maxPrice = parseInt(req.body.maxPrice, 10);

  let queryText = 'SELECT * FROM items';
  const queryParams = [];

  if (!isNaN(minPrice) && !isNaN(maxPrice)) {
    // If both minPrice and maxPrice are set, filter by price range
    queryText += ' WHERE price >= $1 AND price <= $2';
    queryParams.push(minPrice, maxPrice);
  } else if (!isNaN(minPrice)) {
    // If only minPrice is set, filter by minimum price
    queryText += ' WHERE price >= $1';
    queryParams.push(minPrice);
  } else if (!isNaN(maxPrice)) {
    // If only maxPrice is set, filter by maximum price
    queryText += ' WHERE price <= $1';
    queryParams.push(maxPrice);
  }

  db.query(queryText, queryParams)
    .then(result => {
      const items = result.rows;
      res.render("index2", { items, userId });
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occured' });
    });
});

// Handle item update (POST method)
router.post("/:itemId", (req, res) => {
  const itemId = req.params.itemId;
  const updatedItemData = req.body;

  console.log("Updating item with ID:", itemId);
  console.log("Updated data:", updatedItemData);
  itemDB
    .updateItem(itemId, updatedItemData) // Update the item in the database
    .then(() => {
      res.redirect(`/api/items/${itemId}`);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "An error occurred" });
    });
});


module.exports = router;
