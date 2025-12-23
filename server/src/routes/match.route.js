const express = require("express");
const router = express.Router();

const { getMatches, unmatch } = require("../controllers/match.controller");
const protect = require("../middlewares/auth.middleware");

router.get("/", protect, getMatches);
router.patch("/:matchId/unmatch", protect, unmatch);

module.exports = router;
