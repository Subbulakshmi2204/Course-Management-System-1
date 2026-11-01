// Centralised error handler - must be the LAST middleware registered.
function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);

  // MongoDB duplicate key (unique index)
  if (err.code === 11000) {
    return res.status(409).json({ success: false, message: "Duplicate value already exists" });
  }

  // Mongoose schema validation
  if (err.name === "ValidationError" && err.errors) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: Object.values(err.errors).map((item) => item.message),
    });
  }

  // Bad ObjectId etc.
  if (err.name === "CastError") {
    return res.status(400).json({ success: false, message: "Invalid identifier" });
  }

  // Malformed / oversized JSON bodies (thrown by express.json)
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ success: false, message: "Invalid JSON body" });
  }
  if (err.type === "entity.too.large") {
    return res.status(413).json({ success: false, message: "Request body too large" });
  }

  const candidate = err.status || err.statusCode;
  const status = Number.isInteger(candidate) && candidate >= 400 && candidate < 600 ? candidate : 500;

  if (status >= 500) {
    console.error(err); // full detail stays in the server log only
  }

  res.status(status).json({
    success: false,
    message: status === 500 ? "Internal server error" : err.message,
  });
}

module.exports = errorHandler;
