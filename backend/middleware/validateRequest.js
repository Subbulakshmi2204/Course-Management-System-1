const { validationResult } = require("express-validator");

// Put after express-validator chains. Returns 400 with the first problem as "message"
// (so the React UI can show it) and the full list as "errors".
function validateRequest(req, res, next) {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const errors = result.array().map((error) => ({
      field: error.path,
      message: error.msg,
    }));

    return res.status(400).json({
      success: false,
      message: errors[0].message,
      errors,
    });
  }

  next();
}

module.exports = validateRequest;