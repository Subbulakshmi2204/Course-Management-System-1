import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function Progress() {
    return (
        <>
            <PageCss href="/css/progress.css" />
            <nav className="navbar navbar-expand-lg navbar-white bg-white border-bottom sticky-top py-3">
                <div className="container">
                    <Link to="/student-dashboard" className="navbar-brand navbar-brand-custom fs-4 d-flex align-items-center">
                        <i className="bi bi-mortarboard-fill me-2 text-warning"></i>
                        CourseHub
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
                            <Link to="/student-dashboard" className="text-decoration-none text-dark fw-medium small">
                                <i className="bi bi-arrow-left me-1"></i>
                                Back to Dashboard
                            </Link>
                            <a href="#" onClick={() => window.eval("handleLogout('user-login.html')")} className="btn btn-outline-danger btn-sm rounded-pill px-3">
                                <i className="bi bi-box-arrow-right me-1"></i>
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="container my-5">
                <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-4">
                    <div>
                        <h2 className="fw-bold text-dark mb-1">My Learning Progress</h2>
                        <p className="text-muted mb-0">Track every module across every course you've enrolled in.</p>
                    </div>
                </div>
                <div className="row g-3 mb-4">
                    <div className="col-6 col-sm-3">
                        <div className="card dashboard-card p-3 text-center">
                            <i className="bi bi-journals text-primary fs-3 mb-1"></i>
                            <h3 className="fw-bold text-dark mb-0" id="statTotal">0</h3>
                            <small className="text-muted">Total Enrolled</small>
                        </div>
                    </div>
                    <div className="col-6 col-sm-3">
                        <div className="card dashboard-card p-3 text-center">
                            <i className="bi bi-hourglass-split text-warning fs-3 mb-1"></i>
                            <h3 className="fw-bold text-dark mb-0" id="statOngoing">0</h3>
                            <small className="text-muted">Ongoing</small>
                        </div>
                    </div>
                    <div className="col-6 col-sm-3">
                        <div className="card dashboard-card p-3 text-center">
                            <i className="bi bi-patch-check-fill text-success fs-3 mb-1"></i>
                            <h3 className="fw-bold text-dark mb-0" id="statCompleted">0</h3>
                            <small className="text-muted">Completed</small>
                        </div>
                    </div>
                    <div className="col-6 col-sm-3">
                        <div className="card dashboard-card p-3 text-center">
                            <i className="bi bi-graph-up-arrow text-info fs-3 mb-1"></i>
                            <h3 className="fw-bold text-dark mb-0" id="statAvg">0%</h3>
                            <small className="text-muted">Average Completion</small>
                        </div>
                    </div>
                </div>
                <div className="d-flex gap-2 mb-4" id="filterBar">
                    <span className="filter-pill active" data-filter="all">All</span>
                    <span className="filter-pill" data-filter="ongoing">Ongoing</span>
                    <span className="filter-pill" data-filter="completed">Completed</span>
                </div>
                <div id="courseList" className="d-flex flex-column gap-3">{/* populated by JS */}</div>
                <div className="card dashboard-card p-5 text-center bg-white d-none" id="emptyState">
                    <div className="mb-3">
                        <i className="bi bi-journal-bookmark-fill empty-state-icon"></i>
                    </div>
                    <h6 className="fw-bold text-dark mb-2">Nothing to show here yet</h6>
                    <p className="text-muted small mx-auto mb-4">Enroll in a course to start tracking modules and progress.</p>
                    <Link to="/courses" className="btn btn-primary btn-sm rounded-pill px-4 py-2 fw-medium mx-auto">
                        Browse Catalog
                        <i className="bi bi-search ms-1 small"></i>
                    </Link>
                </div>
            </div>
        <LegacyScript src="/legacy/js/progress.js" />
        </>
    );
}
