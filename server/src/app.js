const express = require("express");
const helmet = require("helmet"); // Security middleware, like locks on your doors
const cors = require("cors"); // Allows your frontend (React) to call this backend
// const morgan = require("morgan"); // Logs every request for debugging
const mongoSanitize = require("express-mongo-sanitize");
// const { apiLimiter } = require("./middleware/rateLimiter");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.Routes");
const testRouter = require("./routes/test");
const likeRoutes = require("./routes/like.route");
const matchRoutes = require("./routes/match.route");

const app = express();

app.use(express.json()); // need to be top of authRoutes
// Allow frontend access
app.use(cors());
// Security middlewares
app.use(helmet());
app.use(mongoSanitize());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/matches", matchRoutes);

// console.log("userRoutes:", userRoutes);

app.get("/", (req, res) => {
  res.send("Dating App API is running 🚀");
});

// const User = require("./models/users");

// // Testing Insert to DB
// app.get("/test-user", async (req, res) => {
//   try {
//     const user = await User.create({
//       firstName: "Test",
//       lastName: "User",
//       birthDate: new Date("1990-01-01"),
//       email: "test@example.com",
//       password: "123456",
//       gende: "male",
//       lookingFor: "female",
//     });

//     return res.status(201).json(user);
//   } catch (err) {
//     console.error("/test-user error:", err);
//     const status = err.name === "ValidationError" ? 400 : 500;
//     return res.status(status).json({
//       success: false,
//       message: err.message,
//       errors: err.errors || null,
//     });
//   }
// });

// app.set("trust proxy", 1);
// // Middlewares = like rules in the kitchen
// // Security middlewares
// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],
//         styleSrc: ["'self'", "'unsafe-inline'"],
//         scriptSrc: ["'self'"],
//         imgSrc: ["'self'", "data:", "https:"],
//       },
//     },
//     hsts: {
//       maxAge: 31536000,
//       includeSubDomains: true,
//       preload: true,
//     },
//   })
// ); // Protects from attacks

// // CORS configuration (allow specific frontend origins)
// const allowedOrigins = [
//   process.env.FRONTEND_URL || "http://localhost:3000",
//   "http://localhost:5173",
// ];

// const corsOptions = {
//   origin: (origin, callback) => {
//     // Allow requests with no origin (like mobile apps or curl)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       return callback(null, true);
//     }
//     return callback(new Error("Not allowed by CORS"));
//   },
//   credentials: true,
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions)); // Allows external access

// //body parsing middlewares
// app.use(express.json({ limit: "10kb" })); // Limit payload to 10kb
// app.use(express.urlencoded({ extended: true, limit: "10kb" })); // Allows reading URL-encoded data

// app.use(
//   mongoSanitize({
//     replaceWith: "_",
//     onSanitize: (req, key) => {
//       console.warn(`Sanitized input detected in ${req.path}: ${key}`);
//     },
//   })
// ); // Prevent NoSQL injection attacks

// //Login Middleware
// if (process.env.NODE_ENV === "production") {
//   app.use(morgan("dev")); // Logs each API call
// } else {
//   app.use(morgan("combined")); // More detailed logs in production
// }

// // app.use(apiLimiter); // Apply rate limiting to all requests

// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "Server is running!",
//     timestamp: new Date().toISOString(),
//   });
// });

// //API routes
// app.use("/api/test", testRouter);
// app.use("/api/auth", authRoutes);

// // //404 handler - routes not found
// // app.use((req, res, next) => {
// //   const error = new AppError(`cannot ${req.method} ${req.origi}`, 404);
// //   next(error);
// // });

// // Global error handler (must have 4 args)
// app.use((err, req, res, next) => {
//   console.error("Unhandled error:", {
//     message: err.message,
//     stack: err.stack,
//     path: req.path,
//     method: req.method,
//     timestamp: new Date().toISOString(),
//   });

//   const status = err.status || 500;
//   const response = {
//     success: false,
//     error: err.message || "Internal Server Error",
//   };

//   // Include validation errors if present
//   if (err.errors) {
//     response.errors = err.errors;
//   }

//   // Don't leak error details in production
//   if (process.env.NODE_ENV === "production" && status === 500) {
//     response.error = "Internal server error";
//   }
//   return res.status(status).json(response);
// });

module.exports = app;
