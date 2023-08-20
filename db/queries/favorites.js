//favorites related database queries goes here

const db = require('../connection');

/**
 * Only shows favorites that belong to the logged-in user from urlDatabase
 * @param {string} id - the id of the currently logged-in user
 * @Returns the favorites where the userID is equal to
 */
function favoritesForUser(id, favoritesDB) {
  const userfavorites = {};
  for (const favorite in favoritesDB) {
    if (favoritesDB[favorite].userID === id) {
      userfavorites[favorite] = favoritesDB[favorite];
    }
  }
  return userfavorites;
}

module.exports = { favoritesForUser };
