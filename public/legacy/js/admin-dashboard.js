import {
    getCourses, saveCourses, getEnrollments, saveEnrollments,
    unenrollStudent, syncCourseStats, getAdminStats, slugify,
} from './api.js';

function deleteCourse(courseId) {
    saveCourses(getCourses().filter((c) => c.id !== courseId));

    // also drop any enrollments tied to the deleted course
    saveEnrollments(getEnrollments().filter((e) => e.courseId !== courseId));

    renderCoursesTable();
    renderStudentsTable();
    renderStatCounters();
}

function unenrollStudentHandler(enrollmentId) {
    unenrollStudent(enrollmentId);
    renderCoursesTable();
    renderStudentsTable();
    renderStatCounters();
}

function renderCoursesTable(filterText = '') {
    const tbody = document.getElementById('courseTableBody');
    if (!tbody) return;

    const combinedTracks = getCourses();
    tbody.innerHTML = '';

    combinedTracks.forEach((track) => {
        if (
            filterText &&
            !track.title.toLowerCase().includes(filterText.toLowerCase()) &&
            !track.mentor.toLowerCase().includes(filterText.toLowerCase())
        ) {
            return;
        }

        const row = document.createElement('tr');
        const barColor = track.color || 'secondary';

        row.innerHTML = `
            <td class="fw-semibold text-dark">${track.title}</td>
            <td>${track.mentor}</td>
            <td>${track.duration}</td>
            <td>${track.students}</td>
            <td>
                <div class="d-flex align-items-center">
                    <div class="progress flex-grow-1 me-2" style="height:8px;">
                        <div class="progress-bar bg-${barColor}" style="width:${track.progress}%;"></div>
                    </div>
                    <small class="fw-medium text-muted">${track.progress}%</small>
                </div>
            </td>
            <td class="text-end">
                <button class="btn btn-link text-danger p-0 border-0" onclick="deleteCourse('${track.id}')">
                    <i class="bi bi-trash3-fill fs-5"></i>
                </button>
            </td>`;
        tbody.appendChild(row);
    });
}

function renderStudentsTable() {
    const tbody = document.getElementById('studentTableBody');
    if (!tbody) return;

    const enrollments = getEnrollments();
    tbody.innerHTML = '';

    if (!enrollments.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-muted py-4">No enrollments yet — once a student enrolls in a course it will show up here.</td>
            </tr>`;
        return;
    }

    enrollments.forEach((enr) => {
        const statusBadge = enr.status === 'completed'
            ? '<span class="badge bg-success-subtle text-success">Completed</span>'
            : '<span class="badge bg-primary-subtle text-primary">Ongoing</span>';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="fw-semibold text-dark">${enr.studentName}</div>
                <small class="text-muted">${enr.studentEmail}</small>
            </td>
            <td>${enr.courseTitle}</td>
            <td>${enr.enrolledDate}</td>
            <td>
                <div class="d-flex align-items-center">
                    <div class="progress flex-grow-1 me-2" style="height:8px;">
                        <div class="progress-bar bg-${enr.color || 'primary'}" style="width:${enr.progress}%;"></div>
                    </div>
                    <small class="fw-medium text-muted">${enr.progress}%</small>
                </div>
            </td>
            <td>${statusBadge}</td>
            <td class="text-end">
                <button class="btn btn-link text-danger p-0 border-0" onclick="unenrollStudent('${enr.id}')" title="Remove enrollment">
                    <i class="bi bi-x-circle-fill fs-5"></i>
                </button>
            </td>`;
        tbody.appendChild(row);
    });
}

function renderStatCounters() {
    const stats = getAdminStats();
    const totalCoursesCounter = document.getElementById('totalCoursesCounter');
    const totalInstructorsCounter = document.getElementById('totalInstructorsCounter');
    const activeStudentsCounter = document.getElementById('activeStudentsCounter');
    const avgCompletionCounter = document.getElementById('avgCompletionCounter');

    if (totalCoursesCounter) totalCoursesCounter.textContent = stats.totalCourses;
    if (totalInstructorsCounter) totalInstructorsCounter.textContent = stats.totalInstructors;
    if (activeStudentsCounter) activeStudentsCounter.textContent = stats.activeStudents;
    if (avgCompletionCounter) avgCompletionCounter.textContent = `${stats.avgCompletion}%`;
}

// Exposed for the inline onclick="..." attributes rendered into the tables above.
window.deleteCourse = deleteCourse;
window.unenrollStudent = unenrollStudentHandler;

document.getElementById('addCourseForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('courseTitleInput').value.trim();
    const duration = document.getElementById('courseDurationInput').value.trim();
    const mentor = document.getElementById('mentorNameInput').value.trim();
    const category = document.getElementById('courseCategorySelect').value;

    const courses = getCourses();
    const newCourse = {
        id: slugify(title),
        title,
        mentor,
        duration,
        category,
        students: 0,
        progress: 0,
        color: 'secondary',
        modules: ['Module 1', 'Module 2', 'Module 3', 'Module 4', 'Module 5'],
    };

    courses.push(newCourse);
    saveCourses(courses);

    renderCoursesTable();
    renderStudentsTable();
    renderStatCounters();

    const modalEl = document.getElementById('addCourseModal');
    if (modalEl) {
        const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modalInstance.hide();
    }

    this.reset();
});

document.getElementById('searchInput').addEventListener('input', (e) => {
    renderCoursesTable(e.target.value.trim());
});

document.addEventListener('DOMContentLoaded', () => {
    syncCourseStats();
    renderCoursesTable();
    renderStudentsTable();
    renderStatCounters();
});