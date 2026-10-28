const mongoose = require("mongoose");
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

async function enrollCourse(req, res, next) {
  try {
    // Student identity comes from verified JWT
    const studentId = req.user.sub;
    const { courseId } = req.body;

    if (!mongoose.isValidObjectId(studentId)) {
      return res.status(401).json({
        message: "Invalid student identity"
      });
    }

    if (!mongoose.isValidObjectId(courseId)) {
      return res.status(400).json({
        message: "Valid course ID is required"
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    const existingEnrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId
    });

    if (existingEnrollment) {
      return res.status(409).json({
        message: "Already enrolled in this course"
      });
    }

    const enrollment = await Enrollment.create({
      student: studentId,
      course: courseId
    });

    return res.status(201).json({
      message: "Course enrollment successful",
      enrollment
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Already enrolled in this course"
      });
    }

    next(error);
  }
}

async function getMyCourses(req, res, next) {
  try {
    const studentId = req.user.sub;

    if (!mongoose.isValidObjectId(studentId)) {
      return res.status(401).json({
        message: "Invalid student identity"
      });
    }

    const enrollments = await Enrollment.find({
      student: studentId
    })
      .populate("course")
      .sort({ enrolledAt: -1 });

    return res.status(200).json({
      message: "Enrolled courses fetched successfully",
      totalEnrollments: enrollments.length,
      enrollments
    });
  } catch (error) {
    next(error);
  }
}

async function unenrollCourse(req, res, next) {
  try {
    const studentId = req.user.sub;
    const { courseId } = req.params;

    if (
      !mongoose.isValidObjectId(studentId) ||
      !mongoose.isValidObjectId(courseId)
    ) {
      return res.status(400).json({
        message: "Invalid student or course ID"
      });
    }

    const enrollment = await Enrollment.findOneAndDelete({
      student: studentId,
      course: courseId
    });

    if (!enrollment) {
      return res.status(404).json({
        message: "You are not enrolled in this course"
      });
    }

    return res.status(200).json({
      message: "Successfully unenrolled from course"
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  enrollCourse,
  getMyCourses,
  unenrollCourse
};