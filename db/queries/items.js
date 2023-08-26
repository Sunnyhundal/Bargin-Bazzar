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
const addItem = function(newItem, sellerId) {
  if (!newItem) {
    console.error("Invalid item object");
    return Promise.resolve(null);
  }

  const queryParams = [
    newItem.title,
    newItem.price,
    newItem.is_sold,
    newItem.description,
    newItem.photo_url || '/images/no_image.png',
    newItem.thumbnail_url || '/images/no_image.png',
    sellerId, // Add the seller_id from the function parameter
  ];

  const queryString = `
    INSERT INTO items (title, price, is_sold, description, photo_url, thumbnail_url, seller_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;`;

  return db
    .query(queryString, queryParams)
    .then((res) => {
      console.log(res);
      return res.rows[0];
    })
    .catch((err) => {
      console.error(err);
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
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.error(err.message);
      throw err;
    });
};

/**
 * Get one item from the database.
 * @return {Promise<Array>} A promise the items
 */
const getItemById = function(itemId) {
  return db
    .query(`SELECT * FROM items WHERE id = $1;`, [itemId])
    .then((result) => {
      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        throw new Error("Item not found");
      }
    })
    .catch((err) => {
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
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.error(err.message);
      throw err;
    });
};

/**
 *
 * @param {number} itemId
 * @returns {Promise<{}>} A promise to the item.
 */

const deleteItem = function(itemId) {
  const queryString = `
  DELETE FROM items
  WHERE id = $1;`;

  return db
    .query(queryString, [itemId])
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.error(err.message);
      throw err;
    });
};

const getItemsByUserId = (userId) => {
  const queryString = `
    SELECT
      id,
      title,
      price,
      is_sold,
      photo_url,
      thumbnail_url
    FROM
      items
    WHERE
      seller_id = $1;`;

  return db
    .query(queryString, [userId])
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {

      console.error(err.message);
      throw err;
    });
};

const updateItem = function(itemId, updatedData) {
  const { title, price, is_sold, description, photo_url, thumbnail_url} = updatedData;
  const queryString = `
  UPDATE items
  SET title = $1, price = $2, is_sold =$3, description = $4, photo_url = $5, thumbnail_url = $6
  WHERE id = $7
  RETURNING *;`

  const queryParams = [title, price, is_sold, description, photo_url, thumbnail_url, itemId];

  return db.query(queryString, queryParams)
  .then((res) => {
    return res.rows[0];
  })
  .catch((err) => {
    console.error(err.message);
    throw err;
  });
};

const getFeaturedItems = (userId) => {
  const queryString = `
    SELECT
      id,
      title,
      price,
      is_sold,
      photo_url,
      thumbnail_url
      ${userId ? `,
          (
            SELECT favorites.id AS favorite_id
            FROM favorites
            WHERE favorites.user_id = $1 AND favorites.item_id = i.id
          ) AS favorite_id
        ` : ''}
    FROM
      items i
    WHERE
      is_sold = false
      ${userId ? 'AND seller_id != $1' : ''}
    ORDER BY
      RANDOM()
    LIMIT 8;`;

  return db
    .query(queryString, userId ? [userId] : undefined)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.error(err.message);
      throw err;
    });

};

const isSold = function(itemId) {
  const queryString = `
    SET is_sold = true
    WHERE id = $1;`;

  return db
    .query(queryString, [itemId])
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.error(err.message);
      throw err;
    });
};

module.exports = {
  addItem,
  getAllItems,
  filterItemByPrice,
  deleteItem,
  getItemById,
  getItemsByUserId,
  updateItem,
  getFeaturedItems,
};
