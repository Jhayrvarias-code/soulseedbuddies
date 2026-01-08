const { discoverUsers } = require("../services/discover.service");

const discover = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const users = await discoverUsers(userId);

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  discover,
};
