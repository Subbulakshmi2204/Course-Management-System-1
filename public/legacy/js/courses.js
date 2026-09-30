import { getCourses } from './api.js';
import { ensureAuthThenEnroll } from './course-player.js?version=2';

let adminModalInstance = null;

function filterCategory(category, buttonEl) {
    const cards = document.querySelectorAll('.course-card-wrapper');

    cards.forEach((card) => {
        if (category === 'all' || card.classList.contains(category)) {
            card.style.setProperty('display', 'block', 'important');
        } else {
            card.style.setProperty('display', 'none', 'important');
        }
    });

    if (buttonEl) {
        document.querySelectorAll('#filter-container .btn').forEach((btn) => {
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-outline-primary');
        });
        buttonEl.classList.remove('btn-outline-primary');
        buttonEl.classList.add('btn-primary');
    }
}

// Each catalog course has its own dedicated detail page with the
// interactive module player. Courses added later via the admin dashboard
// fall back to a generic page.
const COURSE_PAGES = {
    'python-masterclass': 'python-course.html',
    'fullstack-dev': 'fullstack-course.html',
    'ai-foundations': 'ai-foundations.html',
    'gen-ai': 'generative-ai.html',
    'cyber-security': 'cyber-security.html',
    'data-analytics': 'data-analytics.html',
    'cross-platform-mobile': 'cross-platform-mobile.html',
    'advanced-mobile': 'advanced-mobile.html',
    'reinforcement-learning': 'reinforcement-learning.html',
    nlp: 'nlp-course.html',
    mlops: 'mlops-course.html',
    devops: 'devops-course.html',
};

function handleEnrollment(courseId) {
    const page = COURSE_PAGES[courseId] || 'course-content.html';
    ensureAuthThenEnroll(courseId, () => { window.location.href = page; });
}

function openAdminAuthModal(courseId) {
    document.getElementById('targetCourseId').value = courseId;
    if (!adminModalInstance) {
        adminModalInstance = new bootstrap.Modal(document.getElementById('adminAuthModal'));
    }
    adminModalInstance.show();
}

function submitAdminAuth(event) {
    event.preventDefault();
    const courseId = document.getElementById('targetCourseId').value;
    const email = document.getElementById('adminEmailField').value;
    const password = document.getElementById('adminPasswordField').value;

    if (email && password) {
        if (adminModalInstance) adminModalInstance.hide();
        window.location.href = `edit-course.html?courseId=${courseId}`;
    }
}

// Exposed for the inline onclick="..." attributes already in the HTML.
window.filterCategory = filterCategory;
window.handleEnrollment = handleEnrollment;
window.openAdminAuthModal = openAdminAuthModal;
window.submitAdminAuth = submitAdminAuth;

// Course ids already rendered as static cards in the markup — anything
// else in the shared catalog (i.e. courses added via the admin dashboard)
// gets appended here so both pages stay in sync.
const STATIC_CARD_IDS = new Set([
    'python-masterclass', 'fullstack-dev', 'ai-foundations', 'gen-ai',
    'cyber-security', 'data-analytics', 'cross-platform-mobile',
    'advanced-mobile', 'reinforcement-learning', 'nlp', 'mlops', 'devops',
]);

document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('coursesGridContainer');
    if (!gridContainer) return;

    const customCourses = getCourses().filter((track) => !STATIC_CARD_IDS.has(track.id));

    customCourses.forEach((track) => {
        const cardCol = document.createElement('div');
        cardCol.className = `col-md-4 course-card-wrapper ${track.category || 'web'}`;
        const trackId = track.id;

        cardCol.innerHTML = `
            <div class="card h-100 shadow-sm border-0 custom-card">
                <div class="course-img-container">
                    <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80" class="course-img" alt="Custom Track">
                </div>
                <div class="card-body p-4">
                    <span class="badge bg-primary-soft text-primary mb-2">Custom Track</span>
                    <h5 class="fw-bold mb-2">${track.title}</h5>
                    <p class="text-muted small mb-2">Mentor: ${track.mentor}</p>
                    <p class="text-muted small mb-4">Duration: ${track.duration}</p>
                    <div class="row g-2 pt-3 border-top">
                        <div class="col-12"><button class="btn btn-primary w-100 btn-sm py-2" onclick="handleEnrollment('${trackId}')">Enroll</button></div>
                        <div class="col-12"><button class="btn btn-outline-secondary w-100 btn-sm py-2" onclick="openAdminAuthModal('${trackId}')"><i class="bi bi-pencil-square me-1"></i>Edit</button></div>
                    </div>
                </div>
            </div>`;
        gridContainer.appendChild(cardCol);
    });

    filterCategory('all');
});