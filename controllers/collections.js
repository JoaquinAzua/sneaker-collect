const Sneaker = require("../models/sneaker");
const Collection = require("../models/collection");
const SneaksAPI = require("sneaks-api");
const sneaks = new SneaksAPI();

module.exports = {
    addToOwned,
    addToWatchList,
    index,
    show,
    deleteFromWatchlist,
    deleteFromOwned
};

function addToOwned(req, res) {
    Collection.findOne(
      { user: req.user._id, collectionName: "owned" },
      async function (err, owned) {
        let sneaker = await Sneaker.findOne({ styleID: req.params.styleID });
        if (sneaker) {
          owned.sneakers.push(sneaker._id);
          owned.save(function (err) {
            res.redirect("/collections");
          });
        } else {
          sneaks.getProductPrices(
            req.params.styleID,
            async function (err, product) {
              sneaker = new Sneaker({
                styleID: product.styleID,
                shoeName: product.shoeName,
                brand: product.brand,
                thumbnail: product.thumbnail,
              });
              sneaker.save(function(err) {
                owned.sneakers.push(sneaker._id);
                owned.save(function (err) {
                  res.redirect("/collections");
                });
              })
            }
          );
        }
      }
    );
  }

  function deleteFromOwned(req, res) {
    Collection.findOne({ user: req.user._id, collectionName: "owned" }, function(err, owned){
      owned.sneakers.remove(req.params.id);
      // owned.sneakers = owned.sneakers.filter(id => !id.equals(req.params.id));
      owned.save(function(err){
        res.redirect("/collections")
      })
    })
  }


  function deleteFromWatchlist(req, res) {
    Collection.findOne({ user: req.user._id, collectionName: "watchlist" }, function(err, watchlist){
      watchlist.sneakers.remove(req.params.id);
      // owned.sneakers = owned.sneakers.filter(id => !id.equals(req.params.id));
      watchlist.save(function(err){
        res.redirect("/collections")
      })
    })
  }

  function addToWatchList(req, res) {
    Collection.findOne(
      { user: req.user._id, collectionName: "watchlist" },
      async function (err, watchlist) {
        let sneaker = await Sneaker.findOne({ styleID: req.params.styleID });
        if (sneaker) {
          watchlist.sneakers.push(sneaker._id);
          watchlist.save(function (err) {
            res.redirect("/collections");
          });
        } else {
          sneaks.getProductPrices(
            req.params.styleID,
            async function (err, product) {
              sneaker = new Sneaker({
                styleID: product.styleID,
                shoeName: product.shoeName,
                brand: product.brand,
                thumbnail: product.thumbnail,
              });
              sneaker.save(function(err) {
                watchlist.sneakers.push(sneaker._id);
                watchlist.save(function (err) {
                  res.redirect("/collections");
                });
              })
            }
          );
        }
      }
    );
  }


function index(req, res) {
  Collection.findOne({ user: req.user._id, collectionName: "owned" }).populate("sneakers").exec(function (err, owned) {
      Collection.findOne({ user: req.user._id, collectionName: "watchlist" }).populate("sneakers").exec(function (err, watchlist) {
        //   console.log(owned);
        //   console.log(watchlist);
          res.render("collections/index", { owned, watchlist });
        });
    });
}


function show(req, res){
  Sneaker.findOne({styleID: req.params.styleID}, function(err, sneakerdb){
    sneaks.getProductPrices(req.params.styleID, function(err, sneaker){
        let keys = Object.keys(sneaker.resellPrices.goat)
        keys = keys.map(k => Number(k));
        keys.sort(function (a, b){
          return a-b;
        });
        console.log(keys)
        //console.log(sneaker)
        res.render('sneakers/show', {sneaker, sneakerdb, keys})
    })
  })
}