const Sneaker = require('../models/sneaker');
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();


module.exports = {
    create,
}

function create(req, res, next) {
    Sneaker.findById(req.params.styleID, function(err, sneaker){

        //add user properties to the review being created
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        // add the review to the sneaker.reviews array
        sneaker.reviews.push(req.body);
        // save the parent document
        sneaker.save(function(err){
            if (err) console.log(err);
            console.log({sneaker})
            res.redirect(`/sneakers/${styleID}`)
        });
    });
}