const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    first_name: { type: String, maxLength: 30 },
    family_name: { type: String,  required: true,  maxLength: 30 },
    year_of_birth: { type: String, maxLength: 10 },
    year_of_death: { type: String, maxLength: 10},
    bio: { type: String, maxLength: 1000},
});

// Show the given name first for the detil page
ArtistSchema.virtual("display_name").get(function () {
    let fullname = "";

    if (this.first_name === "") {
        fullname = `${this.family_name}`;
    } else if (this.family_name === "") {
        fullname = `${this.first_name}`;
    } else {
        fullname = `${this.first_name} ${this.family_name}`;
    } 
    return fullname;
});

// Show the family name first for list
ArtistSchema.virtual("sorted_name").get(function () {
    let fullname = "";

    if (this.first_name === "") {
        fullname = `${this.family_name}`;
    } else if (this.family_name === "") {
        fullname = `${this.first_name}`;
    } else {
        fullname = `${this.family_name}, ${this.first_name}`;
    } 
    return fullname;
});

// Get URL to this artist's detail page
ArtistSchema.virtual("url").get(function () {
    return`/catalog/artist/${this._id}`;
});

module.exports = mongoose.model("Artist", ArtistSchema);