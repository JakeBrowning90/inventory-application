const Piece = require("../models/piece");
const Artist = require("../models/artist");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
    const [
        numArtists,
        numPieces
    ] = await Promise.all([
        Artist.countDocuments({}).exec(),
        Piece.countDocuments({}).exec(),
    ]);

    res.render("index", {
        title: "Art Gallery",
        artist_count: numArtists,
        piece_count: numPieces,
    });
});

// Display list of all Pieces
exports.piece_list = asyncHandler(async (req, res, next) => {
    const allPieces = await Piece.find({}, "title artist")
        .sort({ title: 1 })
        .populate("artist")
        .exec();

    res.render("piece_list", { 
        title: "All Pieces", 
        piece_list: allPieces });
});

// Display details of specific Piece
exports.piece_detail = asyncHandler(async (req, res, next) => {
    const piece = await Piece.findById(req.params.id).populate("artist").exec();

    if (piece === null) {
        const err = new Error("Piece not found");
        err.status = 404;
        return next(err);
    }

    res.render("piece_detail", {
        title: piece.title,
        piece: piece
    });
});

// Display Piece create form on GET
exports.piece_create_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: Piece create GET")
});

// Handle Piece create on POST
exports.piece_create_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: Piece create POST")
});

// Display Piece delete form on GET
exports.piece_delete_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: Piece delete GET")
});

// Handle Piece delete on POST
exports.piece_delete_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: Piece delete POST")
});

// Display Piece update form on GET
exports.piece_update_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: Piece update GET")
});

// Handle Piece update on POST
exports.piece_update_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: Piece update POST")
});