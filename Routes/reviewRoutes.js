let express = require('express');
let router = express.Router();
let authenticateToken = require('../Middleware/midware');
let reviewController = require('../Controllers/reviewController');

// Review Routes
router.post('/book/:id/review', authenticateToken, reviewController.addReview);
router.put('/book/review/:id', authenticateToken, reviewController.updateReview);
router.delete('/book/review/:id/del', authenticateToken, reviewController.deleteReview);

module.exports = router;