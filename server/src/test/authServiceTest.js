require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const authService = require("../services/auth.services");

// Connect to MongoDB
connectDB();

const testAuth = async () => {
  try {
    console.log("===== TEST REGISTER =====");
    const { user, token } = await authService.registerUser({
      firstName: "Test",
      lastName: "User",
      birthDate: "2000-01-01",
      email: "testauth@example.com",
      password: "12345678",
      gender: "male",
      lookingFor: "female",
    });

    console.log("User created:", user);
    console.log("Token:", token);

    console.log("===== TEST LOGIN =====");
    const loginResult = await authService.loginUser(
      "testauth@example.com",
      "12345678"
    );

    console.log("Login successful:", loginResult.user.firstName);
    console.log("Token:", loginResult.token);
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

testAuth();
