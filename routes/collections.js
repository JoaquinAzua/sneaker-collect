var express = require('express');
var router = express.Router();
const collectionsCtrl = require('../controllers/collections');
const isLoggedIn = require('../config/auth');

// GET  "/collections" - Index View
router.get('/collections', isLoggedIn, collectionsCtrl.index);

// GET "/sneakers/styleID" - Show view (details for a sneaker in their collection)
router.get('/sneakers/:styleID', isLoggedIn, collectionsCtrl.show)

// GET "/owned/:styleID" - adding to owned collection
router.get('/owned/:styleID', isLoggedIn, collectionsCtrl.addToOwned);

// GET "/watchlist/:styleID" - adding to watchlist collection
router.get('/watchlist/:styleID', isLoggedIn, collectionsCtrl.addToWatchList);

// DELETE "/collections/:id/watchlist" - deleting sneaker from watchlist
router.delete('/collections/:id/watchlist', isLoggedIn, collectionsCtrl.deleteFromWatchlist);

// DELETE "/collections/:id/owned" - deleting sneaker from owned
router.delete('/collections/:id/owned', isLoggedIn, collectionsCtrl.deleteFromOwned);



module.exports = router;