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
  const userId = req.cookies.userId;
  if (!req.cookies.userId) {
    res.render("index2");
  }

  res.render('my-listing', { userId });
});

module.exports = router;
