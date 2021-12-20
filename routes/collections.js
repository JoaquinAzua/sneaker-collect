var express = require('express');
var router = express.Router();
const collectionsCtrl = require('../controllers/collections');

// GET  "/collections" - Index View
router.get('/collections', collectionsCtrl.index);

// GET "/owned/:styleid" - adding to owned collection
router.get('/owned/:styleID', collectionsCtrl.addToOwned);

// GET "/watchlist/:styleid" - adding to watchlist collection
router.get('/watchlist/:styleID', collectionsCtrl.addToWatchList);

module.exports = router;