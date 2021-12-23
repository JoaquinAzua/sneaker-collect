const Sneaker = require('../models/sneaker');
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();


module.exports = {
    index,
    brand,
}

function brand(req,res) {
    //getProducts(keyword, limit, callback) takes in a keyword and limit and returns a product array
    sneaks.getProducts(req.params.brandName, 30, function(err, products){
        res.render("sneakers/brands", {title:req.params.brandName, products});
    })
}

function index(req, res) {
    //getMostPopular(limit, callback) takes in a limit and returns an array of the current popular products curated by StockX
    sneaks.getMostPopular(30, function(err, products){
        res.render("sneakers/index", {title: "All Sneakers", products});
    });
}







