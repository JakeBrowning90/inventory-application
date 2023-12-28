const Artist = require("../models/artist");
const asyncHandler = require("express-async-handler");

// Display list of all Artists
exports.artist_list = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: Artist list")
});

// Display details of specific Artist
exports.artist_detail = asyncHandler(async (req, res, next) => {
    res.send(`Not implemented: Artist detail: ${req.params.id}`)
});

// Display Artist create form on GET
exports.artist_create_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: Artist create GET")
});

// Handle Artist create on POST
exports.artist_create_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: Artist create POST")
});

// Display Artist delete form on GET
exports.artist_delete_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: Artist delete GET")
});

// Handle Artist delete on POST
exports.artist_delete_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: Artist delete POST")
});

// Display Artist update form on GET
exports.artist_update_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: Artist update GET")
});

// Handle Artist update on POST
exports.artist_update_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: Artist update POST")
});