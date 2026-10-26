/* =========================================================================
   auth.js — authentication module
   -------------------------------------------------------------------------
   Owns everything related to *who is signed in*: registered accounts,
   login/logout, and the current session. This is a front-end-only demo
   "backend" — accounts and passwords live in localStorage — but every
   function returns the same shape a real API call would
   ({ success, error } / { success, user }), so swapping this for a real
   auth endpoint later shouldn't require touching any page code.

   Persistent, cross-session data (accounts, "am I logged in") uses
   localStorage. The in-memory mirror lives in state.js so the rest of the
   app can read the current user synchronously without re-parsing storage.
   ========================================================================= */

import { setCurrentUser as setStateUser, getCurrentUser as getStateUser, setSelectedCourse } from './state.js';

// ---- Backend mirror ------------------------------------------------------
// Every change is still saved in localStorage exactly as before; it is ALSO
// sent to the Express backend so it shows up in backend/data/db.json.
// If the backend is not running, the app keeps working normally.
const BACKEND_URL = 'http://localhost:4000';

export function mirrorToBackend(method, path, body) {
    try {
        const options = { method, headers: { 'Content-Type': 'application/json' }, keepalive: true };
        if (body !== undefined) options.body = JSON.stringify(body);
        // keepalive requests are limited to ~64KB
        if (options.body && options.body.length > 60000) delete options.keepalive;
        return fetch(BACKEND_URL + path, options).catch(() => null);
    } catch (e) {
        return Promise.resolve(null);
    }
}

/** Copies anything that exists in localStorage but not yet in the backend
 *  (students and enrollments created before the backend was connected, or
 *  while it was offline). Runs on every page load; only missing items are sent. */
async function syncLocalToBackend() {
    if (window.__courseHubSyncing) return;
    window.__courseHubSyncing = true;
    try {
        const studentsRes = await fetch(BACKEND_URL + '/students');
        if (studentsRes.ok) {
            const remote = await studentsRes.json();
            const known = new Set(remote.map((s) => String(s.email).toLowerCase()));
            for (const u of readJSON('courseHub_users', [])) {
                if (!known.has(String(u.email).toLowerCase())) {
                    await mirrorToBackend('POST', '/students', u);
                }
            }
        }
        const enrollRes = await fetch(BACKEND_URL + '/enrollments');
        if (enrollRes.ok) {
            const remote = await enrollRes.json();
            const known = new Set(remote.map((e) => e.id));
            for (const e of readJSON('courseHub_enrollments', [])) {
                if (!known.has(e.id)) await mirrorToBackend('POST', '/enrollments', e);
            }
        }
    } catch (e) {
        // backend offline - nothing to do
    } finally {
        window.__courseHubSyncing = false;
    }
}

const USERS_KEY = 'courseHub_users';
const USER_KEY = 'courseHub_currentUser';
const SESSION_FLAG_KEY = 'courseHub_userLoggedIn';

const ADMIN_EMAIL = 'admin@coursehub.com';
const ADMIN_PASSWORD = 'admin123';

function readJSON(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
        return fallback;
    }
}

function writeJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

/** Seeds one demo account (first run only) and hydrates in-memory state
 *  from whatever session is already persisted. Runs automatically below. */
function initializeAuthStorage() {
    if (!localStorage.getItem(USERS_KEY)) {
        writeJSON(USERS_KEY, [
            { id: 'alex-morgan', name: 'Alex Morgan', email: 'alex.morgan@example.com', password: 'Student@123' },
        ]);
    }
    setStateUser(readJSON(USER_KEY, null));
}

export function getUsers() {
    return readJSON(USERS_KEY, []);
}

function saveUsers(list) {
    writeJSON(USERS_KEY, list);
}

export function findUserByEmail(email) {
    const target = String(email).trim().toLowerCase();
    return getUsers().find((u) => u.email.toLowerCase() === target) || null;
}

/** Creates a new student account. Does NOT log the user in — call
 *  loginUser() afterwards if you want to auto sign-in post-registration. */
export function registerUser({ name, email, password }) {
    if (findUserByEmail(email)) {
        return { success: false, error: 'exists' };
    }
    const user = {
        id: 'stu-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        name: String(name).trim(),
        email: String(email).trim().toLowerCase(),
        password,
    };
    const users = getUsers();
    users.push(user);
    saveUsers(users);
    mirrorToBackend('POST', '/students', user);
    return { success: true, user };
}

function persistSession(user) {
    localStorage.setItem(SESSION_FLAG_KEY, 'true');
    const sessionUser = { id: user.id, name: user.name, email: user.email };
    writeJSON(USER_KEY, sessionUser);
    setStateUser(sessionUser);
}

export function loginUser(email, password) {
    const user = findUserByEmail(email);
    if (!user) {
        const normalizedEmail = String(email).trim().toLowerCase();
        const displayName = normalizedEmail.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
        const newUser = {
            id: 'stu-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
            name: displayName || 'Student',
            email: normalizedEmail,
            password,
        };
        const users = getUsers();
        users.push(newUser);
        saveUsers(users);
        mirrorToBackend('POST', '/students', newUser);
        persistSession(newUser);
        return { success: true, user: newUser };
    }
    if (user.password !== password) return { success: false, error: 'wrong_password' };
    persistSession(user);
    return { success: true, user };
}

/** Lightweight gate used by the course "Enroll" flow: no password, just
 *  confirms the typed name + email match an already-registered student. */
export function loginByNameEmail(name, email) {
    const user = findUserByEmail(email);
    if (!user) return { success: false, error: 'not_registered' };

    const typedName = String(name || '').trim().toLowerCase();
    const storedName = String(user.name || '').trim().toLowerCase();
    if (typedName !== storedName) {
        return { success: false, error: 'name_mismatch' };
    }

    persistSession(user);
    return { success: true, user };
}

export function logout() {
    sessionStorage.removeItem('token');
    localStorage.removeItem(SESSION_FLAG_KEY);
    localStorage.removeItem(USER_KEY);
    setStateUser(null);
    setSelectedCourse(null);
}

export function getCurrentUser() {
    const cached = getStateUser();
    if (cached) return cached;
    const stored = readJSON(USER_KEY, null);
    if (stored) setStateUser(stored);
    return stored;
}

export function isLoggedIn() {
    return localStorage.getItem(SESSION_FLAG_KEY) === 'true' && !!getCurrentUser();
}

/** Separate credential check for the admin console — kept out of the
 *  student accounts table on purpose. */
export function loginAdmin(email, password) {
    return String(email).trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

initializeAuthStorage();
syncLocalToBackend();