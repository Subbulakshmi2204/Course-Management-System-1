import { isLoggedIn, getCurrentUser } from './auth.js';
import { getEnrollmentsForStudent, toggleModuleComplete, enrollInCourse } from './api.js';
import './ui.js'; // registers window.handleLogout used by the page's Logout button

const HOURS_PER_MODULE = 3; // simple estimate used for the "Study Hours Tracked" stat

function ensureEnrollmentFromQueryString() {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    if (courseId) {
        enrollInCourse(courseId);
        // clean the URL so refreshing doesn't re-trigger anything odd
        window.history.replaceState({}, document.title, 'student-dashboard.html');
    }
}

function renderProfile(user) {
    const nameEl = document.getElementById('profileName');
    const emailEl = document.getElementById('profileEmail');
    if (nameEl) nameEl.textContent = user.name;
    if (emailEl) emailEl.textContent = user.email;
}

function moduleChecklistHtml(enrollment) {
    return enrollment.modules
        .map(
            (mod) => `
        <div class="form-check mb-1">
            <input class="form-check-input" type="checkbox" ${mod.completed ? 'checked' : ''}
                id="mod-${enrollment.id}-${mod.id}"
                onchange="handleModuleToggle('${enrollment.id}', ${mod.id})">
            <label class="form-check-label small ${mod.completed ? 'text-decoration-line-through text-muted' : 'text-dark'}" for="mod-${enrollment.id}-${mod.id}">
                ${mod.name}
            </label>
        </div>`
        )
        .join('');
}

function ongoingCardHtml(enrollment) {
    return `
        <div class="col-12">
            <div class="card dashboard-card p-4 bg-white">
                <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
                    <div>
                        <h6 class="fw-bold text-dark mb-1">${enrollment.courseTitle}</h6>
                        <small class="text-muted">Mentor: ${enrollment.mentor} &bull; ${enrollment.duration}</small>
                    </div>
                    <span class="badge bg-primary-subtle text-primary badge-custom">${enrollment.progress}% complete</span>
                </div>
                <div class="progress mb-3">
                    <div class="progress-bar bg-${enrollment.color || 'primary'}" style="width:${enrollment.progress}%"></div>
                </div>
                <div class="row">
                    <div class="col-md-8">
                        <small class="text-muted d-block mb-2 fw-medium">Modules</small>
                        ${moduleChecklistHtml(enrollment)}
                    </div>
                </div>
            </div>
        </div>`;
}

function completedCardHtml(enrollment) {
    return `
        <div class="col-12 col-md-6">
            <div class="card dashboard-card p-4 bg-white text-center">
                <i class="bi bi-patch-check-fill text-success fs-1 mb-2"></i>
                <h6 class="fw-bold text-dark mb-1">${enrollment.courseTitle}</h6>
                <small class="text-muted d-block mb-3">Completed &bull; Mentor: ${enrollment.mentor}</small>
                <a href="certificate.html?enrollmentId=${enrollment.id}" class="btn btn-outline-success btn-sm rounded-pill px-3 mx-auto">
                    <i class="bi bi-award-fill me-1"></i> View Certificate
                </a>
            </div>
        </div>`;
}

function renderDashboard() {
    const user = getCurrentUser();
    renderProfile(user);

    const enrollments = getEnrollmentsForStudent(user.id);
    const ongoing = enrollments.filter((e) => e.status !== 'completed');
    const completed = enrollments.filter((e) => e.status === 'completed');

    document.getElementById('statOngoing').textContent = ongoing.length;
    document.getElementById('statCompleted').textContent = completed.length;

    const totalModulesDone = enrollments.reduce((sum, e) => sum + e.modules.filter((m) => m.completed).length, 0);
    document.getElementById('statHours').textContent = `${totalModulesDone * HOURS_PER_MODULE} hrs`;

    const overallProgress = enrollments.length
        ? Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length)
        : 0;
    document.getElementById('overallProgressLabel').textContent = `${overallProgress}%`;
    document.getElementById('overallProgressBar').style.width = `${overallProgress}%`;

    const ongoingContainer = document.getElementById('ongoingCoursesContainer');
    if (ongoing.length) {
        ongoingContainer.innerHTML = ongoing.map(ongoingCardHtml).join('');
    } else {
        ongoingContainer.innerHTML = `
            <div class="col-12">
                <div class="card dashboard-card p-5 text-center bg-white">
                    <div class="mb-3"><i class="bi bi-journal-bookmark-fill empty-state-icon"></i></div>
                    <h6 class="fw-bold text-dark mb-2">No Active Courses Yet</h6>
                    <p class="text-muted small mx-auto max-w-400 mb-4">You haven't enrolled in or started any interactive workflows yet. Ready to start building your technical profile?</p>
                    <a href="courses.html" class="btn btn-primary btn-sm rounded-pill px-4 py-2 fw-medium">Browse Catalog <i class="bi bi-search ms-1 small"></i></a>
                </div>
            </div>`;
    }

    const completedContainer = document.getElementById('completedCoursesContainer');
    if (completed.length) {
        completedContainer.innerHTML = completed.map(completedCardHtml).join('');
    } else {
        completedContainer.innerHTML = `
            <div class="col-12">
                <div class="card dashboard-card p-4 text-center bg-white border border-dashed">
                    <p class="text-muted small mb-0">Certificates and verified badges will appear here once you finish a course track.</p>
                </div>
            </div>`;
    }
}

function handleModuleToggle(enrollmentId, moduleId) {
    toggleModuleComplete(enrollmentId, moduleId);
    renderDashboard();
}

// Exposed for the inline onchange="..." attributes rendered above.
window.handleModuleToggle = handleModuleToggle;

document.addEventListener('DOMContentLoaded', () => {
    if (!isLoggedIn()) {
        const params = new URLSearchParams(window.location.search);
        const courseId = params.get('courseId');
        window.location.href = courseId
            ? `user-login.html?redirect=student-dashboard.html&courseId=${courseId}`
            : 'user-login.html?redirect=student-dashboard.html';
        return;
    }
    ensureEnrollmentFromQueryString();
    renderDashboard();
});