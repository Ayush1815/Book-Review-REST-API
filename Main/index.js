let express = require('express');
let dotenv = require('dotenv');
let pool = require('../Database/db');
let app = express();
dotenv.config();

app.use(express.json());

// Routes
let authRoutes = require('../Routes/authRoutes');
let bookRoutes = require('../Routes/bookRoutes');
let reviewRoutes = require('../Routes/reviewRoutes');
let searchRoutes = require('../Routes/searchRoutes');

// Table creation queries
let { createUserTable } = require('../Models/user');
let { createBookTable } = require('../Models/book');  
let { createReviewTable } = require('../Models/review');

// Start app
(async () => {
  try {
    await pool.connect();
    console.log('✔️ Connected to PostgreSQL');

    // Run table creation queries
    await pool.query(createUserTable);
    await pool.query(createBookTable);
    await pool.query(createReviewTable);
    console.log('✔️ Tables ensured');

    // Mount routes
    app.use('/api', authRoutes);
    app.use('/api', bookRoutes);
    app.use('/api', reviewRoutes);
    app.use('/api', searchRoutes);

    let PORT = process.env.PORT || 8020;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Database connection error:', err);
  }
})();
module.exports = app;