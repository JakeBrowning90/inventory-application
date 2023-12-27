const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PieceSchema = new Schema({
    title: { type: String, required: true, maxLength: 100 },
    medium: { type: String,  required: true, maxLength: 100 },
    artist: { type: Schema.Types.ObjectId, ref:"Artist", required: true },
    year: { type: String, },
    description: { type: String, },
    height: { type: Number, },
    width: { type: Number, },
    length: { type: Number, },
});

PieceSchema.virtual("url").get(function () {
    return`/catalog/piece/${this._id}`;
});

module.exports = mongoose.model("Piece", PieceSchema);