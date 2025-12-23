const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate likes
likeSchema.index({ fromUser: 1, toUser: 1 }, { unique: true });

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;
