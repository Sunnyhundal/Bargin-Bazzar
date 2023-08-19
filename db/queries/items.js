//favorites related database queries goes here
const db = require("../connection");

/**
 * Add a new item to the database.
 * @param { {title: string,
 *          price: string,
 *          is_sold: boolean,
 *          description: string,
 *          created_at: string,
 *          seller_id: int
 *          photo_url: string,
 *          thumnnail_url: string} } a new item
 * @return {Promise<{}>} A promise to the item.
 */
const addItem = function(item) {
  if (!item) {
    console.error("Invalid item object");
    return Promise.resolve(null);
  }

  const queryParams = [
    item.id,
    item.title,
    item.price,
    item.is_sold,
    item.created_at,
    item.seller_id,
    item.photo_url,
    item.thumbnail_url
  ];

  const queryString = `INSERT INTO items (id, title, price, is_sold, created_at, seller_id, photo_url, thumbnail_url)
  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;

  return db
    .query(queryString, queryParams)
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      return null;
    });
};

/**
 * Get items from the database.
 * @return {Promise<Array>} A promise the items
 */
const getAllItems = function() {
  return db
    .query(`SELECT * FROM items;`)
    .then(res => res.rows)
    .catch(err => {
      console.error(err.message);
      throw err;
    });
};

/**
 * Filter item by price from the database.
 * @param {number} minPrice - The minimum price.
 * @param {number} maxPrice - The maximum price.
 * @return {Promise<{}>} A promise to the user.
 */
const filterItemByPrice = function(minPrice, maxPrice) {
  const queryString = `SELECT * FROM items WHERE price >= $1 AND price <= $2;`;

  return db
    .query(queryString)
    .then((res) => res.rows)
    .catch((err) => {
      console.error(err.message);
      throw err;
    });
};
