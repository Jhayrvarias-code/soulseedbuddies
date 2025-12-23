const Match = require("../models/match.model");

/**
 * Get all matches for a user
 */
const getUserMatches = async (userId) => {
  const matches = await Match.find({
    users: userId,
    unmatched: false,
  })
    .populate("users", "firstName lastName photos")
    .sort({ updatedAt: -1 });

  return matches;
};

//new added
const unmatchUser = async (matchId, userId) => {
  const match = await Match.findById(matchId);

  if (!match) {
    throw new Error("Match not found");
  }

  if (match.unmatched) {
    throw new Error("Match already unmatched");
  }

  // Ensure requester is part of the match
  const isParticipant = match.users.some(
    (u) => u.toString() === userId.toString()
  );

  if (!isParticipant) {
    throw new Error("You are not part of this match");
  }

  match.unmatched = true;
  match.unmatchedBy = userId;

  await match.save();

  return match;
};

module.exports = {
  getUserMatches,
  unmatchUser,
};
