var express = require('express');
var router = express.Router();
const collectionsCtrl = require('../controllers/collections');

// GET  "/collections" - Index View
router.get('/collections', collectionsCtrl.index);

// GET "/sneakers/styleID" - Show view (details for a sneaker in their collection)
router.get('/sneakers/:styleID', collectionsCtrl.show)

// GET "/owned/:styleID" - adding to owned collection
router.get('/owned/:styleID', collectionsCtrl.addToOwned);

// GET "/watchlist/:styleID" - adding to watchlist collection
router.get('/watchlist/:styleID', collectionsCtrl.addToWatchList);

module.exports = router;