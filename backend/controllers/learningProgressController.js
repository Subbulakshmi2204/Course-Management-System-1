const mongoose = require("mongoose");

const LearningProgress = require("../models/LearningProgress");
const Enrollment = require("../models/Enrollment");

// Create or update student learning progress
async function updateProgress(req, res, next) {
  try {
    const studentId = req.user.sub;
    const { courseId, completedLessons, totalLessons } = req.body;

    // Validate student and course IDs
    if (
      !mongoose.isValidObjectId(studentId) ||
      !mongoose.isValidObjectId(courseId)
    ) {
      return res.status(400).json({
        message: "Invalid student or course ID"
      });
    }

    // Validate lesson counts
    if (
      !Number.isInteger(completedLessons) ||
      !Number.isInteger(totalLessons) ||
      totalLessons < 1 ||
      completedLessons < 0 ||
      completedLessons > totalLessons
    ) {
      return res.status(400).json({
        message: "Invalid lesson progress values"
      });
    }

    // Confirm the student is enrolled
    const enrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId,
      status: "active"
    });

    if (!enrollment) {
      return res.status(403).json({
        message: "You must be enrolled in this course"
      });
    }

    // Create or update progress
    let progress = await LearningProgress.findOne({
      student: studentId,
      course: courseId
    });

    if (!progress) {
      progress = new LearningProgress({
        student: studentId,
        course: courseId,
        completedLessons,
        totalLessons
      });
    } else {
      progress.completedLessons = completedLessons;
      progress.totalLessons = totalLessons;
    }

    progress.lastAccessedAt = new Date();

    await progress.save();

    // Reaching 100% marks the enrollment as completed
    if (progress.progressPercentage === 100) {
      await Enrollment.findOneAndUpdate(
        {
          student: studentId,
          course: courseId
        },
        {
          $set: { status: "completed" }
        }
      );
    }

    return res.status(200).json({
      message: "Learning progress updated successfully",
      progress
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Progress record already exists. Please retry."
      });
    }

    next(error);
  }
}

async function getMyProgress(req, res, next) {
  try {
    const studentId = req.user.sub;

    if (!mongoose.isValidObjectId(studentId)) {
      return res.status(401).json({
        message: "Invalid student identity"
      });
    }

    // Active AND completed courses, so finished courses stay visible
    const enrollments = await Enrollment.find({
      student: studentId,
      status: { $in: ["active", "completed"] }
    }).select("course");

    const courseIds = enrollments.map(
      (enrollment) => enrollment.course
    );

    // Retrieve progress for those courses
    const progressRecords = await LearningProgress.find({
      student: studentId,
      course: { $in: courseIds }
    })
      .populate("course", "courseName")
      .sort({ updatedAt: -1 });

    return res.status(200).json({
      message: "Learning progress fetched successfully",
      totalCourses: progressRecords.length,
      progress: progressRecords
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  updateProgress,
  getMyProgress
};