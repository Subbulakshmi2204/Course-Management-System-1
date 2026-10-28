const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  updateProgress,
  getMyProgress
} = require("../controllers/learningProgressController");

router.get(
  "/my-progress",
  authenticateToken,
  authorizeRoles("student"),
  getMyProgress
);

// Only authenticated students can update progress
router.put(
  "/",
  authenticateToken,
  authorizeRoles("student"),
  updateProgress
);

module.exports = router;