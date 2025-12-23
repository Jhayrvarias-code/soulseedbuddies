const User = require("../models/users");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const registerUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await User.create(userData);

  const token = generateToken(user._id);

  return { user, token };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user._id);

  return { user, token };
};

module.exports = {
  registerUser,
  loginUser,
};
