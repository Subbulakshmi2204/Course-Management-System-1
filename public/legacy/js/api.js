/* =========================================================================
   api.js — data / "backend" module
   -------------------------------------------------------------------------
   Owns everything that ISN'T "who is logged in": the course catalog,
   enrollments, and notifications. It's a localStorage-backed stand-in for
   a real REST API — every exported function is written the way an async
   fetch() wrapper would be, so pages call CourseHub-style functions
   without caring that the "server" is actually the browser's own storage.

   Depends on auth.js only to read the current user (enrollInCourse) and
   the registered accounts list (broadcastNewCourse) — it never writes to
   auth's storage keys.
   ========================================================================= */

import { getLesson } from './course-content-data.js';
import { getCurrentUser, getUsers } from './auth.js';
import { setSelectedCourse } from './state.js';

const CATALOG_KEY = 'courseHub_tracks';
const ENROLL_KEY = 'courseHub_enrollments';
const NOTIF_KEY = 'courseHub_notifications';

// The 12 courses shown on courses.html, each with a stable id/category/
// mentor/duration/module list so they can be tracked end-to-end.
const DEFAULT_CATALOG = [
    { id: 'python-masterclass',       title: 'Python Programming Masterclass',        mentor: 'Dr. Sarah Jenkins', duration: '6 Weeks',  category: 'web',      color: 'success',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      modules: ['Python Basics & Syntax', 'Data Structures', 'Functions & Modules', 'File Handling & APIs', 'Automation Capstone Project'] },
    { id: 'fullstack-dev',            title: 'Full Stack Web Development',            mentor: 'Alex Rivera',       duration: '12 Weeks', category: 'web',      color: 'primary',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=80',
      modules: ['HTML, CSS & Responsive Layout', 'JavaScript Fundamentals', 'Frontend Frameworks', 'Backend & REST APIs', 'Databases & Deployment'] },
    { id: 'ai-foundations',           title: 'Artificial Intelligence Foundations',   mentor: 'Prof. Alan Turing', duration: '8 Weeks',  category: 'ai',       color: 'info',
      image: 'https://lirp.cdn-website.com/de11e97c/dms3rep/multi/opt/AI+FOUNDATIONS-640w.png',
      modules: ['Intro to AI Concepts', 'Search & Optimization', 'Neural Network Basics', 'Model Training', 'Capstone: Build a Classifier'] },
    { id: 'gen-ai',                   title: 'Generative AI & Large Language Models', mentor: 'Dr. Maya Chen',     duration: '10 Weeks', category: 'ai',       color: 'info',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ-HU7vvPiM9SBgEhJCRi48tQbm7P-bLf4Yr15IJkEuI0ugjDK8GiNi_E&s=10',
      modules: ['Transformer Architecture', 'Prompt Engineering', 'Fine-Tuning Techniques', 'Context Windows & RAG', 'Deploying LLM Apps'] },
    { id: 'cyber-security',           title: 'Cyber Security & Ethical Hacking',      mentor: 'James Whitfield',   duration: '9 Weeks',  category: 'security', color: 'danger',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
      modules: ['Network Security Basics', 'Threat Modeling', 'Penetration Testing', 'Cryptography', 'Incident Response'] },
    { id: 'data-analytics',           title: 'Data Science & Analytics BootCamp',     mentor: 'Priya Nandan',      duration: '8 Weeks',  category: 'analytics',color: 'warning',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      modules: ['Statistics Refresher', 'Data Wrangling with Pandas', 'Data Visualization', 'Dashboarding with Tableau', 'Analytics Capstone'] },
    { id: 'cross-platform-mobile',    title: 'Cross-Platform App Development',        mentor: "Liam O'Connor",     duration: '7 Weeks',  category: 'mobile',   color: 'primary',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
      modules: ['Mobile UI Fundamentals', 'Cross-Platform Frameworks', 'State Management', 'Native Device APIs', 'App Store Deployment'] },
    { id: 'advanced-mobile',          title: 'Advanced iOS & Android Architecture',   mentor: 'Nina Petrova',      duration: '10 Weeks', category: 'mobile',   color: 'primary',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      modules: ['Native Architecture Patterns', 'Async Programming', 'Lifecycle Management', 'Reactive Structures', 'Performance Optimization'] },
    { id: 'reinforcement-learning',   title: 'Deep Reinforcement Learning',           mentor: 'Andrew Ng',         duration: '10 Weeks', category: 'ai',       color: 'info',
      image: 'https://bs-uploads.toptal.io/blackfish-uploads/components/open_graph_image/8958314/og_image/optimized/deep-dive-into-reinforcement-learning-2393e08aa800a4247f6066eee9ba0e8d.png',
      modules: ['RL Fundamentals', 'Q-Learning', 'Policy Gradients', 'Actor-Critic Methods', 'Capstone Agent Project'] },
    { id: 'nlp',                      title: 'Natural Language Processing',           mentor: 'Dr. Rachel Kim',    duration: '9 Weeks',  category: 'ml',       color: 'warning',
      image: 'https://miro.medium.com/1*tjyq7DrWkcK_rgym6YJ1Pw.png',
      modules: ['Text Preprocessing & Tokenization', 'Sequence Models', 'Transformers for NLP', 'Translation & Summarization', 'Capstone NLP App'] },
    { id: 'mlops',                    title: 'Predictive Analytics & ML Ops',         mentor: 'Carlos Mendes',     duration: '6 Weeks',  category: 'ml',       color: 'warning',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      modules: ['ML Pipeline Design', 'Model Monitoring', 'CI/CD for ML', 'Automation & Orchestration', 'Capstone Deployment'] },
    { id: 'devops',                   title: 'Cloud Native DevOps Engine',            mentor: 'Sophie Laurent',    duration: '8 Weeks',  category: 'web',      color: 'success',
      image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
      modules: ['Containers & Docker', 'Kubernetes Basics', 'CI/CD Pipelines', 'Infrastructure as Code', 'Monitoring & Logging'] }
];

