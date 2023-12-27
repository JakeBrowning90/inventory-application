const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    first_name: { type: String, maxLength: 30 },
    family_name: { type: String,  required: true,  maxLength: 30 },
    year_of_birth: { type: String, },
    year_of_death: { type: String, },
    bio: { type: String, },
});

ArtistSchema.virtual("name").get(function () {
    let fullname = "";
    if (this.first_name && this.family_name) {
        fullname = `${this.family_name}, ${this.first_name}`;
    }
    return fullname;
});

ArtistSchema.virtual("url").get(function () {
    return`/catalog/artist/${this._id}`;
});

module.exports = mongoose.model("Artist", ArtistSchema);