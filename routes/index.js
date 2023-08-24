const express = require('express');
const router = express.Router();

// Import the provided code and any necessary data fetching logic
const renderItems = require("../db/queries/items");


// Define your routes
router.get('/items', (req, res) => {
  const items = [];

  // Call the renderItems function from the provided code
  const renderedItemsHTML = renderItems(items);

  res.send(renderedItemsHTML);
});

router.get('/', (req, res) => {
  res.render('index');
});


module.exports = router;
