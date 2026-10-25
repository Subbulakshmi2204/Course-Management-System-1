const express = require("express");
const { readDB, writeDB } = require("../config/db");

const router = express.Router();
const newId = (prefix) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

// STUDENTS
router.get("/students", (req, res) => res.json(readDB().students));

router.post("/students", (req, res) => {
  const db = readDB();
  const email = String(req.body.email || "").trim().toLowerCase();
  if (email && db.students.some((s) => String(s.email).toLowerCase() === email)) {
    return res.status(409).json({ error: "Student already exists" });
  }
  const student = { ...req.body, id: req.body.id || newId("stu") };
  db.students.push(student);
  writeDB(db);
  res.status(201).json(student);
});

// ENROLLMENTS
router.get("/enrollments", (req, res) => res.json(readDB().enrollments));

router.post("/enrollments", (req, res) => {
  const db = readDB();
  const enrollment = { ...req.body, id: req.body.id || newId("enr") };
  db.enrollments.push(enrollment);
  writeDB(db);
  res.status(201).json(enrollment);
});

router.patch("/enrollments/:id", (req, res) => {
  const db = readDB();
  const i = db.enrollments.findIndex((e) => e.id === req.params.id);
  if (i === -1) return res.status(404).json({ error: "Enrollment not found" });
  db.enrollments[i] = { ...db.enrollments[i], ...req.body, id: req.params.id };
  writeDB(db);
  res.json(db.enrollments[i]);
});

router.delete("/enrollments/:id", (req, res) => {
  const db = readDB();
  const before = db.enrollments.length;
  db.enrollments = db.enrollments.filter((e) => e.id !== req.params.id);
  if (db.enrollments.length === before) return res.status(404).json({ error: "Enrollment not found" });
  writeDB(db);
  res.json({});
});

module.exports = router;