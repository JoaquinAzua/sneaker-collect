const Sneaker = require('../models/sneaker');
const Collection = require('../models/collection');
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();

module.exports = {
    index,
    show,
    addToOwned,


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


async function index(req, res) {
    const collections = await Collection.find({});
    res.render("collections/index", collections);
}

function show(req, res) {
    Collection.find({user: req.user._id}).populate({collectionName: 'owned'}).exec(function(err, owned){
        Sneaker.find({_id: styleID }, function(err, sneaker){
            res.render("collections", owned, sneaker)
        })
    });
}

