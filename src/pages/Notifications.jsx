import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function Notifications() {
    return (
        <>
            <PageCss href="/css/notifications.css" />
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
                            <li className="nav-item">
                                <Link to="/" className="nav-link">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/courses" className="nav-link">
                                    Courses
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/student-dashboard" className="nav-link">
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/notifications" className="nav-link active">
                                    Notifications
                                </Link>
                            </li>
                        </ul>
                        <div className="d-flex gap-2 flex-wrap" id="navAuthArea">
                            <div className="dropdown">
                                <a className="btn btn-outline-primary dropdown-toggle px-4" href="#" role="button" data-bs-toggle="dropdown">Login</a>
                                <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                                    <li>
                                        <Link to="/login" className="dropdown-item">
                                            <i className="bi bi-person me-2"></i>
                                            User Login
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin-login" className="dropdown-item">
                                            <i className="bi bi-shield-lock me-2"></i>
                                            Admin Login
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="dropdown">
                                <a className="btn btn-primary dropdown-toggle px-4" href="#" role="button" data-bs-toggle="dropdown">Register</a>
                                <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                                    <li>
                                        <Link to="/register" className="dropdown-item">
                                            <i className="bi bi-person-plus me-2"></i>
                                            User Register
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin-login" className="dropdown-item">
                                            <i className="bi bi-shield-lock me-2"></i>
                                            Admin Login
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="page-header">
                <div className="container">
                    <span className="badge bg-primary-soft text-primary px-3 py-2 mb-3 fs-6">Stay in the loop</span>
                    <h1 className="display-6 fw-bold text-white mb-2">Notifications</h1>
                    <p className="text-white-50 mb-0">New courses, enrollment confirmations, and certificates — all in one place.</p>
                </div>
            </div>
            {/* Shown when nobody is logged in */}
            <div className="container py-5" id="loggedOutBody" style={{display: "none"}}>
                <div className="mx-auto text-center py-5" style={{maxWidth: "460px"}}>
                    <i className="bi bi-bell-slash display-4 text-muted mb-3 d-block"></i>
                    <h4 className="fw-bold mb-2">Log in to see your notifications</h4>
                    <p className="text-muted mb-4">New course alerts, enrollment confirmations, and certificate updates only show up once you're signed in.</p>
                    <Link to="/login?redirect=notifications.html" className="btn btn-primary px-4 py-2 me-2">
                        Log In
                    </Link>
                    <Link to="/register" className="btn btn-outline-primary px-4 py-2">
                        Register
                    </Link>
                </div>
            </div>
            {/* Shown once a student is logged in */}
            <div className="container py-5" id="notifBody" style={{display: "none"}}>
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                    <div className="d-flex flex-wrap gap-2" id="filterPills">
                        <button className="filter-pill active" data-filter="all">All</button>
                        <button className="filter-pill" data-filter="new_course">New Courses</button>
                        <button className="filter-pill" data-filter="enrollment">Enrollments</button>
                        <button className="filter-pill" data-filter="certificate">Certificates</button>
                    </div>
                    <button className="btn btn-outline-secondary btn-sm px-3" id="markAllReadBtn">
                        <i className="bi bi-check2-all me-1"></i>
                        Mark all as read
                    </button>
                </div>
                <div className="d-flex flex-column gap-3" id="notifList"></div>
                <div className="empty-state text-center py-5 d-none" id="emptyState">
                    <i className="bi bi-inbox d-block mb-3"></i>
                    <h5 className="fw-bold mb-1">Nothing here yet</h5>
                    <p className="text-muted mb-0">Enroll in a course to start getting updates.</p>
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
        <LegacyScript src="/legacy/js/notification.js" />
        </>
    );
}
