import { registerUser, loginUser } from './auth.js';
import { validateRegisterForm } from './validation.js';
import { showAlert, togglePasswordVisibility } from './ui.js';

function buildDashboardUrl() {
    const params = new URLSearchParams(window.location.search);
    const redirectTarget = params.get('redirect') || 'student-dashboard.html';
    const courseId = params.get('courseId');
    return courseId ? `${redirectTarget}?courseId=${courseId}` : redirectTarget;
}

function buildLoginUrl() {
    const params = new URLSearchParams(window.location.search);
    const qs = params.toString();
    return qs ? `user-login.html?${qs}` : 'user-login.html';
}

window.toggleRegPassword = (inputId, iconId) => togglePasswordVisibility(inputId, iconId);

document.getElementById('loginLink').href = buildLoginUrl();

document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('nameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const { valid, errors } = validateRegisterForm({ name, email, password, confirmPassword });
    if (!valid) {
        const firstError = errors.confirmPassword || errors.password || errors.email || errors.name;
        showAlert('registerAlert', firstError, 'danger');
        return;
    }

    const result = registerUser({ name, email, password });

    if (!result.success) {
        if (result.error === 'exists') {
            showAlert(
                'registerAlert',
                `An account already exists for <strong>${email}</strong>. ` +
                    `<a href="${buildLoginUrl()}" class="alert-link">Log in instead</a>.`,
                'warning'
            );
        } else {
            showAlert('registerAlert', 'Something went wrong creating your account. Please try again.', 'danger');
        }
        return;
    }

    // Auto sign-in right after registering
    loginUser(email, password);

    document.getElementById('registerFormContainer').classList.add('d-none');
    document.getElementById('registerSuccessContainer').classList.remove('d-none');

    const dashboardUrl = buildDashboardUrl();
    document.getElementById('goToDashboardBtn').href = dashboardUrl;
    setTimeout(() => { window.location.href = dashboardUrl; }, 1200);
});