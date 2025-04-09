const { findUser, createUser } = require('../models/userModel');

const login = (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "1234") {
    return res.json({ success: true, isAdmin: true });
  }

  findUser(email, password, (err, results) => {
    if (err) return res.status(500).json({ success: false, error: err });

    if (results.length > 0) {
      return res.json({ success: true, isAdmin: false });
    } else {
      // If user not found, auto-create account
      createUser(email, password, (err2) => {
        if (err2) return res.status(500).json({ success: false, error: err2 });
        return res.json({ success: true, isAdmin: false, created: true });
      });
    }
  });
};

module.exports = { login };
