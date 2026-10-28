const express = require("express");
const c = require("../controllers/courseController");
const validateCourse = require("../middleware/courseValidation");
const { authenticateToken } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Public: anyone can browse courses.
router.get("/", c.getCourses);
router.get("/:id", c.getCourse);

// Admin only: valid JWT (401 otherwise) AND role "admin" (403 otherwise).
router.post("/", authenticateToken, authorizeRoles("admin"), validateCourse, c.addCourse);
router.put("/:id", authenticateToken, authorizeRoles("admin"), c.editCourse);
router.delete("/:id", authenticateToken, authorizeRoles("admin"), c.removeCourse);

module.exports = router;