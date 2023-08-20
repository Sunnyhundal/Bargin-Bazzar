// for item-related routes

const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('items');
});

router.get('/new', (req, res) => {
  res.render('items_new');
});

module.exports = router;
