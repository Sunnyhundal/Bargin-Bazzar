// for item-related routes

const express = require('express');
const router  = express.Router();
const itemDB = require('../db/queries/items');

//this routes start with /items

// Display items route
router.get('/', (req, res) => {
  res.render('items');
});

// Display add new items page
router.get('/new', (req, res) => {
  const userId = req.cookies.userId;
  res.render('items_new', { userId } );
});

// Display my items page
router.get('/mylisting', (req, res) => {
  const userId = req.cookies.userId;
  if (!req.cookies.userId) {
    res.render("index2");
  }

  res.render('my-listing', { userId });
});

router.get('/:itemId/edit', async (req, res) => {
  const itemId = req.params.itemId;

  try {
    const item = await itemDB.getItemById(itemId);
    // Render the edit form view with the item's data
    res.render('edit-item', { item });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('An error occurred');
  }
});

// POST route for updating the item
router.post('/:itemId/edit', async (req, res) => {
  const itemId = req.params.itemId;
  const updatedData = req.body;

  try {
    // Update the item with the new data
    await itemDB.updateItem(itemId, updatedData);

    // Redirect to the item's details page or another relevant page
    res.redirect(`/items/${itemId}`);
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(500).send(`An error occurred: ${err.message}`);
  }
});

// Route to handle updating an item by ID
router.route('/:itemId')
  .get(async (req, res) => {
    const itemId = req.params.itemId;

    try {
      const item = await itemDB.getItemById(itemId);
      // Render the edit form view with the item's data
      res.render('edit-item', { item });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('An error occurred');
    }
  })
  .post(async (req, res) => {
    const itemId = req.params.itemId;
    const updatedData = req.body;

    try {
      // Update the item with the new data
      await itemDB.updateItem(itemId, updatedData);

      // Redirect to the item's details page or another relevant page
      res.redirect(`/items/${itemId}`);
    } catch (err) {
      console.error(err); // Log the error to the console
      res.status(500).send(`An error occurred: ${err.message}`);
    }
  });


module.exports = router;
