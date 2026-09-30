import { loginUser } from './auth.js?version=3';
import { validateLoginForm } from './validation.js';
import { showAlert, togglePasswordVisibility } from './ui.js';

function buildDashboardUrl() {
    const params = new URLSearchParams(window.location.search);
    const redirectTarget = params.get('redirect') || 'student-dashboard.html';
    const courseId = params.get('courseId');
    return courseId ? `${redirectTarget}?courseId=${courseId}` : redirectTarget;
}

function buildRegisterUrl() {
    const params = new URLSearchParams(window.location.search);
    const qs = params.toString();
    return qs ? `user-register.html?${qs}` : 'user-register.html';
}

window.togglePasswordVisibility = () => togglePasswordVisibility('passwordInput', 'passwordToggleIcon');

document.getElementById('createAccountLink').href = buildRegisterUrl();

document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('emailInput').value.trim();
    const password = document.getElementById('passwordInput').value;

    const { valid } = validateLoginForm({ email, password });
    if (!valid) {
        showAlert('loginAlert', 'Please enter a valid email and password.', 'danger');
        return;
    }

    const result = loginUser(email, password);

    if (!result.success) {
        if (result.error === 'not_found') {
            showAlert(
                'loginAlert',
                `We couldn't find an account for <strong>${email}</strong>. ` +
                    `<a href="${buildRegisterUrl()}" class="alert-link">Register here</a> to create one.`,
                'warning'
            );
        } else {
            showAlert('loginAlert', 'Incorrect password. Please try again.', 'danger');
        }
        return;
    }

    document.getElementById('loginHeader').textContent = 'Session Initialized';
    document.getElementById('loginSubheader').textContent = 'Your digital student profile is verified.';
    document.getElementById('loginFormContainer').classList.add('d-none');
    document.getElementById('dashboardContainer').classList.remove('d-none');

    const dashboardUrl = buildDashboardUrl();
    document.getElementById('goToDashboardBtn').href = dashboardUrl;
    setTimeout(() => { window.location.href = dashboardUrl; }, 1200);
});