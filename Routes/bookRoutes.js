let express = require('express');
let router = express.Router();
let bookController = require('../Controllers/bookController');

// POST /api/book
router.post('/book', bookController.addBook);

// GET /api/books
router.get('/books', bookController.getAllBooks);

// GET /api/book/:id
router.get('/book/:id', bookController.getBookById);

module.exports = router;
