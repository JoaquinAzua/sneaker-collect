const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var SneakerSchema = new Schema({
    shoeName: String,
    brand: String,
    styleID: String, 
});

var Sneaker = mongoose.model("Sneaker", SneakerSchema);

module.exports = Sneaker;