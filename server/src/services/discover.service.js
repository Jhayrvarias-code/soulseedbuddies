const mongoose = require("mongoose");
const User = require("../models/users");
const Like = require("../models/like.model");
const Match = require("../models/match.model");

const discoverUsers = async (userId) => {
  const currentUserObjectId = new mongoose.Types.ObjectId(userId);
  // Get current user (to know preferences)
  const currentUser = await User.findById(currentUserObjectId);
  if (!currentUser) {
    throw new Error("User not found");
  }

  // Get users I already liked
  const likes = await Like.find({ fromUser: userId }).select("toUser");
  const likedUserIds = likes.map((like) => like.toUser);

  // Get users I matched with
  const matches = await Match.find({
    users: userId,
  });

  const matchedUserIds = matches.flatMap((match) =>
    match.users.filter((id) => !id.equals(currentUserObjectId))
  );

  // Build exclusion list
  const excludedUserIds = [
    currentUserObjectId,
    ...likedUserIds,
    ...matchedUserIds,
  ];

  const uniqueExcludedUserIds = [
    ...new Set(excludedUserIds.map((id) => id.toString())),
  ].map((id) => new mongoose.Types.ObjectId(id));

  // Find discoverable users
  const users = await User.find({
    _id: { $nin: uniqueExcludedUserIds },
    gender: currentUser.lookingFor,
    lookingFor: currentUser.gender,
  })
    .select(
      "firstName lastName birthDate gender lookingFor photos location lastActive"
    )
    .sort({ lastActive: -1 });

  console.log("excludedUserIds:", uniqueExcludedUserIds);
  console.log("users found:", users.length);

  return users;
};

module.exports = {
  discoverUsers,
};
