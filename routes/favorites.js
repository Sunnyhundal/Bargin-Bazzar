const { getFavoritesByUserId, createFavorite, unFavorite } = require('../db/queries/favorites');
const express = require("express");
const router = express.Router();

// GET /favorites
// Show the favorites page.
router.get("/", (req, res) => {
  res.render("favorites");
});

// GET /favorites/:userId
// API for getting the favorites for a user.
router.get('/:userId', async(req, res) => {
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

// POST /favorites
// API for creating a favorite for a user.
router.post('/', async(req, res) => {
  const userId = 6; // hardcoded for now
  const itemId = req.body.itemId;

  const response = await createFavorite(userId, Number(itemId));

  if (response.error) {
    res
      .status(500)
      .json({ error: 'Cannot create favorite' });

    return;
  }

  res
    .status(200)
    .json(response.favorite);
});

// DELETE /favorites/:favoriteId
// API for deleting a favorite for a user.
// unFavorite requires userId so that a user can only delete their own favorites.
router.delete('/:favoriteId', async(req, res) => {
  const userId = 6; // hardcoded for now
  const favoriteId = req.params.favoriteId;
  const response = await unFavorite(favoriteId, userId);

  if (response.error) {
    res
      .status(500)
      .json({ error: 'Cannot delete favorite' });

    return;
  }

  res
    .status(200)
    .json({});
});

module.exports = router;
