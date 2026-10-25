const service = require("../services/courseService");

const getCourses = (req, res) => {
  const courses = service.getAllCourses();
  res.status(200).json({ success: true, count: courses.length, data: courses });
};

const getCourse = (req, res) => {
  const course = service.getCourseById(req.params.id);
  if (!course) return res.status(404).json({ success: false, message: "Course not found" });
  res.status(200).json({ success: true, data: course });
};

const addCourse = (req, res) => {
  const course = service.createCourse(req.body);
  if (!course) return res.status(409).json({ success: false, message: "Course id already exists" });
  res.status(201).json({ success: true, message: "Course created successfully", data: course });
};

const editCourse = (req, res) => {
  const course = service.updateCourse(req.params.id, req.body);
  if (!course) return res.status(404).json({ success: false, message: "Course not found" });
  res.status(200).json({ success: true, message: "Course updated successfully", data: course });
};

const removeCourse = (req, res) => {
  if (!service.deleteCourse(req.params.id))
    return res.status(404).json({ success: false, message: "Course not found" });
  res.status(200).json({ success: true, message: "Course deleted successfully" });
};

module.exports = { getCourses, getCourse, addCourse, editCourse, removeCourse };