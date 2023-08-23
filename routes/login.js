const express = require('express');
const router  = express.Router();

router.get('/:id', (req, res) => {
  res.cookie('userId', req.params.id);
  console.log(req.params.id);
  res.redirect('/');
});

module.exports = router;
