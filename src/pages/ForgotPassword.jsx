import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";

export default function ForgotPassword() {
    return (
        <>
            <PageCss href="/css/forgot-password.css" />
            <div className="container-fluid p-0">
                <div className="row g-0 min-vh-100">
                    {/* Left Panel */}
                    <div className="col-lg-6 d-none d-lg-flex flex-column justify-content-center align-items-center branding-panel position-relative">
                        <div className="bg-grid-overlay"></div>
                        <div className="glow-circle-1"></div>
                        <div className="glow-circle-2"></div>
                        <div className="text-center text-white position-relative z-1 px-5">
                            <i className="bi bi-key-fill display-1 text-warning"></i>
                            <h1 className="fw-bold mt-4">Reset Your Password</h1>
                            <p className="lead text-white-50">Don't worry! Enter your registered email address and we'll send you a password reset link.</p>
                        </div>
                    </div>
                    {/* Right Panel */}
                    <div className="col-lg-6 d-flex align-items-center justify-content-center bg-light-panel p-4">
                        <div className="forgot-card shadow rounded-4 bg-white p-5">
                            <div className="text-center mb-4">
                                <i className="bi bi-envelope-lock-fill login-icon"></i>
                                <h2 className="fw-bold mt-3">Forgot Password</h2>
                                <p className="text-muted">Enter your email to receive a reset link.</p>
                            </div>
                            <form action="reset-password.html" method="get">
                                <div className="mb-4">
                                    <label className="form-label fw-medium">Email Address</label>
                                    <div className="input-group custom-input-group">
                                        <span className="input-group-text bg-transparent text-muted">
                                            <i className="bi bi-envelope"></i>
                                        </span>
                                        <input type="email" name="email" className="form-control ps-0" placeholder="name@example.com" required />
                                    </div>
                                </div>
                                {/* Updated Button */}
                                <button type="submit" className="btn btn-primary w-100 btn-glow fw-semibold">
                                    <i className="bi bi-send-fill me-2"></i>
                                    Send Reset Link
                                </button>
                            </form>
                            <div className="text-center mt-4">
                                <Link to="/login" className="text-decoration-none small">
                                    <i className="bi bi-arrow-left me-1"></i>
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
