const express = require("express");
const router = express.Router();

// Require controller modules
const artist_controller = require("../controllers/artistController");
const piece_controller = require("../controllers/pieceController");

// ARTIST ROUTES

// PIECE ROUTES

// GET catalog home page
router.get("/", piece_controller.index);

// GET request for creating Piece
router.get();

// POST request for creating Piece
router.post();

// GET request to delete Piece
router.get();

// POST request to delete Piece
router.post();

// GET request to update Piece
router.get();
 
// POST request to update Piece
router.post();

// GET request for one Piece
router.get();

// GET request for all Piece
router.get();