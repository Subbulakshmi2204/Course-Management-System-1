const express = require("express");
const c = require("../controllers/courseController");
const validateCourse = require("../middleware/courseValidation");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Public: anyone can browse courses.
router.get("/", c.getCourses);
router.get("/:id", c.getCourse);

// Login required (valid JWT) to change courses.
router.post("/", authenticateToken, validateCourse, c.addCourse);
router.put("/:id", authenticateToken, c.editCourse);
router.delete("/:id", authenticateToken, c.removeCourse);

module.exports = router;