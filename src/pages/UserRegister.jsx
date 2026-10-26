import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PageCss from "../components/PageCss";
import { registerStudent, loginStudent, getErrorMessage } from "../api/authApi";
import { saveSession, getRedirectUrl } from "../auth/session";
import { useAuth } from "../auth/AuthContext";

export default function UserRegister() {
    const { search } = useLocation();
    const { refresh } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        department: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [notice, setNotice] = useState(null);
    const [loading, setLoading] = useState(false);
    // null = still on the form, "signedIn" = account created and logged in,
    // "created" = account created but the automatic sign-in failed.
    const [success, setSuccess] = useState(null);
    const redirectTimer = useRef(null);

    const dashboardUrl = getRedirectUrl(search);

    useEffect(() => () => clearTimeout(redirectTimer.current), []);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((previous) => ({ ...previous, [name]: value }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setNotice(null);

        const name = formData.name.trim();
        const email = formData.email.trim();
        const department = formData.department.trim();
        const { password, confirmPassword } = formData;

        // Same rules as the backend, so students get instant feedback.
        let problem = null;
        if (!name) problem = "Name is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) problem = "Enter a valid email address.";
        else if (!department) problem = "Department is required.";
        else if (password.length < 8 || password.length > 72) problem = "Password must be between 8 and 72 characters.";
        else if (password !== confirmPassword) problem = "Passwords do not match.";

        if (problem) {
            setNotice({ type: "danger", content: problem });
            return;
        }

        setLoading(true);

        try {
            await registerStudent({ name, email, password, department });
        } catch (err) {
            if (err.response?.status === 409) {
                setNotice({
                    type: "warning",
                    content: (
                        <>
                            An account already exists for <strong>{email}</strong>.{" "}
                            <Link to={`/login${search}`} className="alert-link">Log in instead</Link>.
                        </>
                    ),
                });
            } else {
                setNotice({
                    type: "danger",
                    content: getErrorMessage(err, "Registration failed. Please try again."),
                });
            }
            setLoading(false);
            return;
        }

        // Account exists now. Sign the student straight in, as the site did before.
        try {
            const result = await loginStudent({ email, password });
            saveSession(result);
            refresh();
            setSuccess("signedIn");

            // Full page load so the dashboard's legacy scripts see the new session.
            redirectTimer.current = setTimeout(() => {
                window.location.href = dashboardUrl;
            }, 1200);
        } catch {
            setSuccess("created");
        } finally {
            setFormData((previous) => ({ ...previous, password: "", confirmPassword: "" }));
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
                            <div id="registerFormContainer" className={success ? "d-none" : undefined}>
                                <h2 className="fw-bold text-dark-blue">Create Student Account</h2>
                                <p className="text-muted mb-4">Sign up to start enrolling in courses.</p>
                                {notice && (
                                    <div id="registerAlert" className={`alert alert-${notice.type}`} role="alert">
                                        {notice.content}
                                    </div>
                                )}
                                <form id="registerForm" onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label fw-medium">Full Name</label>
                                        <div className="input-group custom-input-group">
                                            <span className="input-group-text bg-transparent">
                                                <i className="bi bi-person"></i>
                                            </span>
                                            <input type="text" id="nameInput" name="name" className="form-control" placeholder="Jane Doe" value={formData.name} onChange={handleChange} autoComplete="name" required />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-medium">Email Address</label>
                                        <div className="input-group custom-input-group">
                                            <span className="input-group-text bg-transparent">
                                                <i className="bi bi-envelope"></i>
                                            </span>
                                            <input type="email" id="emailInput" name="email" className="form-control" placeholder="you@example.com" value={formData.email} onChange={handleChange} autoComplete="email" required />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-medium">Department</label>
                                        <div className="input-group custom-input-group">
                                            <span className="input-group-text bg-transparent">
                                                <i className="bi bi-building"></i>
                                            </span>
                                            <input type="text" id="departmentInput" name="department" className="form-control" placeholder="Computer Science" value={formData.department} onChange={handleChange} required />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-medium">Password</label>
                                        <div className="input-group custom-input-group position-relative">
                                            <span className="input-group-text bg-transparent">
                                                <i className="bi bi-lock"></i>
                                            </span>
                                            <input type={showPassword ? "text" : "password"} id="regPassword" name="password" className="form-control pe-5" placeholder="Minimum 8 characters" minLength={8} maxLength={72} value={formData.password} onChange={handleChange} autoComplete="new-password" required />
                                            <button type="button" className="btn position-absolute end-0 top-50 translate-middle-y border-0 bg-transparent" onClick={() => setShowPassword((visible) => !visible)}>
                                                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} id="eyeIcon1"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label fw-medium">Confirm Password</label>
                                        <div className="input-group custom-input-group position-relative">
                                            <span className="input-group-text bg-transparent">
                                                <i className="bi bi-lock-fill"></i>
                                            </span>
                                            <input type={showConfirm ? "text" : "password"} id="confirmPassword" name="confirmPassword" className="form-control pe-5" placeholder="Repeat your password" maxLength={72} value={formData.confirmPassword} onChange={handleChange} autoComplete="new-password" required />
                                            <button type="button" className="btn position-absolute end-0 top-50 translate-middle-y border-0 bg-transparent" onClick={() => setShowConfirm((visible) => !visible)}>
                                                <i className={`bi ${showConfirm ? "bi-eye-slash" : "bi-eye"}`} id="eyeIcon2"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="form-check mb-4">
                                        <input className="form-check-input custom-checkbox" type="checkbox" id="terms" required />
                                        <label className="form-check-label text-muted small" htmlFor="terms">I agree to the Terms of Service and Privacy Policy.</label>
                                    </div>
                                    <button type="submit" disabled={loading} className="btn btn-primary w-100 btn-glow">{loading ? "Creating account..." : "Create Account"}</button>
                                </form>
                                <div className="text-center mt-4">
                                    <p className="mb-0">
                                        Already have an account?
                                        <Link to={`/login${search}`} id="loginLink" className="text-primary-gradient text-decoration-none">
                                            Sign In Here
                                        </Link>
                                    </p>
                                    <Link to="/" className="text-decoration-none hover-link">
                                        <i className="bi bi-arrow-left"></i>
                                        Back to Home
                                    </Link>
                                </div>
                            </div>
                            <div id="registerSuccessContainer" className={`${success ? "" : "d-none "}text-center`}>
                                <div className="alert alert-success d-flex align-items-center justify-content-center gap-2 mb-4" role="alert">
                                    <i className="bi bi-check-circle-fill"></i>
                                    {success === "created"
                                        ? "Account created! Please log in to continue."
                                        : "Account created! Welcome to CourseHub."}
                                </div>
                                {success === "created" ? (
                                    <Link to={`/login${search}`} id="goToDashboardBtn" className="btn btn-warning w-100 shadow-md fw-semibold py-3 d-flex align-items-center justify-content-center gap-2 btn-glow text-dark">
                                        <i className="bi bi-box-arrow-in-right"></i>
                                        Go to Login
                                        <i className="bi bi-arrow-right"></i>
                                    </Link>
                                ) : (
                                    <a href={dashboardUrl} id="goToDashboardBtn" className="btn btn-warning w-100 shadow-md fw-semibold py-3 d-flex align-items-center justify-content-center gap-2 btn-glow text-dark">
                                        <i className="bi bi-speedometer2"></i>
                                        Student Dashboard
                                        <i className="bi bi-arrow-right"></i>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}