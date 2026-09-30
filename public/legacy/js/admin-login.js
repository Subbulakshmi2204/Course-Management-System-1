import { loginAdmin } from './auth.js';
import { validateAdminLoginForm } from './validation.js';
import { togglePasswordVisibility } from './ui.js';

window.togglePassword = () => togglePasswordVisibility('passwordInput', 'eyeIcon');

document.getElementById('adminLoginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('emailInput').value.trim();
    const password = document.getElementById('passwordInput').value;
    const errorBanner = document.getElementById('errorBanner');

    const { valid } = validateAdminLoginForm({ email, password });

    if (valid && loginAdmin(email, password)) {
        errorBanner.classList.add('d-none');
        window.location.href = 'admin-dashboard.html';
    } else {
        errorBanner.classList.remove('d-none');
    }
});