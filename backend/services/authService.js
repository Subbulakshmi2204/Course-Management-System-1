const bcrypt = require("bcryptjs");
const User = require("../models/User");

function createHttpError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

// Public registration can ONLY create students - the role is never read
// from the request body.
async function registerStudent({ name, email, password, department }) {
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    throw createHttpError("Email is already registered", 409);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  let user;
  try {
    user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: passwordHash,
      department: department.trim(),
      role: "student",
    });
  } catch (error) {
    if (error.code === 11000) {
      throw createHttpError("Email is already registered", 409);
    }
    throw error;
  }

  // Never return the password hash.
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    department: user.department,
    role: user.role,
    createdAt: user.createdAt,
  };
}

async function loginStudent({ email, password }) {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({ email: normalizedEmail });

  // Same message for "no such email" and "wrong password".
  if (!user) {
    throw createHttpError("Invalid email or password", 401);
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    throw createHttpError("Invalid email or password", 401);
  }

  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    department: user.department,
    role: user.role,
  };
}

module.exports = {
  registerStudent,
  loginStudent,
};