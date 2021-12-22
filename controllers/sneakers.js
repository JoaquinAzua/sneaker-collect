const Sneaker = require('../models/sneaker');
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();


module.exports = {
    index,
    jordansIndex,
    yeezyIndex,
    nikeIndex,
    adidasIndex,
}

function jordansIndex(req,res) {
    //getProducts(keyword, limit, callback) takes in a keyword and limit and returns a product array
    sneaks.getProducts("Jordan", 10, function(err, jordans){
        console.log(jordans)
        res.render("sneakers/jordansIndex", {jordans});
    })
}

function yeezyIndex(req,res) {
    //getProducts(keyword, limit, callback) takes in a keyword and limit and returns a product array
    sneaks.getProducts("Yeezy", 10, function(err, yeezy){
        console.log(yeezy)
        res.render("sneakers/yeezyIndex", {yeezy});
    })
}

function nikeIndex(req,res) {
    //getProducts(keyword, limit, callback) takes in a keyword and limit and returns a product array
    sneaks.getProducts("Nike", 15, function(err, nike){
        console.log(nike)
        res.render("sneakers/nikeIndex", {nike});
           
    })
}

function adidasIndex(req,res) {
    //getProducts(keyword, limit, callback) takes in a keyword and limit and returns a product array
    sneaks.getProducts("adidas", 15, function(err, adidas){
        console.log(adidas) 
        res.render("sneakers/adidasIndex", {adidas});        
    })
}

function index(req, res) {
    //getMostPopular(limit, callback) takes in a limit and returns an array of the current popular products curated by StockX
    sneaks.getMostPopular(30, function(err, products){
        console.log(products)
        res.render("sneakers/index", {title: "All Sneakers", products});
    });
}







