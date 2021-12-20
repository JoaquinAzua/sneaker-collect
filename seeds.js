// load env
require('dotenv').config();
// connect to DB
require('./config/database');

// Require Sneaker Model 
const Sneaker = require('../models/sneaker');
// Require Sneaker API and set variable to pull data from
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();


    Sneaker.find()
      .then(sneaks => {
        callback(null, sneaks);
      }).catch(err => {
        callback(err, null)
      });