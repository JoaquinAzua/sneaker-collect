const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');
const isLoggedIn = require('../config/auth');


// POST "/sneakers/styleID/reviews" - Create Review Route
router.post('/sneakers/:styleID/reviews', isLoggedIn, reviewsCtrl.create)

module.exports = router;