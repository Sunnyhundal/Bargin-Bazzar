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

module.exports = router;
