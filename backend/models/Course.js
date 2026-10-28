const mongoose = require("mongoose");

// MongoDB gives every course an ObjectId (_id). "slug" keeps the readable id
// your React app already uses in URLs (e.g. "python-masterclass").
const courseSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    courseName: { type: String, required: true, trim: true },
    courseCode: { type: String, trim: true, default: "" },
    instructor: { type: String, trim: true, default: "" },
    duration: { type: String, trim: true, default: "" },
    level: { type: String, trim: true, default: "Beginner" },
    category: { type: String, trim: true, default: "" },
    image: { type: String, default: "" },
    overview: { type: String, default: "" },
    learningOutcomes: { type: [String], default: [] },
    modules: { type: [String], default: [] },
    status: { type: String, default: "Active" }
  },
  { timestamps: true }
);

// API output keeps "id" (= slug) for the existing frontend, plus the real "_id".
courseSchema.set("toJSON", {
  transform(doc, ret) {
    if (ret.slug) ret.id = ret.slug;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model("Course", courseSchema);