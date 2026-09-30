import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function StudentDashboard() {
    return (
        <>
            <PageCss href="/css/student-dashboard.css" />
            <nav className="navbar navbar-expand-lg navbar-white bg-white border-bottom sticky-top py-3">
                <div className="container">
                    <a className="navbar-brand navbar-brand-custom fs-4 d-flex align-items-center" href="#">
                        <i className="bi bi-mortarboard-fill me-2 text-warning"></i>
                        CourseHub
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
                            <Link to="/progress" className="text-decoration-none text-dark fw-medium small">
                                <i className="bi bi-bar-chart-line-fill me-1 text-primary"></i>
                                My Progress
                            </Link>
                            <span className="text-muted small">
                                <i className="bi bi-bell-fill fs-5 text-secondary"></i>
                            </span>
                            <a href="#" onClick={() => window.eval("handleLogout('user-login.html')")} className="btn btn-outline-danger btn-sm rounded-pill px-3">
                                <i className="bi bi-box-arrow-right me-1"></i>
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="container my-5">
                <div className="row g-4">
                    <div className="col-lg-4">
                        <div className="card dashboard-card p-4 text-center">
                            <div className="position-relative d-inline-block mx-auto mb-3">
                                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256" className="rounded-circle profile-avatar" alt="Student Avatar" />
                                <span className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle p-2" title="Online"></span>
                            </div>
                            <h4 className="fw-bold mb-1 text-dark" id="profileName">Alex Morgan</h4>
                            <p className="text-muted small mb-3">ID: CH-2026-8942</p>
                            <span className="badge bg-light text-primary border border-primary-subtle badge-custom mx-auto mb-4">
                                <i className="bi bi-award-fill me-1 text-warning"></i>
                                Premium Learner
                            </span>
                            <hr className="text-muted opacity-25" />
                            <div className="text-start mt-3">
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <i className="bi bi-envelope text-primary fs-5"></i>
                                    <div>
                                        <small className="text-muted d-block">Email Address</small>
                                        <span className="fw-medium small" id="profileEmail">alex.morgan@example.com</span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <i className="bi bi-book text-primary fs-5"></i>
                                    <div>
                                        <small className="text-muted d-block">Major / Focus</small>
                                        <span className="fw-medium small">Full-Stack Software Engineering</span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <i className="bi bi-calendar3 text-primary fs-5"></i>
                                    <div>
                                        <small className="text-muted d-block">Joined Ecosystem</small>
                                        <span className="fw-medium small">January 2026</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card dashboard-card bg-gradient-primary text-white p-4 mb-4 border-0 position-relative overflow-hidden">
                            <div className="position-relative z-1">
                                <h2 className="fw-bold mb-2">Welcome to CourseHub, Alex! 🚀</h2>
                                <p className="opacity-75 mb-4">Your profile is set up. Explore the catalog to start your learning journey today.</p>
                                <div className="bg-white bg-opacity-10 rounded-4 p-3 border border-white border-opacity-10">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span className="small fw-medium">
                                            <i className="bi bi-lightning-charge-fill text-warning me-1"></i>
                                            Overall Curriculum Track Completion
                                        </span>
                                        <span className="fw-bold small" id="overallProgressLabel">0%</span>
                                    </div>
                                    <div className="progress bg-white bg-opacity-25">
                                        <div className="progress-bar bg-warning" role="progressbar" id="overallProgressBar" style={{width: "0%"}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row g-3 mb-4">
                            <div className="col-6 col-sm-4">
                                <div className="card dashboard-card p-3 text-center">
                                    <i className="bi bi-hourglass-split text-primary fs-3 mb-1"></i>
                                    <h3 className="fw-bold text-dark mb-0" id="statOngoing">0</h3>
                                    <small className="text-muted">Ongoing Courses</small>
                                </div>
                            </div>
                            <div className="col-6 col-sm-4">
                                <div className="card dashboard-card p-3 text-center">
                                    <i className="bi bi-check-circle-fill text-success fs-3 mb-1"></i>
                                    <h3 className="fw-bold text-dark mb-0" id="statCompleted">0</h3>
                                    <small className="text-muted">Completed Courses</small>
                                </div>
                            </div>
                            <div className="col-12 col-sm-4">
                                <div className="card dashboard-card p-3 text-center">
                                    <i className="bi bi-clock-history text-warning fs-3 mb-1"></i>
                                    <h3 className="fw-bold text-dark mb-0" id="statHours">0 hrs</h3>
                                    <small className="text-muted">Study Hours Tracked</small>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="fw-bold text-dark mb-0">
                                <i className="bi bi-play-circle-fill text-primary me-2"></i>
                                Ongoing Active Courses
                            </h5>
                            <Link to="/progress" className="small fw-medium text-decoration-none">
                                View detailed progress
                                <i className="bi bi-arrow-right"></i>
                            </Link>
                        </div>
                        <div className="row g-3 mb-5" id="ongoingCoursesContainer">
                            <div className="col-12">
                                <div className="card dashboard-card p-5 text-center bg-white">
                                    <div className="mb-3">
                                        <i className="bi bi-journal-bookmark-fill empty-state-icon"></i>
                                    </div>
                                    <h6 className="fw-bold text-dark mb-2">No Active Courses Yet</h6>
                                    <p className="text-muted small mx-auto max-w-400 mb-4">You haven't enrolled in or started any interactive workflows yet. Ready to start building your technical profile?</p>
                                    <Link to="/courses" className="btn btn-primary btn-sm rounded-pill px-4 py-2 fw-medium">
                                        Browse Catalog
                                        <i className="bi bi-search ms-1 small"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <h5 className="fw-bold text-dark mb-3">
                            <i className="bi bi-patch-check-fill text-success me-2"></i>
                            Completed Ecosystem Credentials
                        </h5>
                        <div className="row g-3" id="completedCoursesContainer">
                            <div className="col-12">
                                <div className="card dashboard-card p-4 text-center bg-white border border-dashed">
                                    <p className="text-muted small mb-0">Certificates and verified badges will appear here once you finish a course track.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <LegacyScript src="/legacy/js/student-dashboard.js" />
        </>
    );
}
