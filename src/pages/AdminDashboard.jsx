import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function AdminDashboard() {
    return (
        <>
            <PageCss href="/css/admin-dashboard.css" />
            <div className="main-wrapper">
                <nav className="navbar navbar-expand-lg sticky-top shadow-sm py-3">
                    <div className="container">
                        <a className="navbar-brand fw-bold d-flex align-items-center" href="#">
                            <i className="bi bi-mortarboard-fill text-primary me-2 fs-3"></i>
                            CourseHub
                            <span className="badge bg-primary ms-2">ADMIN</span>
                        </a>
                        <div className="d-flex align-items-center gap-3">
                            <span className="badge rounded-pill bg-success px-3 py-2">
                                <i className="bi bi-circle-fill me-1" style={{fontSize: "7px"}}></i>
                                System Online
                            </span>
                            <Link to="/" className="btn btn-outline-danger rounded-pill px-4">
                                <i className="bi bi-box-arrow-right me-1"></i>
                                Logout
                            </Link>
                        </div>
                    </div>
                </nav>
                <div className="container mt-4">
                    <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                        <div className="card-body p-5" style={{background: "linear-gradient(135deg,#2563EB,#1E40AF)", color: "white"}}>
                            <div className="row align-items-center">
                                <div className="col-lg-8">
                                    <h2 className="fw-bold mb-3">Welcome Administrator 👋</h2>
                                    <p className="opacity-75 fs-5 mb-0">Manage your courses, students, enrollments and reports from one centralized dashboard.</p>
                                </div>
                                <div className="col-lg-4 text-end d-none d-lg-block">
                                    <i className="bi bi-kanban-fill display-2 opacity-50"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container my-5">
                    <div className="row g-4 mb-5">
                        <div className="col-md-3">
                            <Link to="/courses" className="btn btn-action-outline w-100 py-4 rounded-4 text-decoration-none d-block text-center shadow-sm">
                                <i className="bi bi-book-half fs-2 text-primary"></i>
                                <div className="mt-2 fw-semibold">View Courses</div>
                            </Link>
                        </div>
                        <div className="col-md-3">
                            <button className="btn btn-action-primary w-100 py-4 rounded-4 shadow-sm" data-bs-toggle="modal" data-bs-target="#addCourseModal">
                                <i className="bi bi-plus-circle fs-2"></i>
                                <div className="mt-2 fw-semibold">Add Course</div>
                            </button>
                        </div>
                        <div className="col-md-3">
                            <a href="#studentsSection" className="btn btn-action-outline w-100 py-4 rounded-4 text-decoration-none d-block text-center shadow-sm">
                                <i className="bi bi-people fs-2 text-success"></i>
                                <div className="mt-2 fw-semibold">Students</div>
                            </a>
                        </div>
                        <div className="col-md-3">
                            <button className="btn btn-action-outline w-100 py-4 rounded-4 shadow-sm">
                                <i className="bi bi-bar-chart-line fs-2 text-warning"></i>
                                <div className="mt-2 fw-semibold">Reports</div>
                            </button>
                        </div>
                    </div>
                    <div className="row g-4 mb-5">
                        <div className="col-md-3">
                            <div className="stat-card p-4 h-100 shadow-sm d-flex align-items-center justify-content-between">
                                <div>
                                    <div className="text-muted small fw-medium mb-1">Total Courses</div>
                                    <h3 className="fw-bold text-dark mb-0" id="totalCoursesCounter">0</h3>
                                </div>
                                <div className="icon-container icon-primary">
                                    <i className="bi bi-journal-text"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="stat-card p-4 h-100 shadow-sm d-flex align-items-center justify-content-between">
                                <div>
                                    <div className="text-muted small fw-medium mb-1">Active Students</div>
                                    <h3 className="fw-bold text-dark mb-0" id="activeStudentsCounter">0</h3>
                                </div>
                                <div className="icon-container icon-success">
                                    <i className="bi bi-people-fill"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="stat-card p-4 h-100 shadow-sm d-flex align-items-center justify-content-between">
                                <div>
                                    <div className="text-muted small fw-medium mb-1">Instructors</div>
                                    <h3 className="fw-bold text-dark mb-0" id="totalInstructorsCounter">0</h3>
                                </div>
                                <div className="icon-container icon-warning">
                                    <i className="bi bi-person-badge-fill"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="stat-card p-4 h-100 shadow-sm d-flex align-items-center justify-content-between">
                                <div>
                                    <div className="text-muted small fw-medium mb-1">Avg Completion</div>
                                    <h3 className="fw-bold text-dark mb-0" id="avgCompletionCounter">0%</h3>
                                </div>
                                <div className="icon-container icon-danger">
                                    <i className="bi bi-graph-up-arrow"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4 align-items-center">
                        <div className="col">
                            <h4 className="fw-bold text-dark mb-0">Track Operations</h4>
                        </div>
                        <div className="col-md-5">
                            <div className="input-group shadow-sm">
                                <span className="input-group-text bg-white border-end-0 text-muted">
                                    <i className="bi bi-search"></i>
                                </span>
                                <input type="text" id="searchInput" className="form-control border-start-0 ps-0" placeholder="Search Courses..." />
                            </div>
                        </div>
                    </div>
                    <div className="card custom-table-card shadow-sm mb-5">
                        <div className="card-header bg-white d-flex justify-content-between align-items-center py-3 border-bottom">
                            <h5 className="fw-bold mb-0 text-dark">
                                <i className="bi bi-journal-bookmark-fill text-primary me-2"></i>
                                Available Courses
                            </h5>
                            <span className="badge bg-primary px-3 py-2">Course List</span>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead>
                                    <tr>
                                        <th>Course Name</th>
                                        <th>Instructor</th>
                                        <th>Duration</th>
                                        <th>Students</th>
                                        <th>Progress</th>
                                        <th className="text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="courseTableBody"></tbody>
                            </table>
                        </div>
                    </div>
                    <div className="card custom-table-card shadow-sm mb-5" id="studentsSection">
                        <div className="card-header bg-white d-flex justify-content-between align-items-center py-3 border-bottom">
                            <h5 className="fw-bold mb-0 text-dark">
                                <i className="bi bi-people-fill text-success me-2"></i>
                                Enrolled Students
                            </h5>
                            <span className="badge bg-success px-3 py-2">Live Enrollments</span>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead>
                                    <tr>
                                        <th>Student</th>
                                        <th>Course</th>
                                        <th>Enrolled</th>
                                        <th>Progress</th>
                                        <th>Status</th>
                                        <th className="text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="studentTableBody"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="addCourseModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content modal-content-premium shadow">
                        <div className="modal-header border-bottom px-4 py-3 bg-light">
                            <h5 className="modal-title fw-bold text-dark fs-6">Initialize New Instructional Track</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form id="addCourseForm">
                            <div className="modal-body p-4 bg-white">
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <label className="form-label-premium">Course Title</label>
                                        <input type="text" id="courseTitleInput" className="form-control-premium form-control w-100" required placeholder="e.g., Cloud Native Computing" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-premium">Categorization Tag</label>
                                        <select id="courseCategorySelect" className="form-select-premium form-select w-100" required>
                                            <option value="web">Web Architecture & Engineering</option>
                                            <option value="ai">Artificial Intelligence Foundations</option>
                                            <option value="ml">Machine Learning Systems</option>
                                            <option value="security">Cyber Security Frameworks</option>
                                            <option value="analytics">Enterprise Data Analytics</option>
                                            <option value="mobile">Mobile Logic Platforms</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-premium">Course Duration</label>
                                        <input type="text" id="courseDurationInput" className="form-control-premium form-control w-100" required placeholder="e.g., 10 weeks" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-premium">Mentor Name</label>
                                        <input type="text" id="mentorNameInput" className="form-control-premium form-control w-100" required placeholder="e.g., Dr. Marcus Vance" />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label-premium">Source URL Pathway for Cover Image</label>
                                        <input type="url" id="courseImageInput" className="form-control-premium form-control w-100" placeholder="https://domain.com/asset-pathway.png" />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label-premium">Subtext / Track Description Metadata</label>
                                        <textarea id="courseDescriptionInput" className="form-control-premium form-control w-100" rows="4" required placeholder="Outline module parameters, structural tracks, or prerequisite conditions targeted during initialization." defaultValue="" />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer border-top px-4 py-3 bg-light">
                                <button type="button" className="btn btn-light px-4 border rounded-3 fw-medium small" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-action-primary px-4 rounded-3 small">Register Configuration</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <footer>
                <div className="container">
                    <p className="mb-0 opacity-75">© 2026 Student Course Management System. Secure Administrative Gateway.</p>
                </div>
            </footer>
        <LegacyScript src="/legacy/js/admin-dashboard.js" />
        </>
    );
}
