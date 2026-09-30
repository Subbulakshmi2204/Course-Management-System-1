import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function UserRegister() {
    return (
        <>
            <PageCss href="/css/login.css" />
            <div className="container-fluid p-0">
                <div className="row g-0 min-vh-100">
                    <div className="col-lg-6 d-none d-lg-flex flex-column justify-content-between p-5 branding-panel position-relative">
                        <div className="bg-grid-overlay"></div>
                        <div className="glow-circle-1"></div>
                        <div className="glow-circle-2"></div>
                        <div className="position-relative z-1">
                            <Link to="/" className="navbar-brand fw-bold text-white fs-3 d-flex align-items-center">
                                <i className="bi bi-mortarboard-fill me-2 text-warning"></i>
                                CourseHub
                            </Link>
                        </div>
                        <div className="my-auto position-relative z-1 text-white max-w-500 content-fade-in">
                            <span className="badge bg-white-10 border border-white-10 rounded-pill px-3 py-2 mb-3">
                                <i className="bi bi-person-plus-fill text-info me-2"></i>
                                New Student
                            </span>
                            <h1 className="display-5 fw-bold mb-3">
                                Start Learning
                                <br />
                                Today.
                            </h1>
                            <p className="lead fs-6 opacity-75">Create your student account to enroll in courses, track module progress, and earn certificates as you complete each track.</p>
                            <div className="mt-5 d-flex flex-column gap-3">
                                <div className="frosted-glass-card p-3 rounded-4 border border-white-10 d-flex align-items-center gap-3 feature-item">
                                    <div className="metric-icon-circle bg-white-20 rounded-circle d-flex align-items-center justify-content-center text-success">
                                        <i className="bi bi-mortarboard-fill"></i>
                                    </div>
                                    <div>
                                        <p className="mb-0 fw-semibold text-white">Learn at your own pace</p>
                                        <small className="text-white-50">Progress saves automatically as you go.</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="position-relative z-1 text-white-50 small border-top border-white-10 pt-3">© 2026 CourseHub Ecosystem</div>
                    </div>
                    <div className="col-lg-6 d-flex align-items-center justify-content-center bg-light-panel p-4">
                        <div className="login-card-right bg-white rounded-4 shadow p-5 content-fade-in">
                            <div className="d-lg-none text-center mb-4">
                                <h3 className="fw-bold text-primary">
                                    <i className="bi bi-mortarboard-fill text-warning me-2"></i>
                                    CourseHub
                                </h3>
                            </div>
                            <div id="registerFormContainer">
                                <h2 className="fw-bold text-dark-blue">Create Student Account</h2>
                                <p className="text-muted mb-4">Sign up to start enrolling in courses.</p>
                                <div id="registerAlert" className="alert d-none" role="alert"></div>
                                <form id="registerForm">
                                    <div className="mb-3">
                                        <label className="form-label fw-medium">Full Name</label>
                                        <div className="input-group custom-input-group">
                                            <span className="input-group-text bg-transparent">
                                                <i className="bi bi-person"></i>
                                            </span>
                                            <input type="text" id="nameInput" className="form-control" placeholder="Jane Doe" required />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-medium">Email Address</label>
                                        <div className="input-group custom-input-group">
                                            <span className="input-group-text bg-transparent">
                                                <i className="bi bi-envelope"></i>
                                            </span>
                                            <input type="email" id="emailInput" className="form-control" placeholder="you@example.com" required />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-medium">Password</label>
                                        <div className="input-group custom-input-group position-relative">
                                            <span className="input-group-text bg-transparent">
                                                <i className="bi bi-lock"></i>
                                            </span>
                                            <input type="password" id="regPassword" className="form-control pe-5" placeholder="Minimum 8 characters" minLength="8" required />
                                            <button type="button" className="btn position-absolute end-0 top-50 translate-middle-y border-0 bg-transparent" onClick={() => window.eval("toggleRegPassword('regPassword', 'eyeIcon1')")}>
                                                <i className="bi bi-eye" id="eyeIcon1"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label fw-medium">Confirm Password</label>
                                        <div className="input-group custom-input-group position-relative">
                                            <span className="input-group-text bg-transparent">
                                                <i className="bi bi-lock-fill"></i>
                                            </span>
                                            <input type="password" id="confirmPassword" className="form-control pe-5" placeholder="Repeat your password" required />
                                            <button type="button" className="btn position-absolute end-0 top-50 translate-middle-y border-0 bg-transparent" onClick={() => window.eval("toggleRegPassword('confirmPassword', 'eyeIcon2')")}>
                                                <i className="bi bi-eye" id="eyeIcon2"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="form-check mb-4">
                                        <input className="form-check-input custom-checkbox" type="checkbox" id="terms" required />
                                        <label className="form-check-label text-muted small" htmlFor="terms">I agree to the Terms of Service and Privacy Policy.</label>
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100 btn-glow">Create Account</button>
                                </form>
                                <div className="text-center mt-4">
                                    <p className="mb-0">
                                        Already have an account?
                                        <Link to="/login" id="loginLink" className="text-primary-gradient text-decoration-none">
                                            Sign In Here
                                        </Link>
                                    </p>
                                    <Link to="/" className="text-decoration-none hover-link">
                                        <i className="bi bi-arrow-left"></i>
                                        Back to Home
                                    </Link>
                                </div>
                            </div>
                            <div id="registerSuccessContainer" className="d-none text-center">
                                <div className="alert alert-success d-flex align-items-center justify-content-center gap-2 mb-4" role="alert">
                                    <i className="bi bi-check-circle-fill"></i>
                                    Account created! Welcome to CourseHub.
                                </div>
                                <Link to="/student-dashboard" id="goToDashboardBtn" className="btn btn-warning w-100 shadow-md fw-semibold py-3 d-flex align-items-center justify-content-center gap-2 btn-glow text-dark">
                                    <i className="bi bi-speedometer2"></i>
                                    Student Dashboard
                                    <i className="bi bi-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <LegacyScript src="/legacy/js/register.js" />
        </>
    );
}
