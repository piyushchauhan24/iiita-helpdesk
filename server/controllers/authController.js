const { findUser, createUser } = require('../models/userModel');

// Separate Login
const login = (req, res) => {
  const { email, password } = req.body;

  // Admin hardcoded
  if (email === "admin@gmail.com" && password === "1234") {
    return res.json({ success: true, isAdmin: true });
  }

  // Student login
  findUser(email, password, (err, results) => {
    if (err) return res.status(500).json({ success: false, error: err });

    if (results.length > 0) {
      return res.json({ success: true, isAdmin: false });
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });
};

// Separate Signup
const signup = (req, res) => {
  const { email, password } = req.body;

  findUser(email, password, (err, results) => {
    if (err) return res.status(500).json({ success: false, error: err });

    if (results.length > 0) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    createUser(email, password, (err2) => {
      if (err2) return res.status(500).json({ success: false, error: err2 });

      return res.json({ success: true, message: "User registered successfully" });
    });
  });
};

module.exports = { login, signup };
