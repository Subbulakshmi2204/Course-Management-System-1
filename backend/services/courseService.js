const { readDB, writeDB } = require("../config/db");

const getAllCourses = () => readDB().courses;

const getCourseById = (id) => readDB().courses.find((c) => c.id === id);

const createCourse = (courseData) => {
  const db = readDB();
  const course = { ...courseData, id: courseData.id || `course-${Date.now()}` };
  if (db.courses.some((c) => c.id === course.id)) return null; // duplicate id
  db.courses.push(course);
  writeDB(db);
  return course;
};

const updateCourse = (id, courseData) => {
  const db = readDB();
  const index = db.courses.findIndex((c) => c.id === id);
  if (index === -1) return null;
  db.courses[index] = { ...db.courses[index], ...courseData, id };
  writeDB(db);
  return db.courses[index];
};

const deleteCourse = (id) => {
  const db = readDB();
  const before = db.courses.length;
  db.courses = db.courses.filter((c) => c.id !== id);
  if (db.courses.length === before) return false;
  writeDB(db);
  return true;
};

module.exports = { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse };