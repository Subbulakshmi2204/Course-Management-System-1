import { validateAdminLoginForm } from './validation.js';
import { togglePasswordVisibility } from './ui.js';

// Admin login now uses the same backend login as students. The backend puts the
// account's role inside the JWT; only an account whose role is "admin" gets in.
const API_URL = 'http://localhost:4000/api/v1';

window.togglePassword = () => togglePasswordVisibility('passwordInput', 'eyeIcon');

document.getElementById('adminLoginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('emailInput').value.trim();
    const password = document.getElementById('passwordInput').value;
    const errorBanner = document.getElementById('errorBanner');
    const showError = (text) => {
        errorBanner.lastChild.textContent = ' ' + text;
        errorBanner.classList.remove('d-none');
    };

    const { valid } = validateAdminLoginForm({ email, password });
    if (!valid) return showError('Invalid administrator email or password.');

    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok || data.student?.role !== 'admin') {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('role');
            return showError('Invalid administrator email or password.');
        }

        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('role', data.student.role);
        errorBanner.classList.add('d-none');
        window.location.href = 'admin-dashboard.html';
    } catch (err) {
        showError('Cannot reach the server. Make sure the backend is running.');
    }
});