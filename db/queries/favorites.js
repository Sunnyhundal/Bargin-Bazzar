const db = require('../connection');

/**
 * @typedef {Object} Favorite
 * @property {string} title - the title of the item
 * @property {number} id - the id of the favorite
 * @property {number} price - the price of the item in cents
 * @property {number} item_id - the id of the item
 */

/**
 * Get favorites from the database by user id.
 *
 * @param {number} userId - the id of the user
 * @return {Promise<{ favorites?: Favorite[], error?: any }>} A promise to the favorites.
 */
const getFavoritesByUserId = (userId) => {
  const query = `
    SELECT
      f.id AS id,
      i.title AS title,
      i.price AS price,
      i.id AS item_id
    FROM favorites f
    JOIN items i
      ON i.id = f.item_id
    WHERE user_id = $1;
  `;

  return db.query(query, [userId])
    .then((response) => ({ favorites: response.rows}))
    .catch((error) => ({ error }));
};

/**
 * Create a favorite for a user.
 *
 * @param {number} userId - the id of the user
 * @param {number} itemId - the id of the item
 * @returns {Promise<{ error?: any }>}}
 */
const createFavorite = (userId, itemId) => {
  const query = `
    INSERT INTO favorites (user_id, item_id)
    VALUES ($1, $2)
    RETURNING *;
  `;

  return db.query(query, [userId, itemId])
    .then((response) => ({ favorite: response.rows[0] }))
    .catch((error) => ({ error }));
};

/**
 * Unfavorite an item.
 * @param {number} favoriteId
 * @param {number} userId
 * @returns {Promise<{ error?: any }>}
 */
const unFavorite = (favoriteId, userId) => {
  const query = `
    DELETE FROM favorites
    WHERE id = $1 AND user_id = $2;
  `;

  return db.query(query, [favoriteId, userId])
    .then(() => ({}))
    .catch((error) => ({ error }));
};

module.exports = {
  getFavoritesByUserId,
  createFavorite,
  unFavorite
};
