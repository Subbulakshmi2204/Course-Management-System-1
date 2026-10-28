require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

async function createAdmin() {
  try {
    const mongoUri = process.env.MONGO_URI;
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    if (!mongoUri || !email || !password) {
      throw new Error(
        "MONGO_URI, ADMIN_EMAIL and ADMIN_PASSWORD are required"
      );
    }

    if (password.length < 12) {
      throw new Error(
        "Admin password must contain at least 12 characters"
      );
    }

    await mongoose.connect(mongoUri);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error(
        "This email already belongs to an existing account. " +
        "Choose a different admin email."
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = new User({
      name: "Administrator",
      email,
      password: hashedPassword,
      department: "Administration",
      role: "admin"
    });

    await admin.save();

    console.log("Admin account created successfully!");
  } catch (error) {
    console.error("Admin setup failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();