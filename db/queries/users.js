const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getEmailByUserId = (userId) => {
  console.log(userId);
  return db
  .query(`SELECT email FROM users WHERE id = $1;`, [userId])
    .then((results) => {
      if (results.rows.length > 0) {
        return results.rows[0].email;
      }else {
        throw new Error("User not found");
      }
    });
};

const getUserNames = (userId) => {
  return db
  .query(`SELECT first_name, last_name FROM users WHERE id = $1;`, [userId])
    .then((results) => {
      if (results.rows.length > 0) {
        return results.rows[0];
      }else {
        throw new Error("User not found");
      }
    });
};

module.exports = { getUsers, getEmailByUserId, getUserNames };

