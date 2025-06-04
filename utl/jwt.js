let jwt = require('jsonwebtoken');
require('dotenv').config();

// Function to generate JWT token for a user
// Payload usually includes minimal information (like user ID and username)
let generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' } // Token validity duration
  );
};

// Function to verify a token (used internally in middleware)
let verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken
};