// Load environment variables FIRST (JWT_SECRET, MONGO_URI, PORT, ...) before anything uses them.
require("dotenv").config();

const http = require("http");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

const connectDB = require("./config/mongo");
const initializeSocket = require("./config/socket");
const { getAllowedOrigins } = require("./config/allowedOrigins");

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const profileRoutes = require("./routes/profileRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const learningProgressRoutes = require("./routes/learningProgressRoutes");
const messageRoutes = require("./routes/messageRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const apiLimiter = require("./middleware/apiLimiter");
const notFound = require("./middleware/notFoundMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// Render / Vercel-style hosts sit behind one proxy; without this every visitor
// looks like the same IP to the rate limiter.
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// 1. Security headers, CORS, parsing, logging
app.use(helmet());

const allowedOrigins = getAllowedOrigins();
app.use(
  cors({
    origin(origin, callback) {
      // no Origin header = Postman / curl / server-to-server
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(Object.assign(new Error("Origin not allowed by CORS"), { status: 403 }));
    },
  })
);

app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// 2. Public endpoints
app.get("/", (req, res) => {
  res.json({ message: "Student Course Management API is running" });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    success: true,
    message: "API is running",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
});

// 3. API routes
app.use("/api", apiLimiter);
app.use("/api/v1/auth", authRoutes);                  // Tasks 9-10: register / login (JWT)
app.use("/api/v1/students", studentRoutes);           // Task 9: student CRUD (admin only)
app.use("/api/v1/courses", courseRoutes);             // Task 9: course CRUD (GET public, writes admin only)
app.use("/api/v1/profile", profileRoutes);            // Task 12: own profile
app.use("/api/v1/enrollments", enrollmentRoutes);     // student enrollment
app.use("/api/v1/progress", learningProgressRoutes);  // learning progress
app.use("/api/v1/messages", messageRoutes);           // Task 13: chat history + contacts
app.use("/api/v1/notifications", notificationRoutes); // Task 13: notifications

// 4. These two MUST stay last, in this order.
app.use(notFound);
app.use(errorHandler);

// Socket.IO shares the same HTTP server (one port).
const server = http.createServer(app);
const io = initializeSocket(server);

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await connectDB();
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Could not start server:", error.message);
    process.exit(1);
  }
}

// Graceful shutdown: stop accepting connections, close sockets, close MongoDB.
function shutdown(signal) {
  console.log(`${signal} received, shutting down...`);
  const force = setTimeout(() => process.exit(1), 10000);
  force.unref();
  io.close(async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

process.on("unhandledRejection", (error) => {
  console.error("Unhandled rejection:", error);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
  process.exit(1);
});

if (require.main === module) {
  startServer();
}

module.exports = { app, server };
