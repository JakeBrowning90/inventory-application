const Artist = require("../models/artist");
const Piece = require("../models/piece");
const asyncHandler = require("express-async-handler");

// Display list of all Artists
exports.artist_list = asyncHandler(async (req, res, next) => {
    const allArtists = await Artist.find()
        .sort({ name : 1 })
        .exec();

    res.render("artist_list", {
        title: "All Artists",
        artist_list: allArtists
    });
});

// Display details of specific Artist
exports.artist_detail = asyncHandler(async (req, res, next) => {
    const [artist, allPiecesByArtist] = await Promise.all([
        Artist.findById(req.params.id).exec(),
        Piece.find({ artist: req.params.id }, "title").exec(),
    ]);

    if (artist === null) {
        const err = new Error("Artist not found");
        err.status = 404;
        return next(err);
    }

    res.render("artist_detail", {
        title: artist.name,
        artist: artist,
        artist_pieces: allPiecesByArtist,
    });
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