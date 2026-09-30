import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function AdminLogin() {
    return (
        <>
            <PageCss href="/css/admin-login.css" />
            <div className="container-fluid p-0">
                <div className="row g-0 min-vh-100">
                    <div className="col-lg-6 d-none d-lg-flex flex-column justify-content-between p-5 branding-panel position-relative">
                        <div className="bg-grid-overlay"></div>
                        <div className="glow-circle-1"></div>
                        <div className="glow-circle-2"></div>
                        <div className="position-relative z-1">
                            <Link to="/" className="navbar-brand fw-bold text-white fs-3 text-decoration-none">
                                <i className="bi bi-shield-lock-fill text-warning me-2"></i>
                                Admin Portal
                            </Link>
                        </div>
                        <div className="my-auto position-relative z-1 text-white max-w-500 content-fade-in">
                            <span className="badge bg-white-10 border border-white-10 rounded-pill px-3 py-2 mb-3">
                                <i className="bi bi-shield-lock-fill text-warning me-2"></i>
                                Administrator Access
                            </span>
                            <h1 className="display-5 fw-bold mb-3">
                                Manage Courses.
                                <br />
                                Monitor Students.
                            </h1>
                            <p className="lead fs-6 opacity-75">Securely access the administrator dashboard to manage students, courses, enrollments, reports and overall learning activities.</p>
                            <div className="mt-5 d-flex flex-column gap-3">
                                <div className="frosted-glass-card p-3 rounded-4 border border-white-10 d-flex align-items-center gap-3 feature-item">
                                    <div className="metric-icon-circle bg-white-20 rounded-circle d-flex align-items-center justify-content-center text-warning">
                                        <i className="bi bi-person-lock"></i>
                                    </div>
                                    <div>
                                        <p className="mb-0 fw-semibold text-white">Secure Admin Authentication</p>
                                        <small className="text-white-50">Encrypted administrator login system.</small>
                                    </div>
                                </div>
                                <div className="frosted-glass-card p-3 rounded-4 border border-white-10 d-flex align-items-center gap-3 feature-item">
                                    <div className="metric-icon-circle bg-white-20 rounded-circle d-flex align-items-center justify-content-center text-info">
                                        <i className="bi bi-kanban"></i>
                                    </div>
                                    <div>
                                        <p className="mb-0 fw-semibold text-white">Complete Management</p>
                                        <small className="text-white-50">Manage students, courses and reports.</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="position-relative z-1 text-white-50 small border-top border-white-10 pt-3">© 2026 CourseHub Admin Portal</div>
                    </div>
                    <div className="col-lg-6 d-flex align-items-center justify-content-center bg-light-panel p-4">
                        <div className="login-card-right bg-white rounded-4 shadow p-5 content-fade-in">
                            <div className="d-lg-none text-center mb-4">
                                <h3 className="fw-bold text-primary">
                                    <i className="bi bi-shield-lock-fill text-warning me-2"></i>
                                    Admin Portal
                                </h3>
                            </div>
                            <h2 className="fw-bold text-dark-blue">Administrator Login</h2>
                            <p className="text-muted mb-4">Sign in with your administrator credentials.</p>
                            <div className="alert alert-danger d-none" id="errorBanner">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                Invalid administrator email or password.
                            </div>
                            <form id="adminLoginForm">
                                <div className="mb-3">
                                    <label className="form-label fw-medium">Administrator Email</label>
                                    <div className="input-group custom-input-group">
                                        <span className="input-group-text bg-transparent">
                                            <i className="bi bi-envelope"></i>
                                        </span>
                                        <input type="email" id="emailInput" className="form-control" placeholder="admin@coursehub.com" required />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-medium">Password</label>
                                    <div className="input-group custom-input-group position-relative">
                                        <span className="input-group-text bg-transparent">
                                            <i className="bi bi-lock"></i>
                                        </span>
                                        <input type="password" id="passwordInput" className="form-control pe-5" placeholder="••••••••" required />
                                        <button type="button" className="btn position-absolute end-0 top-50 translate-middle-y border-0 bg-transparent" onClick={() => window.eval("togglePassword()")}>
                                            <i className="bi bi-eye" id="eyeIcon"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="form-check mb-4">
                                    <input className="form-check-input custom-checkbox" type="checkbox" id="remember" />
                                    <label className="form-check-label" htmlFor="remember">Remember this administrator</label>
                                </div>
                                <button type="submit" className="btn btn-primary w-100 btn-glow">Login to Admin Dashboard</button>
                            </form>
                            <div className="text-center mt-4">
                                <p>
                                    New Administrator?
                                    <Link to="/admin-login" className="text-primary-gradient text-decoration-none">
                                        Sign In Here
                                    </Link>
                                </p>
                                <Link to="/" className="text-decoration-none hover-link">
                                    <i className="bi bi-arrow-left"></i>
                                    Back to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <LegacyScript src="/legacy/js/admin-login.js" />
        </>
    );
}
