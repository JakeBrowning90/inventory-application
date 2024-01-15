const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PieceSchema = new Schema({
    title: { type: String, required: true, maxLength: 100 },
    medium: { type: String,  required: true, maxLength: 100 },
    artist: { type: Schema.Types.ObjectId, ref:"Artist", required: true },
    year: { type: String, maxLength: 20 },
    description: { type: String, maxLength: 500},
    height: { type: Number, min: 0 },
    width: { type: Number, min: 0 },
    length: { type: Number, min: 0 },
    image: { type: String  }
});

PieceSchema.virtual("url").get(function () {
    return`/catalog/piece/${this._id}`;
});

module.exports = mongoose.model("Piece", PieceSchema);