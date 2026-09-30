import { isLoggedIn, getCurrentUser } from './auth.js';
import { getEnrollmentById } from './api.js';

function showOnly(id) {
    ['lockedState', 'notFoundState', 'certState'].forEach((sectionId) => {
        document.getElementById(sectionId).classList.toggle('d-none', sectionId !== id);
    });
}

function formatDate(isoDate) {
    if (!isoDate) return '\u2014';
    const d = new Date(isoDate + 'T00:00:00');
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

document.addEventListener('DOMContentLoaded', () => {
    if (!isLoggedIn()) {
        const params = new URLSearchParams(window.location.search);
        const enrollmentId = params.get('enrollmentId') || '';
        window.location.href = `user-login.html?redirect=certificate.html${enrollmentId ? '&enrollmentId=' + enrollmentId : ''}`;
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const enrollmentId = params.get('enrollmentId');
    const user = getCurrentUser();
    const enrollment = enrollmentId ? getEnrollmentById(enrollmentId) : null;

    // Must exist and must belong to the logged-in student.
    if (!enrollment || enrollment.studentId !== user.id) {
        showOnly('notFoundState');
        return;
    }

    if (enrollment.status !== 'completed') {
        document.getElementById('lockedCourseTitle').textContent = enrollment.courseTitle;
        document.getElementById('lockedProgressBar').style.width = `${enrollment.progress}%`;
        const remaining = enrollment.modules.filter((m) => !m.completed).length;
        document.getElementById('lockedProgressText').textContent =
            `${enrollment.progress}% complete \u2014 ${remaining} module${remaining === 1 ? '' : 's'} left to finish.`;
        showOnly('lockedState');
        return;
    }

    document.getElementById('certStudentName').textContent = enrollment.studentName;
    document.getElementById('certCourseTitle').textContent = enrollment.courseTitle;
    document.getElementById('certMentorName').textContent = enrollment.mentor;
    document.getElementById('certDate').textContent = formatDate(enrollment.completedDate);
    document.getElementById('certVerify').textContent =
        `Certificate ID: ${enrollment.id.toUpperCase()}  \u00b7  Verify at CourseHub`;
    document.title = `Certificate - ${enrollment.courseTitle} - CourseHub`;

    showOnly('certState');
});