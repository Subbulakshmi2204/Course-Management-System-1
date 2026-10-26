// In-memory student store (resets whenever the server restarts).
// Each student looks like: { id, name, email, passwordHash, department, createdAt }
const students = [];

module.exports = students;