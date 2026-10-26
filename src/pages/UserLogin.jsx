import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PageCss from "../components/PageCss";
import { loginStudent, getErrorMessage } from "../api/authApi";
import { saveSession, getRedirectUrl } from "../auth/session";
import { useAuth } from "../auth/AuthContext";

export default function UserLogin() {
    const { search } = useLocation();
    const { refresh } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [notice, setNotice] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const redirectTimer = useRef(null);

    const dashboardUrl = getRedirectUrl(search);

    useEffect(() => () => clearTimeout(redirectTimer.current), []);

    async function handleSubmit(event) {
        event.preventDefault();
        setNotice(null);

        if (!email.trim() || !password) {
            setNotice({ type: "danger", text: "Please enter a valid email and password." });
            return;
        }

        setLoading(true);

        try {
            const result = await loginStudent({ email: email.trim(), password });

            // Saves the JWT (sessionStorage) and the session the rest of the app reads.
            saveSession(result);
            refresh();

            setPassword("");
            setLoggedIn(true);

            // Full page load (not a client-side route change) so the dashboard's
            // legacy scripts start fresh and pick up the new session.
            redirectTimer.current = setTimeout(() => {
                window.location.href = dashboardUrl;
            }, 1200);
        } catch (err) {
            setNotice({
                type: "danger",
                text: getErrorMessage(err, "Login failed. Please try again."),
                showRegisterLink: err.response?.status === 401,
            });
        } finally {
            setLoading(false);
        }
    }

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
                            <Link to="/" className="navbar-brand fw-bold text-white fs-3 d-flex align-items-center logo-premium">
                                <i className="bi bi-mortarboard-fill me-2 text-warning"></i>
                                CourseHub
                            </Link>
                        </div>
                        <div className="my-auto position-relative z-1 text-white max-w-500 content-fade-in">
                            <span className="badge bg-white-10 text-white rounded-pill px-3 py-1.5 small fw-medium mb-3 border border-white-10">
                                <i className="bi bi-rocket-takeoff-fill text-warning me-1"></i>
                                Version 2.0 Live
                            </span>
                            <h1 className="display-5 fw-bold mb-3 tracking-tight">
                                Turn Ambition Into
                                <span className="text-warning">Achievements.</span>
                            </h1>
                            <p className="lead opacity-80 fs-6 lh-relaxed">Log back into your personalized educational cockpit to resume curated lectures, track sandbox evaluations, and earn digital certificates.</p>
                            <div className="feature-stack mt-5 d-flex flex-column gap-3">
                                <div className="frosted-glass-card p-3 rounded-4 border border-white-10 shadow-lg d-flex align-items-center gap-3 feature-item">
                                    <div className="metric-icon-circle bg-white-20 text-warning rounded-circle d-flex align-items-center justify-content-center">
                                        <i className="bi bi-shield-check-fill"></i>
                                    </div>
                                    <div>
                                        <p className="mb-0 fw-semibold small text-white">Secure Authentication Enabled</p>
                                        <small className="text-white-50 xs-text">End-to-end encrypted session pipelines standard.</small>
                                    </div>
                                </div>
                                <div className="frosted-glass-card p-3 rounded-4 border border-white-10 shadow-lg d-flex align-items-center gap-3 feature-item">
                                    <div className="metric-icon-circle bg-white-20 text-info rounded-circle d-flex align-items-center justify-content-center">
                                        <i className="bi bi-patch-check-fill"></i>
                                    </div>
                                    <div>
                                        <p className="mb-0 fw-semibold small text-white">LMS Smart Sync Active</p>
                                        <small className="text-white-50 xs-text">Your progress saves automatically across all linked devices.</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="position-relative z-1 text-white-50 small d-flex justify-content-between align-items-center border-top border-white-10 pt-3">
                            <span>© 2026 CourseHub Ecosystem.</span>
                            <div className="d-flex gap-3">
                                <a href="#" className="text-white-50 text-decoration-none hover-white">Status</a>
                                <a href="#" className="text-white-50 text-decoration-none hover-white">Support</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 d-flex align-items-center justify-content-center bg-light-panel p-4 p-sm-5">
                        <div className="login-card-right shadow-xl bg-white p-4 p-sm-5 rounded-4 content-fade-in" id="authWorkspace">
                            <div className="d-lg-none text-center mb-4">
                                <Link to="/" className="fw-bold text-primary fs-3 text-decoration-none d-inline-flex align-items-center">
                                    <i className="bi bi-mortarboard-fill me-2 text-warning"></i>
                                    CourseHub
                                </Link>
                            </div>
                            <div className="text-center text-lg-start mb-4">
                                <h2 className="fw-bold text-dark-blue mb-1" id="loginHeader">{loggedIn ? "Session Initialized" : "Welcome Back"}</h2>
                                <p className="text-muted small" id="loginSubheader">{loggedIn ? "Your digital student profile is verified." : "Please verify your digital student credentials below."}</p>
                            </div>
                            <div id="dashboardContainer" className={`${loggedIn ? "" : "d-none "}text-center`}>
                                <div className="alert alert-success d-flex align-items-center justify-content-center gap-2 mb-4" role="alert">
                                    <i className="bi bi-check-circle-fill"></i>
                                    Login Successful! Welcome back.
                                </div>
                                <a href={dashboardUrl} id="goToDashboardBtn" className="btn btn-warning w-100 shadow-md fw-semibold py-3 d-flex align-items-center justify-content-center gap-2 btn-glow text-dark">
                                    <i className="bi bi-speedometer2"></i>
                                    Student Dashboard
                                    <i className="bi bi-arrow-right"></i>
                                </a>
                            </div>
                            <div id="loginFormContainer" className={loggedIn ? "d-none" : undefined}>
                                {notice && (
                                    <div id="loginAlert" className={`alert alert-${notice.type}`} role="alert">
                                        {notice.text}
                                        {notice.showRegisterLink && (
                                            <>
                                                {" "}
                                                <Link to={`/register${search}`} className="alert-link">Create an account</Link>
                                                {" "}if you don't have one yet.
                                            </>
                                        )}
                                    </div>
                                )}
                                <div className="row g-2 mb-4">
                                    <div className="col-6">
                                        <button className="btn btn-social w-100 d-inline-flex align-items-center justify-content-center gap-2">
                                            <i className="bi bi-google text-danger"></i>
                                            <span className="small fw-medium">Google</span>
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <button className="btn btn-social w-100 d-inline-flex align-items-center justify-content-center gap-2">
                                            <i className="bi bi-github text-dark"></i>
                                            <span className="small fw-medium">Github</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="position-relative d-flex align-items-center justify-content-center my-4 divider-wrapper">
                                    <span className="bg-white px-3 text-muted small position-relative z-1">Or sign in with email</span>
                                    <div className="w-100 position-absolute border-top border-gray-200"></div>
                                </div>
                                <form id="loginForm" onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label text-dark-blue fw-medium small">Email Address</label>
                                        <div className="input-group custom-input-group">
                                            <span className="input-group-text bg-transparent border-end-0 text-muted">
                                                <i className="bi bi-envelope"></i>
                                            </span>
                                            <input type="email" id="emailInput" className="form-control border-start-0 ps-0" placeholder="name@example.com" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between align-items-center mb-1">
                                            <label className="form-label text-dark-blue fw-medium small mb-0">Password</label>
                                            <Link to="/forgot-password" className="forgot-link small">
                                                Forgot Password?
                                            </Link>
                                        </div>
                                        <div className="input-group custom-input-group position-relative">
                                            <span className="input-group-text bg-transparent border-end-0 text-muted">
                                                <i className="bi bi-lock"></i>
                                            </span>
                                            <input type={showPassword ? "text" : "password"} id="passwordInput" className="form-control border-start-0 ps-0 pe-5" placeholder="••••••••" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" maxLength={72} required />
                                            <button type="button" className="btn position-absolute end-0 top-50 translate-middle-y text-muted border-0 bg-transparent z-3" onClick={() => setShowPassword((visible) => !visible)}>
                                                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} id="passwordToggleIcon"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="form-check mb-4 text-start d-flex align-items-center gap-2">
                                        <input className="form-check-input mt-0 custom-checkbox" type="checkbox" id="rememberMe" />
                                        <label className="form-check-label text-muted small select-none" htmlFor="rememberMe">Keep me signed in on this device</label>
                                    </div>
                                    <button type="submit" disabled={loading} className="btn btn-primary w-100 shadow-md fw-semibold mb-3 d-flex align-items-center justify-content-center gap-2 btn-glow">
                                        {loading ? "Signing in..." : "Sign In to Dashboard"}
                                        <i className="bi bi-arrow-right"></i>
                                    </button>
                                </form>
                                <div className="text-center mt-4">
                                    <p className="text-muted small mb-3">
                                        Don't have an account yet?
                                        <Link to={`/register${search}`} id="createAccountLink" className="fw-semibold text-decoration-none text-primary-gradient">
                                            Create an Account
                                        </Link>
                                    </p>
                                    <Link to="/" className="text-secondary small text-decoration-none d-inline-flex align-items-center gap-1 hover-link">
                                        <i className="bi bi-arrow-left"></i>
                                        Return to Homepage
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}