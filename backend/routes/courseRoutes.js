const express = require("express");
const c = require("../controllers/courseController");
const validateCourse = require("../middleware/courseValidation");

const router = express.Router();

router.get("/", c.getCourses);
router.get("/:id", c.getCourse);
router.post("/", validateCourse, c.addCourse);
router.put("/:id", c.editCourse);
router.delete("/:id", c.removeCourse);

module.exports = router;