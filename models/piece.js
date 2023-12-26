const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PieceSchema = new Schema({
    title: { type: String, },
    medium: { type: String, },
    artist: { type: String, },
    year: { type: Date, },
    description: { type: String, },
    height: { type: Number, },
    width: { type: Number, },
    length: { type: Number, },
});

PieceSchema.virtual("url").get(function () {
    return`/catalog/piece/${this._id}`;
});

module.exports = mongoose.model("Piece", PieceSchema);