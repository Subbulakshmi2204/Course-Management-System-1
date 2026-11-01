const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Enrollment = require("../models/Enrollment");
const LearningProgress = require("../models/LearningProgress");
const Notification = require("../models/Notification");
const Message = require("../models/Message");

const publicFields = "name email department role createdAt updatedAt";

async function getStudents(req, res, next) {
  try {
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, Number.parseInt(req.query.limit, 10) || 20));
    const filter = { role: "student" };

    const [students, total] = await Promise.all([
      User.find(filter).select(publicFields).sort({ createdAt: -1 })
        .skip((page - 1) * limit).limit(limit).lean(),
      User.countDocuments(filter),
    ]);

    res.json({ students, page, limit, total, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    next(error);
  }
}

async function getStudentById(req, res, next) {
  try {
    const student = await User.findOne({ _id: req.params.id, role: "student" })
      .select(publicFields).lean();

    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ student });
  } catch (error) {
    next(error);
  }
}

async function createStudent(req, res, next) {
  try {
    const { name, email, password, department } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    if (await User.exists({ email: normalizedEmail })) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const student = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: await bcrypt.hash(password, 12),
      department: typeof department === "string" ? department.trim() : "",
      role: "student",
    });

    res.status(201).json({
      message: "Student created",
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        department: student.department,
        role: student.role,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function updateStudent(req, res, next) {
  try {
    const updates = {};
    if (req.body.name !== undefined) updates.name = req.body.name.trim();
    if (req.body.email !== undefined) updates.email = req.body.email.trim().toLowerCase();
    if (req.body.department !== undefined) updates.department = req.body.department.trim();

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid fields supplied" });
    }

    // Duplicate emails are caught by the unique index (E11000 -> 409 in errorMiddleware).
    const student = await User.findOneAndUpdate(
      { _id: req.params.id, role: "student" },
      { $set: updates },
      { new: true, runValidators: true }
    ).select(publicFields);

    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student updated", student });
  } catch (error) {
    next(error);
  }
}

async function deleteStudent(req, res, next) {
  try {
    const student = await User.findOneAndDelete({ _id: req.params.id, role: "student" });
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Remove records that belonged to this student so nothing is left orphaned.
    await Promise.all([
      Enrollment.deleteMany({ student: student._id }),
      LearningProgress.deleteMany({ student: student._id }),
      Notification.deleteMany({ recipient: student._id }),
      Message.deleteMany({ $or: [{ sender: student._id }, { recipient: student._id }] }),
    ]);

    res.json({ message: "Student deleted" });
  } catch (error) {
    next(error);
  }
}

module.exports = { getStudents, getStudentById, createStudent, updateStudent, deleteStudent };