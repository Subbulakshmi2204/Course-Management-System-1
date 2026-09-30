/* =========================================================================
   validation.js — form validation module
   -------------------------------------------------------------------------
   Pure functions only: no DOM access, no storage. Each validator takes
   plain values and returns a boolean (or, for whole-form helpers, a
   { valid, errors } result) so pages can reuse the same rules for login,
   registration, and any future form without duplicating regex/logic.
   ========================================================================= */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isRequired(value) {
    return String(value ?? '').trim().length > 0;
}

export function isValidEmail(email) {
    return EMAIL_RE.test(String(email ?? '').trim());
}

export function isValidPassword(password, minLength = 6) {
    return typeof password === 'string' && password.length >= minLength;
}

export function passwordsMatch(password, confirmPassword) {
    return password === confirmPassword;
}

/** Validates a login form. Returns { valid, errors: { field: message } }. */
export function validateLoginForm({ email, password }) {
    const errors = {};
    if (!isRequired(email) || !isValidEmail(email)) errors.email = 'Enter a valid email address.';
    if (!isRequired(password)) errors.password = 'Password is required.';
    return { valid: Object.keys(errors).length === 0, errors };
}

/** Validates a registration form. Returns { valid, errors }. */
export function validateRegisterForm({ name, email, password, confirmPassword }) {
    const errors = {};
    if (!isRequired(name)) errors.name = 'Name is required.';
    if (!isRequired(email) || !isValidEmail(email)) errors.email = 'Enter a valid email address.';
    if (!isValidPassword(password)) errors.password = 'Password must be at least 6 characters.';
    if (!passwordsMatch(password, confirmPassword)) errors.confirmPassword = 'Passwords do not match.';
    return { valid: Object.keys(errors).length === 0, errors };
}

/** Validates the admin console's hard-coded credential form. */
export function validateAdminLoginForm({ email, password }) {
    const errors = {};
    if (!isRequired(email) || !isValidEmail(email)) errors.email = 'Enter a valid email address.';
    if (!isRequired(password)) errors.password = 'Password is required.';
    return { valid: Object.keys(errors).length === 0, errors };
}