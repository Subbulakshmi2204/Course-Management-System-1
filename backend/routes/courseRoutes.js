const express = require("express");
const c = require("../controllers/courseController");
const validateRequest = require("../middleware/validateRequest");
const {
  createCourseValidation,
  updateCourseValidation,
  listCoursesValidation,
} = require("../validators/courseValidators");
const { authenticateToken } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Public: anyone can browse courses.
router.get("/", listCoursesValidation, validateRequest, c.getCourses);
router.get("/:id", c.getCourse);

// Admin only: valid JWT (401 otherwise) AND role "admin" (403 otherwise).
router.post("/", authenticateToken, authorizeRoles("admin"), createCourseValidation, validateRequest, c.addCourse);
router.put("/:id", authenticateToken, authorizeRoles("admin"), updateCourseValidation, validateRequest, c.editCourse);
router.delete("/:id", authenticateToken, authorizeRoles("admin"), c.removeCourse);

module.exports = router;