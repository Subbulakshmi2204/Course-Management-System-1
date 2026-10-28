import { useState } from "react";
import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";
import { useCourses } from "../context/CourseContext";
import CourseCard from "../components/CourseCard";
import CourseForm from "../components/CourseForm";
import apiClient from "../api/apiClient";

const FILTERS = [
    { key: "all", label: "All" },
    { key: "ai", label: "AI" },
    { key: "ml", label: "ML" },
    { key: "web", label: "Web" },
    { key: "security", label: "Security" },
    { key: "analytics", label: "Analytics" },
    { key: "mobile", label: "Mobile" },
];

const FILTER_CATEGORIES = {
    ai: ["Artificial Intelligence"],
    ml: ["Machine Learning"],
    web: ["Programming", "Web Development", "DevOps"],
    security: ["Security"],
    analytics: ["Data Analytics"],
    mobile: ["Mobile Development"],
};

export default function Courses() {
    // courses.js exposes these on window (handleEnrollment, submitAdminAuth, ...)
    const call = (fn, ...args) => window[fn] && window[fn](...args);
    const { courses, loading, error, addCourse, updateCourse, deleteCourse } = useCourses();
    const [activeFilter, setActiveFilter] = useState("all");

    // Role saved at login (sessionStorage). Only controls what is SHOWN;
    // the backend still enforces permissions on every request.
    const role = sessionStorage.getItem("role");
    const isAdmin = role === "admin";
    const isStudent = role === "student";

    // null = form closed, {} = add, course object = edit
    const [formCourse, setFormCourse] = useState(null);

    const apiMessage = (err, fallback) => err.response?.data?.message || fallback;

    // Task 12 / Activity 6
    const handleEnroll = async (courseId) => {
        try {
            const response = await apiClient.post("/enrollments", { courseId });
            alert(response.data.message || "Enrollment successful!");
        } catch (err) {
            alert(apiMessage(err, "Unable to enroll in this course"));
        }
    };

    // Task 11 / Activity 6
    const handleAddCourse = () => setFormCourse({});
    const handleEdit = (courseId) => setFormCourse(courses.find((c) => c.id === courseId) || null);

    const handleDelete = async (courseId) => {
        if (!window.confirm("Delete this course permanently?")) return;
        try {
            await deleteCourse(courseId);
        } catch (err) {
            alert(apiMessage(err, "Unable to delete this course"));
        }
    };

    const handleSaveCourse = async (values) => {
        try {
            if (formCourse?.id) {
                await updateCourse(formCourse.id, values);
            } else {
                await addCourse(values);
            }
            setFormCourse(null);
        } catch (err) {
            alert(apiMessage(err, "Unable to save this course"));
        }
    };

    const visibleCourses =
        activeFilter === "all"
            ? courses
            : courses.filter((c) => FILTER_CATEGORIES[activeFilter]?.includes(c.category));

    return (
        <>
            <PageCss href="/css/courses.css" />

            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-3">
                <div className="container">
                    <Link to="/" className="navbar-brand fw-bold logo">
                        <i className="bi bi-mortarboard-fill me-2"></i>
                        CourseHub
                    </Link>
                    <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                            <li className="nav-item"><a className="nav-link active" href="#">Courses</a></li>
                            <li className="nav-item"><a className="nav-link" href="#">About</a></li>
                            <li className="nav-item"><a className="nav-link" href="#">Contact</a></li>
                        </ul>
                        <div className="d-flex gap-2 flex-wrap" id="navAuthArea">
                            <div className="dropdown">
                                <a className="btn btn-outline-primary dropdown-toggle px-4" href="#" role="button" data-bs-toggle="dropdown">Login</a>
                                <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                                    <li><Link to="/login" className="dropdown-item"><i className="bi bi-person me-2"></i>User Login</Link></li>
                                    <li><Link to="/admin-login" className="dropdown-item"><i className="bi bi-shield-lock me-2"></i>Admin Login</Link></li>
                                </ul>
                            </div>
                            <div className="dropdown">
                                <a className="btn btn-primary dropdown-toggle px-4" href="#" role="button" data-bs-toggle="dropdown">Register</a>
                                <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                                    <li><Link to="/register" className="dropdown-item"><i className="bi bi-person-plus me-2"></i>User Register</Link></li>
                                    <li><Link to="/admin-login" className="dropdown-item"><i className="bi bi-shield-lock me-2"></i>Admin Login</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <section className="hero-section d-flex align-items-center">
                <div className="bg-grid-overlay"></div>
                <div className="glow-circle-1"></div>
                <div className="glow-circle-2"></div>
                <div className="container">
                    <h1 className="display-5 fw-bold text-white mb-2">Explore Specialized Tracks</h1>
                    <p className="text-white-50 lead fs-6">Filter through global computational sectors and start working on modular tracks.</p>
                </div>
            </section>

            <div className="container py-5">
                <div className="d-flex justify-content-center gap-2 flex-wrap mb-5" id="filter-container">
                    {FILTERS.map((f) => (
                        <button
                            key={f.key}
                            className={`btn ${activeFilter === f.key ? "btn-primary" : "btn-outline-primary"} filter-btn px-4`}
                            onClick={() => setActiveFilter(f.key)}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {isAdmin && (
                    <div className="mb-4">
                        {!formCourse && (
                            <button className="btn btn-primary" onClick={handleAddCourse}>
                                Add Course
                            </button>
                        )}
                        {formCourse && (
                            <CourseForm
                                key={formCourse.id || "new"}
                                course={formCourse.id ? formCourse : null}
                                onSubmit={handleSaveCourse}
                                onCancel={() => setFormCourse(null)}
                            />
                        )}
                    </div>
                )}

                {loading && <p className="text-center">Loading courses...</p>}
                {error && <p className="text-center text-danger">{error}</p>}
                {!loading && !error && visibleCourses.length === 0 && (
                    <p className="text-center text-muted">No courses in this category.</p>
                )}

                <div className="row g-4">
                    {!loading && !error && visibleCourses.map((course) => (
                        <div className="col-md-4" key={course.id}>
                            <CourseCard
                                image={course.image}
                                alt={course.courseName}
                                title={course.courseName}
                                description={course.overview}
                                courseKey={course.id}
                                category={course.category}
                                level={course.level}
                                isStudent={isStudent}
                                isAdmin={isAdmin}
                                onEnrollNow={() => handleEnroll(course._id)}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="modal fade" id="adminAuthModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow">
                        <div className="modal-header border-0 pb-0">
                            <h5 className="fw-bold mb-0">Admin Verification</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-4">
                            <form id="adminAuthForm" onSubmit={(e) => call("submitAdminAuth", e)}>
                                <input type="hidden" id="targetCourseId" />
                                <div className="mb-3">
                                    <label htmlFor="adminEmailField" className="form-label small fw-medium text-secondary">Email address</label>
                                    <input type="email" className="form-control py-2" id="adminEmailField" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="adminPasswordField" className="form-label small fw-medium text-secondary">Password</label>
                                    <input type="password" className="form-control py-2" id="adminPasswordField" required />
                                </div>
                                <button type="submit" className="btn btn-primary w-100 py-2 fw-medium">Verify & Edit Course</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <footer>
                <div className="container text-center text-md-between d-md-flex align-items-center justify-content-between">
                    <p className="mb-2 mb-md-0 opacity-75">© 2026 Student Course Management System. All rights reserved.</p>
                    <div className="d-flex gap-3 justify-content-center">
                        <a href="#" className="text-white opacity-75 text-decoration-none small">Privacy Policy</a>
                        <a href="#" className="text-white opacity-75 text-decoration-none small">Terms of Service</a>
                    </div>
                </div>
            </footer>

            <LegacyScript src="/legacy/js/courses.js" />
        </>
    );
}