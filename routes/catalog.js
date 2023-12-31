const express = require("express");
const router = express.Router();

// Require controller modules
const piece_controller = require("../controllers/pieceController");
const artist_controller = require("../controllers/artistController");

// PIECE ROUTES
// GET catalog home page
router.get("/", piece_controller.index);

// GET request for creating Piece
router.get("/piece/create", piece_controller.piece_create_get);

// POST request for creating Piece
router.post("/piece/create", piece_controller.piece_create_post);

// GET request to delete Piece
router.get("/piece/:id/delete", piece_controller.piece_delete_get);

// POST request to delete Piece
router.post("/piece/:id/delete", piece_controller.piece_delete_post);

// GET request to update Piece
router.get("/piece/:id/update", piece_controller.piece_update_get);
 
// POST request to update Piece
router.post("/piece/:id/update", piece_controller.piece_update_post);

// GET request for one Piece
router.get("/piece/:id", piece_controller.piece_detail);

// GET request for all Pieces
router.get("/pieces", piece_controller.piece_list);

// ARTIST ROUTES
// GET request for creating Artist
router.get("/artist/create", artist_controller.artist_create_get);

// POST request for creating Artist
router.post("/artist/create", artist_controller.artist_create_post);

// GET request to delete Artist
router.get("/artist/:id/delete", artist_controller.artist_delete_get);

// POST request to delete Artist
router.post("/artist/:id/delete", artist_controller.artist_delete_post);

// GET request to update Artist
router.get("/artist/:id/update", artist_controller.artist_update_get);
 
// POST request to update Artist
router.post("/artist/:id/update", artist_controller.artist_update_post);

// GET request for one Artist
router.get("/artist/:id", artist_controller.artist_detail);

// GET request for all Artists
router.get("/artists", artist_controller.artist_list);

module.exports = router;