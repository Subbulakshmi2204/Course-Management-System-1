const mongoose = require("mongoose");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const LearningProgress = require("../models/LearningProgress");

const FIELDS = [
  "courseName", "courseCode", "instructor", "duration", "level", "category",
  "image", "overview", "learningOutcomes", "modules", "status",
];

const pick = (data) =>
  Object.fromEntries(FIELDS.filter((f) => data[f] !== undefined).map((f) => [f, data[f]]));

const slugify = (text) =>
  String(text).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// A course can be addressed by its MongoDB _id OR its readable slug.
const keyFilter = (key) =>
  mongoose.isValidObjectId(key) ? { $or: [{ _id: key }, { slug: key }] } : { slug: key };

const getAllCourses = () => Course.find().sort({ _id: 1 });

const getCourseByKey = (key) => Course.findOne(keyFilter(key));

// Returns null when the slug already exists.
const createCourse = async (data) => {
  const slug = slugify(data.id || data.slug || data.courseName) || `course-${Date.now()}`;
  if (await Course.exists({ slug })) return null;
  return Course.create({ ...pick(data), slug });
};

const updateCourse = (key, data) =>
  Course.findOneAndUpdate(keyFilter(key), pick(data), { new: true, runValidators: true });

const deleteCourse = async (key) => {
  const course = await Course.findOneAndDelete(keyFilter(key));
  if (!course) return false;
  // Remove records that point to the deleted course.
  await Enrollment.deleteMany({ course: course._id });
  await LearningProgress.deleteMany({ course: course._id });
  return true;
};

module.exports = { getAllCourses, getCourseByKey, createCourse, updateCourse, deleteCourse };