// Generic placeholder video used for every "video" content item until
// real per-module recordings are ready to swap in (see buildModuleContent).
const PLACEHOLDER_VIDEO = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80';

// Builds the 3-item lesson (image -> video -> reading) shown inside a
// module in the course player. Swap `src`/`body` per module later for
// real content — the completion-tracking logic doesn't need to change.
function buildModuleContent(course, moduleName, moduleIndex) {
    const lesson = course ? getLesson(course.id, moduleIndex) : null;
    return [
        {
            type: 'image',
            title: moduleName + ' — Visual Overview',
            src: (course && course.image) || FALLBACK_IMAGE,
            caption: 'Click the image once you\'ve reviewed it to mark this step complete.',
            done: false,
        },
        {
            type: 'video',
            title: moduleName + ' — Video Walkthrough',
            src: lesson ? lesson.video : PLACEHOLDER_VIDEO,
            caption: 'Click / play the video to mark this step complete.',
            done: false,
        },
        {
            type: 'text',
            title: moduleName + ' — Reading',
            body: lesson ? lesson.reading :
                'This section covers "' + moduleName + '". Read through the material, then scroll to the end of this box to mark it as read.',
            done: false,
        },
    ];
}

function readJSON(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
        return fallback;
    }
}

function writeJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

/** Seeds the catalog/enrollments/notifications collections on first run,
 *  and merges in any new default courses without touching admin-added
 *  custom ones. Runs automatically below. */
function initializeCatalogStorage() {
    if (!localStorage.getItem(CATALOG_KEY)) {
        writeJSON(CATALOG_KEY, DEFAULT_CATALOG.map((c) => Object.assign({ students: 0, progress: 0 }, c)));
    } else {
        const existing = readJSON(CATALOG_KEY, []);
        const existingIds = new Set(existing.map((c) => c.id));
        let changed = false;
        DEFAULT_CATALOG.forEach((def) => {
            if (!existingIds.has(def.id)) {
                existing.push(Object.assign({ students: 0, progress: 0 }, def));
                changed = true;
            }
        });
        if (changed) writeJSON(CATALOG_KEY, existing);
    }
    if (!localStorage.getItem(ENROLL_KEY)) writeJSON(ENROLL_KEY, []);
    if (!localStorage.getItem(NOTIF_KEY)) writeJSON(NOTIF_KEY, []);
}

// --- course catalog ------------------------------------------------------
export function getCourses() {
    return readJSON(CATALOG_KEY, []);
}
export function saveCourses(courses) {
    writeJSON(CATALOG_KEY, courses);
}
export function getCourseById(id) {
    const course = getCourses().find((c) => c.id === id) || null;
    if (course) setSelectedCourse(course.id);
    return course;
}

