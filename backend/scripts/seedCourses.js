// One-time import of the 12 courses from scripts/courses.seed.json into MongoDB.
// Safe to run again: existing courses (same slug) are left untouched.
require("dotenv").config();

const mongoose = require("mongoose");
const Course = require("../models/Course");
const { courses } = require("./courses.seed.json");

async function seedCourses() {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI is required");
    await mongoose.connect(process.env.MONGO_URI);

    let added = 0;
    for (const { id, ...rest } of courses) {
      const result = await Course.updateOne(
        { slug: id },
        { $setOnInsert: { slug: id, ...rest } },
        { upsert: true }
      );
      if (result.upsertedCount) added += 1;
    }

    console.log(`Courses imported: ${added} added, ${courses.length - added} already existed.`);
  } catch (error) {
    console.error("Course import failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedCourses();