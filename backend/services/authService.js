const bcrypt = require("bcryptjs");
const { randomUUID } = require("crypto");
const students = require("../data/students");

function createHttpError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

async function registerStudent({ name, email, password, department }) {
  const normalizedEmail = email.trim().toLowerCase();

  const existingStudent = students.find(
    (student) => student.email === normalizedEmail
  );

  if (existingStudent) {
    throw createHttpError("Email is already registered", 409);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const student = {
    id: randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    department: department.trim(),
    createdAt: new Date().toISOString(),
  };

  students.push(student);

  // Never return the password hash.
  return {
    id: student.id,
    name: student.name,
    email: student.email,
    department: student.department,
    createdAt: student.createdAt,
  };
}

async function loginStudent({ email, password }) {
  const normalizedEmail = email.trim().toLowerCase();

  const student = students.find((item) => item.email === normalizedEmail);

  // Same message for "no such email" and "wrong password" so the API does not
  // reveal which emails are registered.
  if (!student) {
    throw createHttpError("Invalid email or password", 401);
  }

  const passwordMatches = await bcrypt.compare(password, student.passwordHash);

  if (!passwordMatches) {
    throw createHttpError("Invalid email or password", 401);
  }

  return {
    id: student.id,
    name: student.name,
    email: student.email,
    department: student.department,
  };
}

module.exports = {
  registerStudent,
  loginStudent,
};