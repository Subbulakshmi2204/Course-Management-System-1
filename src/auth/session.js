/*
 * Glue between the new JWT login (Express backend) and the existing app.
 *
 * The rest of the site - dashboard, course player, notifications, progress -
 * still reads "who is logged in" from the localStorage keys below (written
 * by the legacy scripts in public/legacy/js). So after a successful backend
 * login we:
 *   1. keep the JWT in sessionStorage under "token" (apiClient sends it), and
 *   2. write the same localStorage session those pages already understand.
 *
 * Passwords are NOT stored in the browser any more; the backend owns them.
 */

const TOKEN_KEY = "token";
const USER_KEY = "courseHub_currentUser";
const SESSION_FLAG_KEY = "courseHub_userLoggedIn";
const USERS_KEY = "courseHub_users";

function readJSON(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
}

/** Call with the response body of POST /auth/login. */
export function saveSession({ token, student }) {
    sessionStorage.setItem(TOKEN_KEY, token);

    const sessionUser = {
        id: student.id,
        name: student.name,
        email: student.email,
        department: student.department,
    };

    localStorage.setItem(USER_KEY, JSON.stringify(sessionUser));
    localStorage.setItem(SESSION_FLAG_KEY, "true");

    // Keep the legacy "registered students" list in step (used by the enroll
    // gate and new-course notifications). Replaces any old record for the same
    // email, which also drops any plaintext password the old demo stored.
    const email = String(sessionUser.email).toLowerCase();
    const users = readJSON(USERS_KEY, []).filter(
        (u) => String(u.email).toLowerCase() !== email
    );
    users.push(sessionUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/**
 * Where to send the student after logging in / registering. Keeps the old
 * ?redirect=...&courseId=... behaviour, but only allows same-site targets.
 */
export function getRedirectUrl(search) {
    const params = new URLSearchParams(search);
    let target = params.get("redirect") || "student-dashboard.html";

    const looksExternal = /^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith("//");
    if (looksExternal) {
        target = "student-dashboard.html";
    }

    target = "/" + target.replace(/^\/+/, "");

    const courseId = params.get("courseId");
    return courseId ? `${target}?courseId=${encodeURIComponent(courseId)}` : target;
}