export function slugify(str) {
    return (
        String(str).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') ||
        'course-' + Date.now()
    );
}

// --- enrollments -----------------------------------------------------------
export function getEnrollments() {
    return readJSON(ENROLL_KEY, []);
}
export function saveEnrollments(list) {
    writeJSON(ENROLL_KEY, list);
}
export function getEnrollmentsForStudent(studentId) {
    return getEnrollments().filter((e) => e.studentId === studentId);
}
export function getEnrollmentById(enrollmentId) {
    return getEnrollments().find((e) => e.id === enrollmentId) || null;
}

export function enrollInCourse(courseId) {
    const course = getCourseById(courseId);
    if (!course) return null;

    const user = getCurrentUser();
    if (!user) return null; // caller must ensure the student is logged in first

    const enrollments = getEnrollments();
    const already = enrollments.find((e) => e.studentId === user.id && e.courseId === courseId);
    if (already) return already;

    const moduleNames = course.modules && course.modules.length
        ? course.modules
        : ['Module 1', 'Module 2', 'Module 3', 'Module 4', 'Module 5'];

    const record = {
        id: 'enr-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        studentId: user.id,
        studentName: user.name,
        studentEmail: user.email,
        courseId: course.id,
        courseTitle: course.title,
        mentor: course.mentor,
        duration: course.duration,
        color: course.color || 'primary',
        enrolledDate: new Date().toISOString().slice(0, 10),
        progress: 0,
        status: 'ongoing',
        completedDate: null,
        modules: moduleNames.map((name, idx) => ({
            id: idx + 1,
            name,
            completed: false,
            content: buildModuleContent(course, name, idx),
        })),
    };

    enrollments.push(record);
    saveEnrollments(enrollments);
    syncCourseStats();
    addNotification(
        user.id,
        'enrollment',
        'Enrollment confirmed',
        'You\'re enrolled in ' + course.title + '. Head to the course page to start learning.',
        course.id
    );
    return record;
}

function recalculateProgress(rec) {
    const doneCount = rec.modules.filter((m) => m.completed).length;
    rec.progress = Math.round((doneCount / rec.modules.length) * 100);
    const wasCompleted = rec.status === 'completed';
    rec.status = rec.progress === 100 ? 'completed' : 'ongoing';

    if (rec.status === 'completed' && !wasCompleted) {
        rec.completedDate = new Date().toISOString().slice(0, 10);
    } else if (rec.status !== 'completed') {
        rec.completedDate = null;
    }
    return { wasCompleted };
}

export function toggleModuleComplete(enrollmentId, moduleId) {
    const enrollments = getEnrollments();
    const rec = enrollments.find((e) => e.id === enrollmentId);
    if (!rec) return null;
    const mod = rec.modules.find((m) => m.id === moduleId);
    if (!mod) return null;

    mod.completed = !mod.completed;
    if (mod.content && mod.content.length) {
        mod.content.forEach((item) => { item.done = mod.completed; });
    }

    const { wasCompleted } = recalculateProgress(rec);
    saveEnrollments(enrollments);
    syncCourseStats();
    if (rec.status === 'completed' && !wasCompleted) notifyCertificateReady(rec);
    return rec;
}

/** Marks a single content item (image / video / text) inside a module as
 *  done. Once every item in a module is done, the module flips to
 *  completed and overall course progress recalculates. */
export function markContentDone(enrollmentId, moduleId, contentIndex) {
    const enrollments = getEnrollments();
    const rec = enrollments.find((e) => e.id === enrollmentId);
    if (!rec) return null;
    const mod = rec.modules.find((m) => m.id === moduleId);
    if (!mod || !mod.content || !mod.content[contentIndex]) return null;

    const item = mod.content[contentIndex];
    if (item.done) return rec; // already marked, nothing to do

    item.done = true;
    mod.completed = mod.content.every((c) => c.done);

    const { wasCompleted } = recalculateProgress(rec);
    saveEnrollments(enrollments);
    syncCourseStats();
    if (rec.status === 'completed' && !wasCompleted) notifyCertificateReady(rec);
    return rec;
}

function notifyCertificateReady(rec) {
    addNotification(
        rec.studentId,
        'certificate',
        'Certificate ready',
        'Congratulations! Your certificate for ' + rec.courseTitle + ' is ready to download.',
        rec.courseId
    );
}

