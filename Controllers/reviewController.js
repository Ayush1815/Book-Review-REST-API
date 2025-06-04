let pool = require('../Database/db');

//AddReview:
// Submit a review (1 per user per book)
exports.addReview = async (req, res) => {
  let { rating, comment } = req.body;
  let userId = req.user?.id;
  let bookId = req.params?.id;

  try {
    let existing = await pool.query(
      'SELECT * FROM reviews WHERE user_id = $1 AND book_id = $2',
      [userId, bookId]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'You already reviewed this book' });
    }
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: no user ID in token' });
    }
    let result = await pool.query(
      'INSERT INTO reviews (user_id, book_id, rating, comment) VALUES ($1, $2, $3, $4)',
      [userId, bookId, rating, comment]
    );

    res.status(201).json({message: 'Review added successfully' })(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit review' });
  }
};

// UpdateReview:
// Allows users to update their own review
exports.updateReview = async (req, res) => {
  let reviewId = req.params.id;
  let { rating, comment } = req.body;
  let userId = req.user.id;

  try {
    let result = await pool.query(
      'UPDATE reviews SET rating = $1, comment = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
      [rating, comment, reviewId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(403).json({ message: 'Not authorized or review not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update review' });
  }
};

//DeleteReview
// Allows users to delete their own review
exports.deleteReview = async (req, res) => {
  let reviewId = req.params?.id;
  let userId = req.user?.id;

  try {
    let result = await pool.query(
      'DELETE FROM reviews WHERE id = $1 AND user_id = $2 RETURNING *',
      [reviewId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(403).json({ message: 'Not authorized or review not found' });
    }

    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
};
