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

module.exports = {
  getFavoritesByUserId
};
