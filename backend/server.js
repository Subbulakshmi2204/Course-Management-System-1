// Load environment variables FIRST (JWT_SECRET, PORT, ...) before anything uses them.
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const courseRoutes = require("./routes/courseRoutes");
const authRoutes = require("./routes/authRoutes");
const legacyRoutes = require("./routes/legacyRoutes");
const notFound = require("./middleware/notFoundMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Student Course Management API is running" });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is healthy",
    timestamp: new Date().toISOString(),
  });
});

// Task 9 + 10: authentication (register / login -> JWT)
app.use("/api/v1/auth", authRoutes);

// Course CRUD: GET is public, POST/PUT/DELETE need a JWT (see courseRoutes.js)
app.use("/api/v1/courses", courseRoutes);

// Older routes: keeps /students and /enrollments working
app.use("/", legacyRoutes);

// These two MUST stay last, after every route above.
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));