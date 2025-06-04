let express = require('express');
let router = express.Router();
let searchController = require('../Controllers/searchController');

// GET /api/search?q=keyword
router.get('/search', searchController.searchBooks);

module.exports = router;