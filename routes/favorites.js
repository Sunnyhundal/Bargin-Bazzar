const { getFavoritesByUserId } = require('../db/queries/favorites');
const express = require("express");
const router = express.Router();

// favorites-related routes
router.get("/", (req, res) => {
  res.render("favorites");
});

router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const response = await getFavoritesByUserId(userId);

  if (response.error) {
    res
      .status(500)
      .json({ error: 'Cannot get favorites' });

    return;
  }

  res
    .status(200)
    .json(response.favorites);
});

module.exports = router;
