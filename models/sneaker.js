const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: {type: String, required: true},
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5
    },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userAvatar: String
  }, {
    timestamps: true
  });

var SneakerSchema = new Schema({
    shoeName: String,
    brand: String,
    styleID: String, 
    reviews: [reviewSchema]
});

var Sneaker = mongoose.model("Sneaker", SneakerSchema);

module.exports = Sneaker;