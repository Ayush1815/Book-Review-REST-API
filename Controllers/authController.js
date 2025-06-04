let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let pool = require('../Database/db');
require('dotenv').config();

exports.signup = async (req, res) => {
  let { username, password } = req.body;
  try {
    let hashed = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2)',
      [username, hashed]
    );
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(400).json({ error: 'Username already exists or invalid input' });
  }
};

exports.login = async (req, res) => {
  let { username, password } = req.body;
  try {
    let result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    let user = result.rows[0];

    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    let valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    let token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};
