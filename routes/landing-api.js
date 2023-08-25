const { getFeaturedItems } = require('../db/queries/items');
const express = require("express");
const router = express.Router();

router.get("/", async(req, res) => {
  const userId = req.cookies.userId;
  const response = await getFeaturedItems(userId);

  if (response.error) {
    res
      .status(500)
      .json({ error: 'Cannot get featured items' });

    return;
  }

  res
    .status(200)
    .json(response);
});

module.exports = router;
