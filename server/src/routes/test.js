const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// Test route that also returns MongoDB connection status
router.get("/", (req, res) => {
  const readyState = mongoose.connection.readyState; // 0 = disconnected, 1 = connected
  const states = ["disconnected", "connected", "connecting", "disconnecting"];

  res.status(200).json({
    success: true,
    message: "Test route working!",
    db: {
      readyState,
      status: states[readyState] || "unknown",
      name: mongoose.connection.name || null,
    },
  });
});

module.exports = router;
