import { isLoggedIn, getCurrentUser } from './auth.js';
import { getEnrollmentsForStudent, toggleModuleComplete } from './api.js';
import './ui.js'; // registers window.handleLogout used by the page's Logout button

let currentFilter = 'all';

function moduleListHtml(enrollment) {
    return enrollment.modules
        .map(
            (mod) => `
        <div class="module-row d-flex align-items-center justify-content-between">
            <div class="form-check mb-0">
                <input class="form-check-input" type="checkbox" ${mod.completed ? 'checked' : ''}
                    id="mod-${enrollment.id}-${mod.id}"
                    onchange="handleModuleToggle('${enrollment.id}', ${mod.id})">
                <label class="form-check-label small ${mod.completed ? 'text-decoration-line-through text-muted' : 'text-dark'}" for="mod-${enrollment.id}-${mod.id}">
                    ${mod.name}
                </label>
            </div>
            ${mod.completed ? '<i class="bi bi-check-circle-fill text-success"></i>' : '<i class="bi bi-circle text-muted opacity-50"></i>'}
        </div>`
        )
        .join('');
}

function courseCardHtml(enrollment) {
    const isCompleted = enrollment.status === 'completed';
    return `
        <div class="card dashboard-card p-4 bg-white">
            <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
                <div>
                    <span class="stage-dot bg-${isCompleted ? 'success' : 'warning'} me-2"></span>
                    <span class="fw-bold text-dark">${enrollment.courseTitle}</span>
                    <div class="text-muted small mt-1">Mentor: ${enrollment.mentor} &bull; ${enrollment.duration} &bull; Enrolled ${enrollment.enrolledDate}</div>
                </div>
                <div class="text-end">
                    <span class="badge ${isCompleted ? 'bg-success-subtle text-success' : 'bg-primary-subtle text-primary'} badge-custom">
                        ${isCompleted ? 'Completed' : enrollment.progress + '% complete'}
                    </span>
                    ${isCompleted ? `<div class="mt-2"><a href="certificate.html?enrollmentId=${enrollment.id}" class="btn btn-success btn-sm rounded-pill px-3"><i class="bi bi-award-fill me-1"></i> View Certificate</a></div>` : ''}
                </div>
            </div>
            <div class="progress mb-3">
                <div class="progress-bar bg-${enrollment.color || 'primary'}" style="width:${enrollment.progress}%"></div>
            </div>
            <small class="text-muted d-block mb-2 fw-medium">Modules</small>
            ${moduleListHtml(enrollment)}
        </div>`;
}

function applyFilter(enrollments) {
    if (currentFilter === 'ongoing') return enrollments.filter((e) => e.status !== 'completed');
    if (currentFilter === 'completed') return enrollments.filter((e) => e.status === 'completed');
    return enrollments;
}

function renderStats(enrollments) {
    const ongoing = enrollments.filter((e) => e.status !== 'completed').length;
    const completed = enrollments.filter((e) => e.status === 'completed').length;
    const avg = enrollments.length
        ? Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length)
        : 0;

    document.getElementById('statTotal').textContent = enrollments.length;
    document.getElementById('statOngoing').textContent = ongoing;
    document.getElementById('statCompleted').textContent = completed;
    document.getElementById('statAvg').textContent = `${avg}%`;
}

function render() {
    const user = getCurrentUser();
    const all = getEnrollmentsForStudent(user.id);
    renderStats(all);

    const filtered = applyFilter(all);
    const listEl = document.getElementById('courseList');
    const emptyEl = document.getElementById('emptyState');

    if (!filtered.length) {
        listEl.innerHTML = '';
        emptyEl.classList.remove('d-none');
        emptyEl.querySelector('h6').textContent = all.length
            ? 'No courses match this filter'
            : 'Nothing to show here yet';
    } else {
        emptyEl.classList.add('d-none');
        listEl.innerHTML = filtered.map(courseCardHtml).join('');
    }
}

function handleModuleToggle(enrollmentId, moduleId) {
    toggleModuleComplete(enrollmentId, moduleId);
    render();
}

window.handleModuleToggle = handleModuleToggle;

document.getElementById('filterBar').addEventListener('click', (e) => {
    const pill = e.target.closest('.filter-pill');
    if (!pill) return;
    document.querySelectorAll('.filter-pill').forEach((p) => p.classList.remove('active'));
    pill.classList.add('active');
    currentFilter = pill.dataset.filter;
    render();
});

document.addEventListener('DOMContentLoaded', () => {
    if (!isLoggedIn()) {
        window.location.href = 'user-login.html?redirect=progress.html';
        return;
    }
    render();
});