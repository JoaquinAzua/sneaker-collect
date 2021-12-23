var express = require('express');
var router = express.Router();
const sneakersCtrl = require('../controllers/sneakers');
const isLoggedIn = require('../config/auth');


// GET "/sneakers" - Index Route (Most Popular)
router.get('/', isLoggedIn, sneakersCtrl.index);

// GET "/brands/:brandName" - Index Route(Other Sneaker Brands)
router.get('/brands/:brandName', isLoggedIn, sneakersCtrl.brand)



module.exports = router;
