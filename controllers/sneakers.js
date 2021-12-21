const Sneaker = require('../models/sneaker');
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();


module.exports = {
    index,
}

function index(req, res) {
    
    //getMostPopular(limit, callback) takes in a limit and returns an array of the current popular products curated by StockX
    sneaks.getMostPopular(30, function(err, products){
        //console.log(products)

        res.render("sneakers/index", {title: "All Sneakers", products});
    });
    
}



