const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 4000;
const DB_PATH = path.join(__dirname, "data", "db.json");

app.use(cors());
app.use(express.json());

// ---------- helpers: read / write the JSON "database" ----------
function readDB() {
    return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

function writeDB(data) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

function newId(prefix) {
    return prefix + "-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
}

// Send JSON already indented so it is readable in the browser
function sendJSON(res, data, status = 200) {
    res.status(status).type("application/json").send(JSON.stringify(data, null, 2));
}

// ---------- home page ----------
app.get("/", (req, res) => {
    const db = readDB();
    const items = Object.keys(db)
        .map((k) => `<li><a href="/${k}">/${k}</a> &nbsp; ${db[k].length} items</li>`)
        .join("");
    res.send(`
        <body style="font-family:sans-serif;padding:24px">
            <h2>Backend server running</h2>
            <p>Available resources:</p>
            <ul>${items}</ul>
        </body>`);
});

// ---------- COURSES ----------
app.get("/courses", (req, res) => sendJSON(res, readDB().courses));

app.get("/courses/:id", (req, res) => {
    const course = readDB().courses.find((c) => c.id === req.params.id);
    if (!course) return sendJSON(res, { error: "Course not found" }, 404);
    sendJSON(res, course);
});

app.post("/courses", (req, res) => {
    const db = readDB();
    const course = { ...req.body, id: req.body.id || newId("course") };
    if (db.courses.some((c) => c.id === course.id)) {
        return sendJSON(res, { error: "Course id already exists" }, 409);
    }
    db.courses.push(course);
    writeDB(db);
    sendJSON(res, course, 201);
});

app.put("/courses/:id", (req, res) => {
    const db = readDB();
    const index = db.courses.findIndex((c) => c.id === req.params.id);
    if (index === -1) return sendJSON(res, { error: "Course not found" }, 404);
    db.courses[index] = { ...req.body, id: req.params.id };
    writeDB(db);
    sendJSON(res, db.courses[index]);
});

app.delete("/courses/:id", (req, res) => {
    const db = readDB();
    const before = db.courses.length;
    db.courses = db.courses.filter((c) => c.id !== req.params.id);
    if (db.courses.length === before) return sendJSON(res, { error: "Course not found" }, 404);
    writeDB(db);
    sendJSON(res, {});
});

// ---------- STUDENTS ----------
app.get("/students", (req, res) => sendJSON(res, readDB().students));

app.post("/students", (req, res) => {
    const db = readDB();
    const email = String(req.body.email || "").trim().toLowerCase();
    if (email && db.students.some((s) => String(s.email).toLowerCase() === email)) {
        return sendJSON(res, { error: "Student already exists" }, 409);
    }
    const student = { ...req.body, id: req.body.id || newId("stu") };
    db.students.push(student);
    writeDB(db);
    sendJSON(res, student, 201);
});

// ---------- ENROLLMENTS ----------
app.get("/enrollments", (req, res) => sendJSON(res, readDB().enrollments));

app.post("/enrollments", (req, res) => {
    const db = readDB();
    const enrollment = { ...req.body, id: req.body.id || newId("enr") };
    db.enrollments.push(enrollment);
    writeDB(db);
    sendJSON(res, enrollment, 201);
});

app.patch("/enrollments/:id", (req, res) => {
    const db = readDB();
    const index = db.enrollments.findIndex((e) => e.id === req.params.id);
    if (index === -1) return sendJSON(res, { error: "Enrollment not found" }, 404);
    db.enrollments[index] = { ...db.enrollments[index], ...req.body, id: req.params.id };
    writeDB(db);
    sendJSON(res, db.enrollments[index]);
});

app.delete("/enrollments/:id", (req, res) => {
    const db = readDB();
    const before = db.enrollments.length;
    db.enrollments = db.enrollments.filter((e) => e.id !== req.params.id);
    if (db.enrollments.length === before) return sendJSON(res, { error: "Enrollment not found" }, 404);
    writeDB(db);
    sendJSON(res, {});
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});