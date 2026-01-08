const { body } = require("express-validator");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const registerValidator = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters"),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters"),

  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email address")
    .matches(emailRegex)
    .withMessage("Email format is not allowed"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(passwordRegex)
    .withMessage(
      "Password must contain uppercase, lowercase, number, and special character"
    ),

  body("birthDate")
    .notEmpty()
    .withMessage("Birthdate is required")
    .isISO8601()
    .withMessage("Birthdate must be a valid date"),

  body("gender").notEmpty().isIn(["male", "female", "other"]),

  body("lookingFor").notEmpty().isIn(["male", "female", "other"]),
];

const loginValidator = [
  body("email").trim().normalizeEmail().isEmail().withMessage("Invalid email"),

  body("password").notEmpty().withMessage("Password is required"),
];

module.exports = { registerValidator, loginValidator };
