const { getFavoritesByUserId, createFavorite, unFavorite } = require('../db/queries/favorites');
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

router.post('/', async (req, res) => {
  const userId = req.session.userId;
  const itemId = req.body.itemId;
  const response = await createFavorite(userId, itemId);

  if (response.error) {
    res
      .status(500)
      .json({ error: 'Cannot create favorite' });

    return;
  }

  res
    .status(200);
});

router.delete('/:favoriteId', async (req, res) => {
  const userId = req.session.userId;
  const favoriteId = req.params.favoriteId;
  const response = await unFavorite(favoriteId, userId);

  if (response.error) {
    res
      .status(500)
      .json({ error: 'Cannot delete favorite' });

    return;
  }

  res
    .status(200);
});

module.exports = router;
