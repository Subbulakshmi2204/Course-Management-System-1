const { body } = require("express-validator");

// NOTE: no normalizeEmail() on purpose - it rewrites Gmail addresses (removes dots),
// which would stop existing users from logging in. The service lowercases + trims.
const registerValidation = [
  body("name").isString().withMessage("Name is required").bail()
    .trim().notEmpty().withMessage("Name is required")
    .isLength({ max: 100 }).withMessage("Name must be at most 100 characters"),
  body("email").isString().withMessage("Valid email is required").bail()
    .trim().isEmail().withMessage("Valid email is required")
    .isLength({ max: 254 }).withMessage("Email is too long"),
  body("department").isString().withMessage("Department is required").bail()
    .trim().notEmpty().withMessage("Department is required")
    .isLength({ max: 100 }).withMessage("Department must be at most 100 characters"),
  body("password").isString().withMessage("Password is required").bail()
    .isLength({ min: 12, max: 72 }).withMessage("Password must be between 12 and 72 characters"),
];

const loginValidation = [
  body("email").isString().withMessage("A valid email and password are required").bail()
    .trim().isEmail().withMessage("A valid email and password are required"),
  body("password").isString().withMessage("A valid email and password are required").bail()
    .notEmpty().withMessage("A valid email and password are required")
    .isLength({ max: 72 }).withMessage("A valid email and password are required"),
];

module.exports = { registerValidation, loginValidation };