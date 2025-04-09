const db = require('../config/db');

const findUser = (email, password, callback) => {
  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(query, [email, password], callback);
};

const createUser = (email, password, callback) => {
  const query = "INSERT INTO users (email, password) VALUES (?, ?)";
  db.query(query, [email, password], callback);
};

module.exports = { findUser, createUser };
