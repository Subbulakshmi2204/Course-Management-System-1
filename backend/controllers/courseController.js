const service = require("../services/courseService");

const getCourses = async (req, res, next) => {
  try {
    const courses = await service.getAllCourses();
    res.status(200).json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    next(error);
  }
};

const getCourse = async (req, res, next) => {
  try {
    const course = await service.getCourseByKey(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    next(error);
  }
};

const addCourse = async (req, res, next) => {
  try {
    const course = await service.createCourse(req.body);
    if (!course) return res.status(409).json({ success: false, message: "Course id already exists" });
    res.status(201).json({ success: true, message: "Course created successfully", data: course });
  } catch (error) {
    next(error);
  }
};

const editCourse = async (req, res, next) => {
  try {
    const course = await service.updateCourse(req.params.id, req.body);
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });
    res.status(200).json({ success: true, message: "Course updated successfully", data: course });
  } catch (error) {
    next(error);
  }
};

const removeCourse = async (req, res, next) => {
  try {
    if (!(await service.deleteCourse(req.params.id)))
      return res.status(404).json({ success: false, message: "Course not found" });
    res.status(200).json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCourses, getCourse, addCourse, editCourse, removeCourse };