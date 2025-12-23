const { likeUser } = require("../services/like.service");

/**
 * @desc    Like a user
 * @route   POST /api/likes/:userId
 * @access  Private
 */
const like = async (req, res, next) => {
  try {
    // 1️⃣ Logged-in user (from auth middleware)
    const fromUserId = req.user.id;

    // 2️⃣ Target user (from URL)
    const toUserId = req.params.userId;

    // 3️⃣ Call service
    const result = await likeUser(fromUserId, toUserId);

    // 4️⃣ Respond
    if (result.matched) {
      return res.status(201).json({
        success: true,
        message: "It's a match!",
        match: result.match,
      });
    }

    return res.status(201).json({
      success: true,
      message: "User liked successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  like,
};
