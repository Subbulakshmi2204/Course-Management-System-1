const { body, param, query } = require("express-validator");
const { isObjectId } = require("./common");

const studentIdParam = param("id").custom(isObjectId).withMessage("Invalid student ID");

const createStudentValidation = [
  body("name").isString().withMessage("Name is required").bail()
    .trim().notEmpty().withMessage("Name is required")
    .isLength({ max: 100 }).withMessage("Name must be at most 100 characters"),
  body("email").isString().withMessage("Valid email is required").bail()
    .trim().isEmail().withMessage("Valid email is required")
    .isLength({ max: 254 }).withMessage("Email is too long"),
  body("department").optional().isString().withMessage("Invalid department").bail()
    .trim().isLength({ max: 100 }).withMessage("Department must be at most 100 characters"),
  body("password").isString().withMessage("Password is required").bail()
    .isLength({ min: 12, max: 72 }).withMessage("Password must be between 12 and 72 characters"),
];

const updateStudentValidation = [
  studentIdParam,
  body("name").optional().isString().withMessage("Invalid name").bail()
    .trim().notEmpty().withMessage("Invalid name")
    .isLength({ max: 100 }).withMessage("Name must be at most 100 characters"),
  body("email").optional().isString().withMessage("Invalid email").bail()
    .trim().isEmail().withMessage("Invalid email")
    .isLength({ max: 254 }).withMessage("Email is too long"),
  body("department").optional().isString().withMessage("Invalid department").bail()
    .trim().isLength({ max: 100 }).withMessage("Department must be at most 100 characters"),
];

const listStudentsValidation = [
  query("page").optional().isInt({ min: 1 }).withMessage("page must be a positive integer"),
  query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("limit must be between 1 and 100"),
];

module.exports = {
  studentIdParam,
  createStudentValidation,
  updateStudentValidation,
  listStudentsValidation,
};