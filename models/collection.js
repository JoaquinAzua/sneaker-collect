const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var collectionSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userAvatar: String,
    sneakers: [{type: Schema.Types.ObjectId, ref: 'Sneaker'}],
    collectionName: String,
},{
    timestamps: true
});

var Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection;