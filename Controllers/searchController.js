let pool = require('../Database/db');

// GET /api/search?q=keyword
exports.searchBooks = async (req, res) => {
  let { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    let result = await pool.query(
      `SELECT * FROM books 
       WHERE LOWER(title) LIKE LOWER($1) OR LOWER(author) LIKE LOWER($1) 
       ORDER BY created_at DESC`,
      [`%${q}%`]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('❌ Search error:', err.message);
    res.status(500).json({ error: 'Search failed' });
  }
};
