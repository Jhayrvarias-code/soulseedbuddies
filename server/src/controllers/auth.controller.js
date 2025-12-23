const authService = require("../services/auth.services");
// Controller for authentication routes
const register = async (req, res) => {
  try {
    // console.log("REQ BODY:", req.body);
    const { user, token } = await authService.registerUser(req.body);

    res.status(201).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await authService.loginUser(email, password);

    res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { register, login };
