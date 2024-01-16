const Piece = require("../models/piece");
const Artist = require("../models/artist");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const multer = require('multer');

const upload = multer( {dest: 'uploads/'} );

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
    body("image")
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
            image: req.file.filename,
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
    const piece =await Piece.findById(req.params.id).exec();

    if (piece === null) {
        res.redirect("/catalog/pieces");
    }

    res.render("piece_delete", {
        title: "Delete Piece",
        piece: piece,
    });
});

// Handle Piece delete on POST
exports.piece_delete_post = asyncHandler(async (req, res, next) => {
    await Piece.findByIdAndDelete(req.body.pieceid);
        res.redirect("/catalog/pieces")
});

// Display Piece update form on GET
exports.piece_update_get = asyncHandler(async (req, res, next) => {
    const [piece, allArtists] = await Promise.all([
        Piece.findById(req.params.id)
            .populate("artist")
            .exec(),
        Artist.find({}, "first_name family_name")
            .sort({ family_name: 1 })
            .exec(),
    ]);
    
    if (piece === null) {
        const err = new Error("Piece not found");
        err.status = 404;
        return next(err);
    }

    res.render("piece_form", {
        title: "Update Piece",
        piece: piece,
        artists: allArtists
    });
});

// Handle Piece update on POST
exports.piece_update_post = [
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
    body("image")
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
         
            image: req.file.filename,
            _id: req.params.id,
        });

        if (!errors.isEmpty()) {
            res.render("piece_form", {
                title: "Update Piece",
                piece: piece,
                errors: errors.array(),
            });
            return;
        } else {
            const updatedPiece = await Piece.findByIdAndUpdate(req.params.id, piece, {});
            res.redirect(updatedPiece.url);
        }
    })
]