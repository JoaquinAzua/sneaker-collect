var express = require('express');
var router = express.Router();
const sneakersCtrl = require('../controllers/sneakers');

// GET "/sneakers" - Index Route (Most Popular)
router.get('/', sneakersCtrl.index);

// GET "/sneakers" - Index Route (adidas)
router.get('/sneakers/adidasIndex', sneakersCtrl.adidasIndex);

// GET "/sneakers" - Index Route (Nike)
router.get('/sneakers/nike', sneakersCtrl.nikeIndex);

// GET "/sneakers" - Index Route (Yeezy)
router.get('/sneakers/yeezy', sneakersCtrl.yeezyIndex);

// GET "/sneakers" - Index Route (Jordans)
router.get('/sneakers/jordans', sneakersCtrl.jordansIndex);






module.exports = router;
