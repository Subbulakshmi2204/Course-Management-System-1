import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function CourseContent() {
    return (
        <>
            <PageCss href="/css/course-content.css" />
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
                                <Link to="/courses" className="nav-link active">
                                    Courses
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Contact</a>
                            </li>
                        </ul>
                        <div className="d-flex gap-2 flex-wrap">
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
            <div className="banner-container">
                <img id="bannerImg" src className="banner-img" alt="Course banner" />
                <div className="banner-overlay"></div>
                <div className="banner-content">
                    <div className="container">
                        <span className="badge bg-primary-soft text-primary px-3 py-2 mb-3 fs-6">Custom Track</span>
                        <h1 className="display-5 fw-bold text-white mb-3" id="courseTitle">Loading course…</h1>
                        <p className="text-white-50 lead mb-0 fs-6" id="courseTagline"></p>
                    </div>
                </div>
            </div>
            <div className="container py-5" id="pageBody" style={{display: "none"}}>
                <div className="row g-5">
                    <div className="col-lg-8">
                        <section className="mb-5" id="interactiveModulesSection">
                            <h3 className="fw-bold mb-4">Modules Layout</h3>
                            <div id="lockedNotice" className="alert alert-primary d-flex align-items-center justify-content-between flex-wrap gap-2 rounded-3">
                                <div>
                                    <i className="bi bi-lock-fill me-2"></i>
                                    Log in and enroll to unlock the interactive lessons — each module includes an image, a video, and a short reading.
                                </div>
                                <button className="btn btn-primary btn-sm px-3" id="unlockBtn">Enroll to Unlock</button>
                            </div>
                            <div className="accordion module-accordion d-flex flex-column gap-3 d-none" id="interactiveModules"></div>
                        </section>
                    </div>
                    <div className="col-lg-4">
                        <div className="meta-card p-4 shadow-sm">
                            <div className="d-flex flex-column gap-3 mb-4">
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-person-badge text-primary fs-4 me-3"></i>
                                    <div>
                                        <span className="text-muted small d-block">Instructor</span>
                                        <span className="fw-semibold" id="courseMentor">—</span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-clock text-primary fs-4 me-3"></i>
                                    <div>
                                        <span className="text-muted small d-block">Duration</span>
                                        <span className="fw-semibold" id="courseDuration">—</span>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-primary w-100 py-3 fw-medium" id="enrollBtn">Enroll In Course</button>
                            <div id="courseProgressWrap" className="mt-4 d-none">
                                <div className="d-flex justify-content-between align-items-center mb-1">
                                    <span className="text-muted small">Your progress</span>
                                    <span className="text-muted small" id="courseProgressLabel">0% complete</span>
                                </div>
                                <div className="progress" style={{height: "8px", borderRadius: "20px"}}>
                                    <div className="progress-bar bg-success" id="courseProgressBar" role="progressbar" style={{width: "0%"}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container py-5" id="notFoundBody" style={{display: "none"}}>
                <div className="alert alert-warning">
                    This course could not be found.
                    <Link to="/courses" className="alert-link">
                        Back to all courses
                    </Link>
                    .
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
        <LegacyScript src="/legacy/js/course-content.js" />
        </>
    );
}