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
        // title: "Art Gallery",
        artist_count: numArtists,
        piece_count: numPieces,
        user: req.user,
    });
});

// Display list of all Pieces
exports.piece_list = asyncHandler(async (req, res, next) => {
    const allPieces = await Piece.find({}, "title artist image")
        .sort({ title: 1 })
        .populate("artist")
        .exec();

    res.render("piece_list", { 
        title: "Browse by Piece", 
        piece_list: allPieces,
        user: req.user, 
    });
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
        piece: piece,
        user: req.user,
    });
});

// Display Piece create form on GET
exports.piece_create_get = asyncHandler(async (req, res, next) => {
    const allArtists = await Artist.find({}, "first_name family_name")
        .sort({ family_name: 1 })
        .exec();
        
    res.render("piece_form", {
        title: "Create Piece",
        artists: allArtists,
        user: req.user,
    });
});

// Handle Piece create on POST
// Removed escapes to allow other chars
exports.piece_create_post = [
    body("title")
        .trim(),
    body("medium")
        .trim(),
    body("artist")
        .trim(),
    body("year")
        .trim(),
    body("description")
        .trim(),
    body("height")
        .trim(),
    body("width")
        .trim(),
    body("image")
        .trim(),

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
            image: req.file.filename,
        });

        console.log(piece)
 
        if (!errors.isEmpty()) {
            res.render("piece_form", {
                title: "Create Piece",
                piece: piece,
                errors: errors.array(),
                user: req.user,
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
        user: req.user,
    });
});

// Handle Piece delete on POST
// TODO: Delete image from folder on delete (update submit to match filename to pieceID?)
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
        artists: allArtists,
        user: req.user,
    });
});

// Handle Piece update on POST
exports.piece_update_post = [
    body("title")
        .trim(),
    body("medium")
        .trim(),
    body("artist")
        .trim(),
    body("year")
        .trim(),
    body("description")
        .trim(),
    body("height")
        .trim(),
    body("width")
        .trim(),
    body("image")
        .trim(),

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
            image: req.file.filename,
            _id: req.params.id,
        });

        console.log(piece)

        if (!errors.isEmpty()) {
            res.render("piece_form", {
                title: "Update Piece",
                piece: piece,
                errors: errors.array(),
                user: req.user,
            });
            return;
        } else {
            const updatedPiece = await Piece.findByIdAndUpdate(req.params.id, piece, {});
            res.redirect(updatedPiece.url);
        }
    })
]