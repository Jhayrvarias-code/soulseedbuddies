const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth.middleware");
const messageController = require("../controllers/message.controller");

router.post("/", protect, messageController.send); // Send a message
router.get("/:userId", protect, messageController.fetch); // Get conversation with a user

module.exports = router;