export function unenrollStudent(enrollmentId) {
    const enrollments = getEnrollments().filter((e) => e.id !== enrollmentId);
    saveEnrollments(enrollments);
    syncCourseStats();
}

/** Recomputes each course's `students` count and average `progress` from
 *  the current enrollment records — keeps the admin table accurate. */
export function syncCourseStats() {
    const enrollments = getEnrollments();
    const courses = getCourses();

    courses.forEach((course) => {
        const related = enrollments.filter((e) => e.courseId === course.id);
        course.students = related.length;
        course.progress = related.length
            ? Math.round(related.reduce((sum, e) => sum + e.progress, 0) / related.length)
            : 0;
    });

    saveCourses(courses);
    return courses;
}

// --- notifications ---------------------------------------------------------
// Three kinds are raised automatically as students use the site:
//   'new_course'  - broadcast to every registered student when a course is
//                   added via addCourse()
//   'enrollment'  - sent to a student the moment they enroll in a course
//   'certificate' - sent to a student the moment a course hits 100%
export function getNotifications() {
    return readJSON(NOTIF_KEY, []);
}
export function saveNotifications(list) {
    writeJSON(NOTIF_KEY, list);
}
export function getNotificationsForStudent(studentId) {
    return getNotifications()
        .filter((n) => n.studentId === studentId)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
}
export function getUnreadNotificationCount(studentId) {
    return getNotifications().filter((n) => n.studentId === studentId && !n.read).length;
}
export function addNotification(studentId, type, title, message, courseId) {
    const list = getNotifications();
    const note = {
        id: 'note-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        studentId,
        type, // 'new_course' | 'enrollment' | 'certificate'
        title,
        message,
        courseId: courseId || null,
        date: new Date().toISOString(),
        read: false,
    };
    list.push(note);
    saveNotifications(list);
    return note;
}

/** Sends a 'new_course' notification to every currently registered student. */
export function broadcastNewCourse(course) {
    getUsers().forEach((u) => {
        addNotification(
            u.id,
            'new_course',
            'New course available',
            course.title + ' with ' + course.mentor + ' just launched — check it out!',
            course.id
        );
    });
}

export function markNotificationRead(notificationId) {
    const list = getNotifications();
    const note = list.find((n) => n.id === notificationId);
    if (!note) return null;
    note.read = true;
    saveNotifications(list);
    return note;
}

export function markAllNotificationsRead(studentId) {
    const list = getNotifications();
    list.forEach((n) => { if (n.studentId === studentId) n.read = true; });
    saveNotifications(list);
}

/** Preferred way for an admin page to add a course — also notifies every
 *  registered student that a new course is available. */
export function addCourse(courseData) {
    const courses = getCourses();
    const course = Object.assign({ students: 0, progress: 0 }, courseData);
    if (!course.id) course.id = slugify(course.title);
    courses.push(course);
    saveCourses(courses);
    broadcastNewCourse(course);
    return course;
}

export function getAdminStats() {
    const courses = getCourses();
    const enrollments = getEnrollments();
    const uniqueStudents = new Set(enrollments.map((e) => e.studentId));
    const uniqueMentors = new Set(courses.map((c) => c.mentor));
    const avgCompletion = enrollments.length
        ? Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length)
        : 0;

    return {
        totalCourses: courses.length,
        activeStudents: uniqueStudents.size,
        totalInstructors: uniqueMentors.size,
        avgCompletion,
    };
}

initializeCatalogStorage();

/** Older enrollments were saved with generic placeholder lessons. Rebuild
 *  the lesson content from the current course data, keeping each item's
 *  "done" state, so students see the real study material. */
export function refreshEnrollmentContent(enrollment) {
    const course = getCourseById(enrollment.courseId);
    if (!course) return enrollment;
    let changed = false;
    enrollment.modules.forEach((mod, idx) => {
        const fresh = buildModuleContent(course, mod.name, idx);
        const stale = mod.content.some((c, i) => c.type !== fresh[i].type)
            || mod.content.some((c, i) => (c.body || c.src) !== (fresh[i].body || fresh[i].src));
        if (!stale) return;
        fresh.forEach((item, i) => { item.done = !!(mod.content[i] && mod.content[i].done); });
        mod.content = fresh;
        changed = true;
    });
    if (changed) {
        const all = getEnrollments();
        const at = all.findIndex((e) => e.id === enrollment.id);
        if (at >= 0) { all[at] = enrollment; saveEnrollments(all); }
    }
    return enrollment;
}