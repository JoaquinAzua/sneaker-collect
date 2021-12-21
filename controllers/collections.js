const Sneaker = require("../models/sneaker");
const Collection = require("../models/collection");
const SneaksAPI = require("sneaks-api");
const sneaks = new SneaksAPI();

module.exports = {
    addToOwned,
    addToWatchList,
    index,
};

function addToOwned(req, res) {
  Collection.findOne(
    { user: req.user._id, collectionName: "owned" },
    async function (err, owned) {
      let sneaker = await Sneaker.findOne({ styleID: req.params.styleID });
      if (sneaker) {
        owned.sneakers.push(sneaker._id);
      } else {
        sneaks.getProductPrices(
          req.params.styleID,
          async function (err, product) {
            sneaker = await Sneaker.create({
              styleID: product.styleID,
              shoeName: product.shoeName,
              brand: product.brand,
            });
            owned.sneakers.push(sneaker._id);
          }
        );
      }
      owned.save(function (err) {
        res.redirect("/sneakers");
      });
    }
  );
}

function addToWatchList(req, res) {
  Collection.findOne(
    { user: req.user._id, collectionName: "watchlist" },
    async function (err, watchlist) {
      let sneaker = await Sneaker.findOne({ styleID: req.params.styleID });
      console.log(sneaker)
      if (sneaker) {
        watchlist.sneakers.push(sneaker._id);
      } else {
        sneaks.getProductPrices(
          req.params.styleID,
          async function (err, product) {
            sneaker = await Sneaker.create({
              styleID: product.styleID,
              shoeName: product.shoeName,
              brand: product.brand,
            });
            watchlist.sneakers.push(sneaker._id);
          }
        );
      }
      watchlist.save(function (err) {
        console.log(err)
        res.redirect("/sneakers");
      });
    }
  );
}

function index(req, res) {
  Collection.findOne({ user: req.user._id, collectionName: "owned" }).populate("sneakers").exec(function (err, owned) {
      Collection.findOne({ user: req.user._id, collectionName: "watchlist" }).populate("sneakers").exec(function (err, watchlist) {
          console.log(owned);
          console.log(watchlist);
          res.render("collections/index", { owned, watchlist });
        });
    });
}
