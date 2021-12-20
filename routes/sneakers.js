var express = require('express');
var router = express.Router();
const sneakersCtrl = require('../controllers/sneakers');

// GET "/sneakers" - Index Route
router.get('/', sneakersCtrl.index);


module.exports = router;
