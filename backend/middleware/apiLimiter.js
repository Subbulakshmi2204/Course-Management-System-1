const { rateLimit } = require("express-rate-limit");

// Broad safety net for the whole API (per IP).
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 500,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { success: false, message: "Too many requests. Please slow down." },
});

module.exports = apiLimiter;