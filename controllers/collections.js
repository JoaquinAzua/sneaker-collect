const Sneaker = require('../models/sneaker');
const Collection = require('../models/collection');
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();

module.exports = {
    index,
    show,
    addToOwned,
    addToWatchList,
}

function addToOwned(req, res){
    Collection.findOne({user: req.user._id, collectionName: 'owned'}, async function(err, owned){
        let sneaker = await Sneaker.findOne({styleID:req.params.styleID});
        if (sneaker) {
            owned.sneakers.push(sneaker._id);
        } else {
            sneaks.getProductPrices(req.params.styleID,async function(err, product){
                sneaker = await Sneaker.create({
                    styleID: product.styleID,
                    shoeName: product.shoeName,
                    brand: product.brand,
                })
                owned.sneakers.push(sneaker._id)
            })
        }
        owned.save(function(err){
            res.redirect("/sneakers")
        })
    })
}

function addToWatchList(req, res){
    Collection.findOne({user: req.user._id, collectionName: 'watchlist'}, async function(err, watchlist){
        let sneaker = await Sneaker.findOne({styleID:req.params.styleID});
        if (sneaker) {
            watchlist.sneakers.push(sneaker._id);
        } else {
            sneaks.getProductPrices(req.params.styleID,async function(err, product){
                sneaker = await Sneaker.create({
                    styleID: product.styleID,
                    shoeName: product.shoeName,
                    brand: product.brand,
                })
                watchlist.sneakers.push(sneaker._id)
            })
        }
        watchlist.save(function(err){
            res.redirect("/sneakers")
        })
    })
}


async function index(req, res) {
    const collections = await Collection.find({user: req.user._id});
    res.render("collections/index", collections);
}

function show(req, res) {
    Collection.find({user: req.user._id}).populate('owned').exec(function(err, owned){
        Sneaker.find({styleID:req.params.styleID}, function(err, sneaker){
            res.render("collections/index", owned, sneaker)
        })
    });
}

