import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";

export default function ResetPassword() {
    return (
        <>
            <PageCss href="/css/reset-password.css" />
            <div className="container-fluid p-0">
                <div className="row g-0 min-vh-100">
                    {/* Left Side */}
                    <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center branding-panel position-relative">
                        <div className="bg-grid-overlay"></div>
                        <div className="glow-circle-1"></div>
                        <div className="glow-circle-2"></div>
                        <div className="text-center text-white position-relative z-1">
                            <i className="bi bi-shield-lock-fill display-1 text-warning"></i>
                            <h1 className="fw-bold mt-4">Create a New Password</h1>
                            <p className="lead">Choose a strong password to keep your account secure.</p>
                        </div>
                    </div>
                    {/* Right Side */}
                    <div className="col-lg-6 d-flex justify-content-center align-items-center bg-light-panel">
                        <div className="reset-card bg-white rounded-4 shadow p-5">
                            <div className="text-center mb-4">
                                <i className="bi bi-key-fill login-icon"></i>
                                <h2 className="fw-bold mt-3">Reset Password</h2>
                                <p className="text-muted">Your new password must be different from your previous password.</p>
                            </div>
                            <form action="user-login.html" method="get">
                                <div className="mb-3">
                                    <label className="form-label">New Password</label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-lock"></i>
                                        </span>
                                        <input type="password" className="form-control" placeholder="Enter new password" minLength="6" required />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Confirm Password</label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-lock-fill"></i>
                                        </span>
                                        <input type="password" className="form-control" placeholder="Confirm password" minLength="6" required />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    <i className="bi bi-check-circle-fill me-2"></i>
                                    Reset Password
                                </button>
                            </form>
                            <div className="text-center mt-4">
                                <Link to="/login">
                                    <i className="bi bi-arrow-left"></i>
                                    Back to Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </>
    );
}
