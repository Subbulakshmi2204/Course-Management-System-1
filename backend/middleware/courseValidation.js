const validateCourse = (req, res, next) => {
  const required = {
    courseName: "Course name",
    courseCode: "Course code",
    instructor: "Instructor",
    duration: "Duration",
    category: "Category",
  };
  for (const [field, label] of Object.entries(required)) {
    if (!req.body[field]) {
      return res.status(400).json({ success: false, message: `${label} is required` });
    }
  }
  next();
};

module.exports = validateCourse;