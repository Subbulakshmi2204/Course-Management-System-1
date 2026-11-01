// End-to-end checks for Tasks 9-14. Needs the backend running and the admin account created.
//   1) npm run create-admin     2) npm start     3) npm run test:api   (second terminal)
// Reads ADMIN_EMAIL / ADMIN_PASSWORD from backend/.env. Uses throw-away users and courses.
require("dotenv").config();
const { io } = require("socket.io-client");
const mongoose = require("mongoose");

const BASE = process.env.TEST_BASE_URL || `http://localhost:${process.env.PORT || 4000}`;
const API = `${BASE}/api/v1`;
const stamp = Date.now();
const PASSWORD = "Str0ng-Test-Pass-123";
let passed = 0, failed = 0;

function check(name, ok, extra = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${ok ? "" : "  -> " + extra}`);
  ok ? passed++ : failed++;
}

async function call(method, path, { token, body, raw } = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: body === undefined ? undefined : raw ? body : JSON.stringify(body),
  });
  let data = {};
  try { data = await res.json(); } catch {}
  return { status: res.status, data };
}
const expect = (name, r, status) => check(`${name} (expect ${status})`, r.status === status, `got ${r.status} ${JSON.stringify(r.data)}`);

function connectSocket(token) {
  return new Promise((resolve) => {
    const s = io(BASE, { auth: { token }, reconnection: false, transports: ["websocket"] });
    s.on("connect", () => resolve({ socket: s }));
    s.on("connect_error", (err) => resolve({ error: err.message }));
  });
}

(async () => {
  const health = await fetch(`${BASE}/api/health`).then((r) => r.json()).catch(() => null);
  if (!health) { console.error(`Backend not reachable at ${BASE}. Run "npm start" first.`); process.exit(1); }
  check("Health endpoint reports ok", health.status === "ok" && health.database === "connected", JSON.stringify(health));

  // ---------- Task 9/10: auth ----------
  const A = { name: "Test A", email: `a${stamp}@example.com`, department: "CSE", password: PASSWORD };
  const B = { name: "Test B", email: `b${stamp}@example.com`, department: "ECE", password: PASSWORD };

  expect("Register student A", await call("POST", "/auth/register", { body: A }), 201);
  expect("Register student B", await call("POST", "/auth/register", { body: B }), 201);
  expect("Duplicate email", await call("POST", "/auth/register", { body: A }), 409);
  expect("Invalid email", await call("POST", "/auth/register", { body: { ...A, email: "nope" } }), 400);
  expect("Missing fields", await call("POST", "/auth/register", { body: { email: "x@y.com" } }), 400);
  expect("Short password (<12)", await call("POST", "/auth/register", { body: { ...A, email: `c${stamp}@example.com`, password: "short" } }), 400);
  const rolePush = await call("POST", "/auth/register", { body: { ...A, email: `d${stamp}@example.com`, role: "admin" } });
  expect("Register ignores role:'admin' (still student)", rolePush, 201);
  check("  ...and the new account is role student", rolePush.data.student?.role === "student");

  const loginA = await call("POST", "/auth/login", { body: { email: A.email, password: PASSWORD } });
  expect("Login student A", loginA, 200);
  check("  ...returns a JWT", typeof loginA.data.token === "string");
  const tokenA = loginA.data.token, idA = loginA.data.student?.id;
  const loginB = await call("POST", "/auth/login", { body: { email: B.email, password: PASSWORD } });
  const tokenB = loginB.data.token, idB = loginB.data.student?.id;
  expect("Wrong password", await call("POST", "/auth/login", { body: { email: A.email, password: "wrong-password-123" } }), 401);

  const adminLogin = await call("POST", "/auth/login", { body: { email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD } });
  expect("Admin login (run npm run create-admin first)", adminLogin, 200);
  const admin = adminLogin.data.token;
  if (!admin) { console.error("Cannot continue without admin."); process.exit(1); }

  // ---------- Task 10: protection ----------
  expect("Profile without token", await call("GET", "/profile"), 401);
  expect("Profile with garbage token", await call("GET", "/profile", { token: "abc.def.ghi" }), 401);
  const jwt = require("jsonwebtoken");
  const expired = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { subject: idA, expiresIn: -10 });
  expect("Expired token", await call("GET", "/profile", { token: expired }), 401);
  const noneAlg = Buffer.from('{"alg":"none","typ":"JWT"}').toString("base64url") + "." + Buffer.from(JSON.stringify({ sub: idA, role: "admin" })).toString("base64url") + ".";
  expect("Token with alg:none is rejected", await call("GET", "/students", { token: noneAlg }), 401);
  expect("Student cannot list students", await call("GET", "/students", { token: tokenA }), 403);
  expect("Student cannot create course", await call("POST", "/courses", { token: tokenA, body: {} }), 403);
  expect("Student cannot delete course", await call("DELETE", "/courses/anything", { token: tokenA }), 403);
  expect("Students list without token", await call("GET", "/students"), 401);

  // ---------- Task 9/12: student CRUD (admin) ----------
  const list = await call("GET", "/students?page=1&limit=5", { token: admin });
  expect("Admin lists students", list, 200);
  check("  ...no password field leaked", !JSON.stringify(list.data).includes("password"));
  expect("Admin gets student by id", await call("GET", `/students/${idA}`, { token: admin }), 200);
  expect("Invalid student id", await call("GET", "/students/not-an-id", { token: admin }), 400);
  expect("Unknown student id", await call("GET", "/students/64b7f0c2a1b2c3d4e5f60718", { token: admin }), 404);
  const created = await call("POST", "/students", { token: admin, body: { name: "Made By Admin", email: `m${stamp}@example.com`, department: "IT", password: PASSWORD } });
  expect("Admin creates student", created, 201);
  expect("Admin create duplicate email", await call("POST", "/students", { token: admin, body: { name: "X", email: `m${stamp}@example.com`, password: PASSWORD } }), 409);
  expect("Admin create missing fields", await call("POST", "/students", { token: admin, body: { name: "X" } }), 400);
  const madeId = created.data.student?.id;
  const upd = await call("PUT", `/students/${madeId}`, { token: admin, body: { name: "Renamed" } });
  expect("Admin updates student", upd, 200);
  check("  ...name changed", upd.data.student?.name === "Renamed");
  expect("Update to a duplicate email", await call("PUT", `/students/${madeId}`, { token: admin, body: { email: A.email } }), 409);
  expect("Update with no fields", await call("PUT", `/students/${madeId}`, { token: admin, body: {} }), 400);
  expect("Admin deletes student", await call("DELETE", `/students/${madeId}`, { token: admin }), 200);
  expect("Deleted student is gone", await call("GET", `/students/${madeId}`, { token: admin }), 404);

  // ---------- Task 12: profile ----------
  expect("Get own profile", await call("GET", "/profile", { token: tokenA }), 200);
  const prof = await call("PUT", "/profile", { token: tokenA, body: { name: "Test A Renamed" } });
  expect("Update own profile", prof, 200);
  check("  ...persisted", (await call("GET", "/profile", { token: tokenA })).data.user?.name === "Test A Renamed");
  expect("Profile update with empty name", await call("PUT", "/profile", { token: tokenA, body: { name: "  " } }), 400);
  const bProfile = await call("GET", "/profile", { token: tokenB });
  check("Profile update cannot touch another user (B unchanged)", bProfile.data.user?.name === "Test B");

  // ---------- Task 9/12: course CRUD ----------
  const course = { courseName: `Test Course ${stamp}`, courseCode: "T101", instructor: "Dr Test", duration: "4 Weeks", category: "Programming" };
  expect("Public course list", await call("GET", "/courses"), 200);
  expect("Paginated course list", await call("GET", "/courses?page=1&limit=3"), 200);
  expect("Bad pagination value", await call("GET", "/courses?limit=100000"), 400);
  expect("Create course without token", await call("POST", "/courses", { body: course }), 401);
  expect("Create course missing fields", await call("POST", "/courses", { token: admin, body: { courseName: "x" } }), 400);
  const cc = await call("POST", "/courses", { token: admin, body: course });
  expect("Admin creates course", cc, 201);
  const slug = cc.data.data?.id, courseId = cc.data.data?._id;
  expect("Duplicate course", await call("POST", "/courses", { token: admin, body: { ...course, id: slug } }), 409);
  expect("Get course", await call("GET", `/courses/${slug}`), 200);
  expect("Unknown course", await call("GET", "/courses/does-not-exist"), 404);
  const cu = await call("PUT", `/courses/${slug}`, { token: admin, body: { instructor: "New Instructor" } });
  expect("Admin updates course", cu, 200);
  check("  ...instructor changed", cu.data.data?.instructor === "New Instructor");
  expect("Course update with oversized field", await call("PUT", `/courses/${slug}`, { token: admin, body: { courseName: "x".repeat(500) } }), 400);

  // ---------- Task 11: enrollment history (withdrawn) ----------
  expect("Student enrolls", await call("POST", "/enrollments", { token: tokenA, body: { courseId } }), 201);
  expect("Enroll twice", await call("POST", "/enrollments", { token: tokenA, body: { courseId } }), 409);
  expect("Admin cannot enroll", await call("POST", "/enrollments", { token: admin, body: { courseId } }), 403);
  expect("Invalid course id on enroll", await call("POST", "/enrollments", { token: tokenA, body: { courseId: "bad" } }), 400);
  expect("Unenroll", await call("DELETE", `/enrollments/${courseId}`, { token: tokenA }), 200);
  const mine = await call("GET", "/enrollments/my-courses", { token: tokenA });
  check("Withdrawn course is hidden from My Courses", mine.data.enrollments?.length === 0);
  const re = await call("POST", "/enrollments", { token: tokenA, body: { courseId } });
  expect("Re-enroll reactivates the withdrawn record", re, 200);
  expect("Progress update", await call("PUT", "/progress", { token: tokenA, body: { courseId, completedLessons: 2, totalLessons: 4 } }), 200);

  // ---------- Task 13: sockets, history, notifications ----------
  const noTok = await connectSocket(undefined);
  check("Socket without token is rejected", noTok.error === "Authentication required", JSON.stringify(noTok));
  const badTok = await connectSocket("garbage");
  check("Socket with bad token is rejected", badTok.error === "Invalid authentication token", JSON.stringify(badTok));
  const sa = (await connectSocket(tokenA)).socket, sb = (await connectSocket(tokenB)).socket;
  check("Authenticated sockets connect", !!sa && !!sb);

  const gotMsg = new Promise((r) => sb.once("receive_message", r));
  const gotNote = new Promise((r) => sb.once("new_notification", r));
  const ack = await new Promise((r) => sa.emit("send_message", { recipientId: idB, text: "hello B" }, r));
  check("send_message acknowledged", ack.success === true, JSON.stringify(ack));
  const msg = await Promise.race([gotMsg, new Promise((r) => setTimeout(() => r(null), 3000))]);
  check("B receives message in real time", msg?.text === "hello B" && msg.sender === idA);
  const note = await Promise.race([gotNote, new Promise((r) => setTimeout(() => r(null), 3000))]);
  check("B receives notification in real time", /New message from/.test(note?.message || ""));
  const spoof = await new Promise((r) => sa.emit("send_message", { recipientId: "bad", text: "x" }, r));
  check("Invalid recipient rejected", spoof.success === false);
  const self = await new Promise((r) => sa.emit("send_message", { recipientId: idA, text: "x" }, r));
  check("Self-message rejected", self.success === false);

  const hist = await call("GET", `/messages/${idA}`, { token: tokenB });
  check("Message history persisted", hist.status === 200 && hist.data.messages?.some((m) => m.text === "hello B"));
  const stranger = await call("POST", "/auth/register", { body: { name: "Eve", email: `e${stamp}@example.com`, department: "X", password: PASSWORD } });
  const eveTok = (await call("POST", "/auth/login", { body: { email: `e${stamp}@example.com`, password: PASSWORD } })).data.token;
  const eveHist = await call("GET", `/messages/${idA}`, { token: eveTok });
  check("A third user cannot read A<->B messages", eveHist.status === 200 && eveHist.data.messages.length === 0);
  expect("Message history without token", await call("GET", `/messages/${idA}`), 401);
  const notes = await call("GET", "/notifications", { token: tokenB });
  check("B sees the notification via REST", notes.data.notifications?.length >= 1);
  const nid = notes.data.notifications?.[0]?._id;
  expect("Another user cannot mark B's notification", await call("PATCH", `/notifications/${nid}/read`, { token: tokenA }), 404);
  expect("B marks own notification read", await call("PATCH", `/notifications/${nid}/read`, { token: tokenB }), 200);
  expect("Invalid notification id", await call("PATCH", "/notifications/xyz/read", { token: tokenB }), 400);
  const contacts = await call("GET", "/messages/contacts", { token: tokenA });
  check("Contacts list has no emails/passwords", contacts.status === 200 && !JSON.stringify(contacts.data).match(/email|password/));
  sa.close(); sb.close();

  // ---------- Task 14: errors, headers ----------
  expect("Unknown API route", await call("GET", "/nothing-here"), 404);
  const badJson = await fetch(`${API}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: "{bad" });
  check("Malformed JSON gives 400 (not a crash)", badJson.status === 400, `got ${badJson.status}`);
  const h = await fetch(`${BASE}/api/health`);
  check("Helmet security headers present", !!h.headers.get("x-content-type-options") && !h.headers.get("x-powered-by"));
  const cors = await fetch(`${API}/courses`, { headers: { Origin: "https://evil.example" } });
  check("CORS blocks an untrusted origin", cors.status === 403, `got ${cors.status}`);

  await mongoose.connect(process.env.MONGO_URI);
  const raw = await mongoose.connection.db.collection("users").findOne({ email: A.email });
  check("Password stored as a bcrypt hash, not plaintext", /^\$2[aby]\$12\$/.test(raw.password) && raw.password !== PASSWORD);

  // cleanup test data
  const db = mongoose.connection.db;
  const ids = [idA, idB].map((i) => new mongoose.Types.ObjectId(i));
  await db.collection("users").deleteMany({ email: { $in: [A.email, B.email, `d${stamp}@example.com`, `e${stamp}@example.com`] } });
  await db.collection("enrollments").deleteMany({ student: { $in: ids } });
  await db.collection("learningprogresses").deleteMany({ student: { $in: ids } });
  await db.collection("messages").deleteMany({ $or: [{ sender: { $in: ids } }, { recipient: { $in: ids } }] });
  await db.collection("notifications").deleteMany({ recipient: { $in: ids } });
  await mongoose.disconnect();
  expect("Admin deletes the test course", await call("DELETE", `/courses/${slug}`, { token: admin }), 200);

  // ---------- Task 14: rate limit (last - it locks this IP's login for 15 min) ----------
  let last = 0;
  for (let i = 0; i < 12; i++) last = (await call("POST", "/auth/login", { body: { email: "nobody@example.com", password: "wrong-password-123" } })).status;
  check("Excessive failed logins -> 429", last === 429, `got ${last}`);

  console.log(`\n${passed} passed, ${failed} failed`);
  process.exit(failed ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });