//favorites related database queries goes here

const db = require("../connection");

/**
 * Add a new item to the database.
 * @param {{title: string,
 *          price: string,
 *          is_sold: boolean,
 *          description: string,
 *          created_at: string,
 *          seller_id: int
 *          photo_url: string,
 *          thumnnail_url: string}}
 * @return {Promise<{}>} A promise to the user.
 */
const addItem = function(item) {
  const {
    id,
    title,
    price,
    is_sold,
    created_at,
    seller_id,
    photo_url,
    thumbnail_url,
  } = item;

  return pool
    .query(
      `INSERT INTO items (id, title, price, is_sold, created_at, seller_id, photo_url, thumbnail_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
      [
        id,
        title,
        price,
        is_sold,
        created_at,
        seller_id,
        photo_url,
        thumbnail_url,
      ]
    )
    .then((res) => {
      return res.rows[0];
    })
    .catch((error) => {
      return null;
    });
};
