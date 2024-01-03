const Artist = require("../models/artist");
const Piece = require("../models/piece");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all Artists
exports.artist_list = asyncHandler(async (req, res, next) => {
    const allArtists = await Artist.find({}, "first_name family_name")
        .sort({ family_name: 1 })
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
        title: artist.display_name,
        artist: artist,
        artist_pieces: allPiecesByArtist,
    });
});

// Display Artist create form on GET
exports.artist_create_get = asyncHandler(async (req, res, next) => {
    res.render("artist_form", { title: "Create Artist" });
});

// Handle Artist create on POST
exports.artist_create_post = [
    body("first_name", "Specify at least 1 name")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("family_name")
        .optional({ values: "falsy" })
        .trim()
        .escape(),
    body("year_of_birth")
        .optional({ values: "falsy" })
        .trim()
        .escape(),
    body("year_of_death")
        .optional({ values: "falsy" })
        .trim()
        .escape(),
    body("bio")
        .optional({ values: "falsy" })
        .trim()
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const artist = new Artist({
            first_name: req.body.first_name,
            family_name: req.body.family_name,
            year_of_birth: req.body.year_of_birth,
            year_of_death: req.body.year_of_death,
            bio: req.body.bio,
        });

        if (!errors.isEmpty()) {
            res.render("artist_form", {
                title: "Create Artist",
                artist: artist,
                errors: errors.array(),
            });
            return;
        } else {
            await artist.save();
            res.redirect(artist.url);
        }
    })
];

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