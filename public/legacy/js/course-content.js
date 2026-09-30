import { getCourseById } from './api.js';
import { renderModules, handleEnrollClick } from './course-player.js';

const courseId = new URLSearchParams(window.location.search).get('courseId');
const course = courseId ? getCourseById(courseId) : null;

if (!course) {
    document.getElementById('notFoundBody').style.display = 'block';
} else {
    document.getElementById('pageBody').style.display = 'block';
    document.title = course.title + ' - CourseHub';
    document.getElementById('courseTitle').textContent = course.title;
    document.getElementById('courseTagline').textContent = `${course.duration} with ${course.mentor}`;
    document.getElementById('courseMentor').textContent = course.mentor;
    document.getElementById('courseDuration').textContent = course.duration;
    document.getElementById('bannerImg').src =
        course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80';

    document.getElementById('enrollBtn').addEventListener('click', () => handleEnrollClick(courseId));
    document.getElementById('unlockBtn').addEventListener('click', () => handleEnrollClick(courseId));

    const render = () => renderModules(courseId);
    document.addEventListener('DOMContentLoaded', render);
    // DOMContentLoaded may have already fired since module scripts run
    // deferred, near the end of parsing.
    if (document.readyState !== 'loading') render();
}