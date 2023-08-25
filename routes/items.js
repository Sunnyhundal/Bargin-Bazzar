// for item-related routes

const express = require('express');
const router  = express.Router();

//this routes start with /items

// Display items route
router.get('/', (req, res) => {
  res.render('items');
});

// Display add new items page
router.get('/new', (req, res) => {
  res.render('items_new');
});

// Display my items page
router.get('/mylisting', (req, res) => {
  if (!req.cookies.userId) {
    res.render("index");
  }

  res.render('my-listing');
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

router.post('/:itemId/edit', async (req, res) => {
  const itemId = req.params.itemId;
  const updatedData = req.body; // Assuming the form data is properly structured

  try {
    const item = await itemDB.getItemById(itemId);
    if (!item) {
      res.status(404).send('Item not found');
      return;
    }
    // Render the edit form view with the item's data
    res.render('edit-item', { item });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error fetching item data');
  }
  });

module.exports = router;
