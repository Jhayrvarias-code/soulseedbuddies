const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/validate.middleware");
const {
  registerValidator,
  loginValidator,
} = require("../validators/auth.validator");

// console.log(typeof registerValidator);
// console.log(Array.isArray(registerValidator));
// console.log("validate:", typeof validate);
// console.log("authController.register:", typeof authController.register);

router.post("/register", registerValidator, validate, authController.register);

router.post("/login", loginValidator, validate, authController.login);

// router.get("/profile", jwtAuth, (req, res) => {
//   res.json({
//     success: true,
//     message: "This is a protected route",
//     userId: req.userId,
//   });
// });

// router.get("/me", jwtAuth, async (req, res, next) => {
//   try {
//     const User = require("../models/users");
//     const user = await User.findById(req.userId).select("-password");

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         error: "User not found",
//       });
//     }

//     res.json({
//       success: true,
//       user,
//     });
//   } catch (err) {
//     next(err);
//   }
// });
module.exports = router;
