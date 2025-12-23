require("dotenv").config(); // Loads environment variables (like opening your secret vault)
const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");
// const validateEnv = require("./config/validateEnv");

const PORT = process.env.PORT || 5000;

const MONGO_URI = process.env.MONGO_URI;

// Main function to start server + database
async function startServer() {
  try {
    // console.log("Validating environment variables...");
    // validateEnv();

    // Step 1: Connect to database (warehouse)
    await connectDB();

    // Step 2: Create HTTP server (restaurant building)
    const server = http.createServer(app);

    // Step 3: Start listening for customers (client requests)
    server.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Server startup failed:", err.message);
    process.exit(1);
  }
}

startServer();
