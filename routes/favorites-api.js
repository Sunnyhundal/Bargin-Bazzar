const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  const query = `SELECT * FROM favorites`;
  console.log(query);
  db.query(query)
    .then(data => {
      const favorites = data.rows;
      res.json({ favorites });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
