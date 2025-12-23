const mongoose = require("mongoose");
const Like = require("../models/like.model");
const Match = require("../models/match.model");

const likeUser = async (fromUserId, toUserId) => {
  // Prevent liking yourself
  if (fromUserId.toString() === toUserId.toString()) {
    throw new Error("You cannot like yourself");
  }

  // Validate ObjectId
  if (
    !mongoose.Types.ObjectId.isValid(fromUserId) ||
    !mongoose.Types.ObjectId.isValid(toUserId)
  ) {
    throw new Error("Invalid user ID");
  }

  // Check if already liked
  const existingLike = await Like.findOne({
    fromUser: fromUserId,
    toUser: toUserId,
  });

  if (existingLike) {
    throw new Error("You already liked this user");
  }

  // Create the like
  await Like.create({
    fromUser: fromUserId,
    toUser: toUserId,
  });

  // Check if the other user liked back
  const mutualLike = await Like.findOne({
    fromUser: toUserId,
    toUser: fromUserId,
  });

  // If mutual, create match
  if (mutualLike) {
    const users = [
      new mongoose.Types.ObjectId(fromUserId),
      new mongoose.Types.ObjectId(toUserId),
    ].sort(); // ensure consistent order

    const match = await Match.findOneAndUpdate(
      { users },
      { users },
      { upsert: true, new: true }
    );

    return {
      matched: true,
      match,
    };
  }

  // No match yet
  return {
    matched: false,
  };
};

module.exports = {
  likeUser,
};
