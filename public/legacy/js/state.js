/* =========================================================================
   state.js — centralized application state
   -------------------------------------------------------------------------
   Holds the two pieces of state the app needs *right now*, in memory:
     - currentUser      : the logged-in student/admin (mirrors localStorage)
     - selectedCourseId : the course the visitor is currently viewing or
                           trying to enroll in (kept in sessionStorage —
                           it's per-tab, temporary, and shouldn't survive
                           a browser restart the way login does)

   Other modules (auth.js, api.js, ui.js) read/write this state instead of
   talking to storage directly, so there is a single source of truth for
   "who is logged in" and "what course are we looking at" while the page
   is open. Call onStateChange() to re-render UI whenever either changes.
   ========================================================================= */

const SELECTED_COURSE_KEY = 'courseHub_selectedCourse';

const state = {
    currentUser: null,
    selectedCourseId: sessionStorage.getItem(SELECTED_COURSE_KEY) || null,
};

const listeners = new Set();

function notify() {
    const snapshot = getState();
    listeners.forEach((fn) => fn(snapshot));
}

/** Read-only snapshot of the current state. */
export function getState() {
    return { ...state };
}

/** Subscribe to state changes. Returns an unsubscribe function. */
export function onStateChange(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
}

export function setCurrentUser(user) {
    state.currentUser = user || null;
    notify();
}

export function getCurrentUser() {
    return state.currentUser;
}

/** Selected course is intentionally transient — sessionStorage, not localStorage. */
export function setSelectedCourse(courseId) {
    state.selectedCourseId = courseId || null;
    if (courseId) {
        sessionStorage.setItem(SELECTED_COURSE_KEY, courseId);
    } else {
        sessionStorage.removeItem(SELECTED_COURSE_KEY);
    }
    notify();
}

export function getSelectedCourse() {
    return state.selectedCourseId;
}