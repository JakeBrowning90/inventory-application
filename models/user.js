const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: { type: String, required: true },
    family_name: { type: String,  required: true },
});

module.exports = mongoose.model("User", UserSchema);