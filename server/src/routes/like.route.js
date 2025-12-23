const express = require("express");
const router = express.Router();

const { like } = require("../controllers/like.controller");
const protect = require("../middlewares/auth.middleware");

/**
 * POST /api/likes/:userId
 * Like a user
 */
router.post("/:userId", protect, like);

module.exports = router;
