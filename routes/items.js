// for item-related routes

const express = require('express');
const router  = express.Router();

//this routes start with /items

// Display items route
router.get('/', (req, res) => {
  res.render('items');
});

// Dosplay add new items page
router.get('/new', (req, res) => {
  res.render('items_new');
});

module.exports = router;
