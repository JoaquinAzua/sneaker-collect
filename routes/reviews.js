const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

// POST "/sneakers/styleID/reviews" - Create Review Route
router.post('/sneakers/:styleID/reviews', reviewsCtrl.create)

module.exports = router;