const { rateLimit } = require("express-rate-limit");

// 10 FAILED attempts per IP per 15 minutes (successful logins are not counted).
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { success: false, message: "Too many login attempts. Try again later." },
});

module.exports = loginLimiter;