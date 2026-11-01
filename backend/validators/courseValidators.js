const { body, query } = require("express-validator");

const LEVELS = ["Beginner", "Intermediate", "Advanced"];

// The legacy UI may send duration as a number; store it as text like the model does.
const toText = (value) => (typeof value === "number" ? String(value) : value);

function text(field, label, max, required) {
  let chain = body(field);
  if (!required) chain = chain.optional();
  chain = chain.customSanitizer(toText).isString().withMessage(`${label} must be text`).bail().trim();
  if (required) chain = chain.notEmpty().withMessage(`${label} is required`);
  return chain.isLength({ max }).withMessage(`${label} must be at most ${max} characters`);
}

function stringArray(field, label) {
  return body(field).optional()
    .isArray({ max: 50 }).withMessage(`${label} must be a list of at most 50 items`)
    .bail()
    .custom((items) => items.every((item) => typeof item === "string" && item.length <= 500))
    .withMessage(`${label} items must be text of at most 500 characters`);
}

const shared = (required) => [
  text("courseName", "Course name", 150, required),
  text("courseCode", "Course code", 30, required),
  text("instructor", "Instructor", 100, required),
  text("duration", "Duration", 50, required),
  text("category", "Category", 100, required),
  text("image", "Image", 2000, false),
  text("overview", "Overview", 5000, false),
  text("status", "Status", 30, false),
  body("level").optional().isIn(LEVELS).withMessage(`Level must be one of: ${LEVELS.join(", ")}`),
  stringArray("learningOutcomes", "Learning outcomes"),
  stringArray("modules", "Modules"),
];

const createCourseValidation = shared(true);
const updateCourseValidation = shared(false);

const listCoursesValidation = [
  query("page").optional().isInt({ min: 1 }).withMessage("page must be a positive integer"),
  query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("limit must be between 1 and 100"),
];

module.exports = { createCourseValidation, updateCourseValidation, listCoursesValidation };