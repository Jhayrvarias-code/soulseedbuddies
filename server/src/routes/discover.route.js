const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const discoverController = require("../controllers/discover.controller");

router.get("/", protect, discoverController.discover);

module.exports = router;
