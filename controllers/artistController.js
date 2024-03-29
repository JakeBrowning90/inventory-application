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
        title: "Browse by Artist",
        artist_list: allArtists,
        user: req.user,
    });
});

// Display details of specific Artist
exports.artist_detail = asyncHandler(async (req, res, next) => {
    const [artist, allPiecesByArtist] = await Promise.all([
        Artist.findById(req.params.id).exec(),
        Piece.find({ artist: req.params.id }, "title image").exec(),
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
        user: req.user,
    });
});

// Display Artist create form on GET
exports.artist_create_get = asyncHandler(async (req, res, next) => {
    if (!req.user) {
        res.redirect("/log-in");
    } else {
        res.render("artist_form", { 
            title: "Create Artist", 
            user: req.user,
        });
    }
});

// Handle Artist create on POST
// Removed escapes to allow other chars
exports.artist_create_post = [
    body("first_name")
        .optional({ values: "falsy" })
        .trim(),
        // .isLength({ min: 1 }),
    body("family_name")
        .trim(),
    body("year_of_birth")
        .optional({ values: "falsy" })
        .trim(),
    body("year_of_death")
        .optional({ values: "falsy" })
        .trim(),
    body("bio")
        .optional({ values: "falsy" })
        .trim(),

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
                user: req.user,
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
    const [artist, allPiecesByArtist] = await Promise.all([
        Artist.findById(req.params.id).exec(),
        Piece.find({ artist: req.params.id }, "title").exec(),
    ]);

    if (artist === null) {
        res.redirect("/catalog/artists");
    }
    if (!req.user) {
        res.redirect("/log-in");
    } else {
        res.render("artist_delete", {
            title: "Delete Artist",
            artist: artist,
            artist_pieces: allPiecesByArtist,
            user: req.user,
        });
    }
});

// Handle Artist delete on POST
exports.artist_delete_post = asyncHandler(async (req, res, next) => {
    const [artist, allPiecesByArtist] = await Promise.all([
        Artist.findById(req.params.id).exec(),
        Piece.find({ artist: req.params.id }, "title").exec(),
    ]);

    if (allPiecesByArtist.length > 0) {
        res.render("artist_delete", {
            title: "Delete Artist",
            artist: artist,
            artist_pieces: allPiecesByArtist,
        });
        return;
    } else {
        await Artist.findByIdAndDelete(req.body.artistid);
        res.redirect("/catalog/artists")
    }
});

// Display Artist update form on GET
exports.artist_update_get = asyncHandler(async (req, res, next) => {
    const [artist] = await Promise.all([
        Artist.findById(req.params.id).exec(),
    ]);

    if (artist === null) {
        const err = new Error("Artist not found");
        err.status = 404;
        return next(err);
    }

    if (!req.user) {
        res.redirect("/log-in");
    } else {
        res.render("artist_form", {
            title: "Update Artist",
            artist: artist,
            user: req.user,
        });
    }
});

// Handle Artist update on POST
exports.artist_update_post = [
    body("first_name")
    .optional({ values: "falsy" })
    .trim(),
    // .isLength({ min: 1 }),
    body("family_name")
    .trim(),
    body("year_of_birth")
    .optional({ values: "falsy" })
    .trim(),
    body("year_of_death")
    .optional({ values: "falsy" })
    .trim(),
    body("bio")
    .optional({ values: "falsy" })
    .trim(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const artist = new Artist({
            first_name: req.body.first_name,
            family_name: req.body.family_name,
            year_of_birth: req.body.year_of_birth,
            year_of_death: req.body.year_of_death,
            bio: req.body.bio,
            _id: req.params.id,
        });

        if (!errors.isEmpty()) {
            res.render("artist_form", {
                title: "Update Artist",
                artist: artist,
                errors: errors.array(),
                user: req.user,
            });
            return;
        } else {
            const updatedArtist = await Artist.findByIdAndUpdate(req.params.id, artist, {});
            res.redirect(updatedArtist.url);
        }
    })
]