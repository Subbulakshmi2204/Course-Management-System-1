const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");
const { getProfile, updateProfile } = require("../controllers/profileController");

const updateValidation = [
  body("name").optional().isString().withMessage("Valid name is required").bail()
    .trim().notEmpty().withMessage("Valid name is required")
    .isLength({ max: 100 }).withMessage("Name must be at most 100 characters"),
  body("department").optional().isString().withMessage("Invalid department").bail()
    .trim().isLength({ max: 100 }).withMessage("Department must be at most 100 characters"),
];

router.get("/", authMiddleware, getProfile);
router.put("/", authMiddleware, updateValidation, validateRequest, updateProfile);

module.exports = router;