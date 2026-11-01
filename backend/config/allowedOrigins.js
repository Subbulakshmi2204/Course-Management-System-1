// Single source of truth for trusted browser origins (used by Express CORS and Socket.IO).
// CLIENT_URL may hold several comma-separated origins, e.g.
//   CLIENT_URL=http://localhost:5173,https://your-app.vercel.app
function getAllowedOrigins() {
  return (process.env.CLIENT_URL || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim().replace(/\/+$/, "")) // tolerate a trailing slash
    .filter(Boolean);
}

module.exports = { getAllowedOrigins };