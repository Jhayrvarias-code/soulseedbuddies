const { getUserMatches, unmatchUser } = require("../services/match.service");

/**
 * @desc    Get all matches
 * @route   GET /api/matches
 * @access  Private
 */
const getMatches = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const matches = await getUserMatches(userId);

    res.status(200).json({
      success: true,
      count: matches.length,
      matches,
    });
  } catch (error) {
    next(error);
  }
};

const unmatch = async (req, res, next) => {
  try {
    const { matchId } = req.params;
    const userId = req.user.id;

    const match = await unmatchUser(matchId, userId);

    res.status(200).json({
      success: true,
      message: "Unmatched successfully",
      match,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMatches,
  unmatch,
};
