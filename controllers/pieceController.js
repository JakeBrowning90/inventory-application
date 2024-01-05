const Piece = require("../models/piece");
const Artist = require("../models/artist");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
    // const allArtists = Artist.find().sort({ sorted_name: 1 }).exec;

    const allArtists = await Artist.find({}, "first_name family_name")
        .sort({ family_name: 1 })
        .exec();
        
    res.render("piece_form", {
        title: "Create Piece",
        artists: allArtists
    });
});

// Handle Piece create on POST
exports.piece_create_post = [
    body("title")
        .trim()
        .escape(),
    body("medium")
        .trim()
        .escape(),
    body("artist")
        .trim()
        .escape(),
    body("year")
        .trim()
        .escape(),
    body("description")
        .trim()
        .escape(),
    body("height")
        .trim()
        .escape(),
    body("width")
        .trim()
        .escape(),
    body("length")
        .trim()
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const piece = new Piece({
            title: req.body.title,
            medium: req.body.medium,
            artist: req.body.artist,
            year: req.body.year,
            description: req.body.description,
            height: req.body.height,
            width: req.body.width,
            length: req.body.length,
        });

        if (!errors.isEmpty()) {
            res.render("piece_form", {
                title: "Create Piece",
                piece: piece,
                errors: errors.array(),
            });
            return;
        } else {
            await piece.save();
            res.redirect(piece.url);
        }
    })
]

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