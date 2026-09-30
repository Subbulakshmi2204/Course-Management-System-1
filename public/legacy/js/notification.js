import { isLoggedIn, getCurrentUser } from './auth.js';
import { getNotificationsForStudent, markNotificationRead, markAllNotificationsRead } from './api.js';
import { renderAuthNav } from './ui.js';

const ICONS = {
    new_course: 'bi-collection-play-fill',
    enrollment: 'bi-mortarboard-fill',
    certificate: 'bi-award-fill',
};
const LABELS = {
    new_course: 'New course',
    enrollment: 'Enrollment',
    certificate: 'Certificate',
};

let activeFilter = 'all';

function timeAgo(isoDate) {
    const diffMs = Date.now() - new Date(isoDate).getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return mins + (mins === 1 ? ' minute ago' : ' minutes ago');
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return hrs + (hrs === 1 ? ' hour ago' : ' hours ago');
    const days = Math.floor(hrs / 24);
    if (days < 30) return days + (days === 1 ? ' day ago' : ' days ago');
    return new Date(isoDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

// Mirrors the COURSE_PAGES mapping in pages/courses.js so a notification
// can link straight to the right course page.
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

function courseHref(courseId) {
    if (!courseId) return null;
    return COURSE_PAGES[courseId] || 'course-content.html?courseId=' + encodeURIComponent(courseId);
}

function renderList() {
    const user = getCurrentUser();
    const list = document.getElementById('notifList');
    const emptyState = document.getElementById('emptyState');
    if (!user) return;

    const all = getNotificationsForStudent(user.id);
    const filtered = activeFilter === 'all' ? all : all.filter((n) => n.type === activeFilter);

    list.innerHTML = '';

    if (filtered.length === 0) {
        emptyState.classList.remove('d-none');
        return;
    }
    emptyState.classList.add('d-none');

    filtered.forEach((n) => {
        const card = document.createElement('div');
        card.className = 'notif-card p-3 d-flex gap-3 align-items-start ' + (n.read ? '' : 'unread');
        card.style.cursor = 'pointer';

        const href = courseHref(n.courseId);
        const actionBtn = href ? '<a href="' + href + '" class="btn btn-sm btn-outline-primary mt-2">View course</a>' : '';

        card.innerHTML =
            '<div class="notif-icon type-' + n.type + '"><i class="bi ' + (ICONS[n.type] || 'bi-bell') + '"></i></div>' +
            '<div class="flex-grow-1">' +
            '  <div class="d-flex align-items-center gap-2 mb-1">' +
            '    <span class="badge bg-light text-dark border small fw-normal">' + (LABELS[n.type] || 'Update') + '</span>' +
            '    <span class="text-muted small">' + timeAgo(n.date) + '</span>' +
            '  </div>' +
            '  <p class="fw-semibold mb-1">' + n.title + '</p>' +
            '  <p class="text-muted small mb-0">' + n.message + '</p>' +
            '  ' + actionBtn +
            '</div>' +
            (n.read ? '' : '<span class="unread-dot mt-2" title="Unread"></span>');

        card.addEventListener('click', () => {
            if (!n.read) {
                markNotificationRead(n.id);
                renderAuthNav();
                renderList();
            }
        });

        const courseLink = card.querySelector('a[href]');
        if (courseLink) {
            courseLink.addEventListener('click', (event) => event.stopPropagation());
        }

        list.appendChild(card);
    });
}

document.getElementById('filterPills').addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-pill');
    if (!btn) return;
    activeFilter = btn.getAttribute('data-filter');
    document.querySelectorAll('.filter-pill').forEach((p) => p.classList.remove('active'));
    btn.classList.add('active');
    renderList();
});

document.getElementById('markAllReadBtn').addEventListener('click', () => {
    const user = getCurrentUser();
    if (!user) return;
    markAllNotificationsRead(user.id);
    renderAuthNav();
    renderList();
});

document.addEventListener('DOMContentLoaded', () => {
    if (!isLoggedIn()) {
        document.getElementById('loggedOutBody').style.display = 'block';
        return;
    }
    document.getElementById('notifBody').style.display = 'block';
    renderList();
});