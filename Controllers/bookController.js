let pool = require('../Database/db');

//AddBook:
//Adds a new book to the database 
exports.addBook = async (req, res) => {
  let { title, author, genre } = req.body;
  try {
    let result = await pool.query(
      'INSERT INTO books (title, author, genre) VALUES ($1, $2, $3) RETURNING *',
      [title, author, genre]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: 'Could not add book' });
  }
};

//GetAllBooks:
//Returns all books 
exports.getAllBooks = async (req, res) => {
  let { page = 1, limit = 10, author, genre } = req.query;
  let offset = (page - 1) * limit;

  try {
    let query = 'SELECT * FROM books WHERE 1=1';
    let values = [];

    if (author) {
      values.push(`%${author}%`);
      query += ` AND LOWER(author) LIKE LOWER($${values.length})`;
    }

    if (genre) {
      values.push(`%${genre}%`);
      query += ` AND LOWER(genre) LIKE LOWER($${values.length})`;
    }

    values.push(limit, offset);
    query += ` ORDER BY created_at DESC LIMIT $${values.length - 1} OFFSET $${values.length}`;

    let result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

//GetBook by ID:
//Returns book details
exports.getBookById = async (req, res) => {
  let bookId = req.params.id;
  let { page = 1, limit = 5 } = req.query;
  let offset = (page - 1) * limit;

  try {
    let bookResult = await pool.query('SELECT * FROM books WHERE id = $1', [bookId]);
    if (bookResult.rows.length === 0) return res.status(404).json({ message: 'Book not found' });

    let avgRatingResult = await pool.query('SELECT AVG(rating) AS avg_rating FROM reviews WHERE book_id = $1', [bookId]);
    let reviewsResult = await pool.query(
      'SELECT * FROM reviews WHERE book_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
      [bookId, limit, offset]
    );

    res.json({
      book: bookResult.rows[0],
      average_rating: parseFloat(avgRatingResult.rows[0].avg_rating).toFixed(2),
      reviews: reviewsResult.rows
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get book details' });
  }
};
