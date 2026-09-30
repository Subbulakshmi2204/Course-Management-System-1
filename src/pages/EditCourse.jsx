import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function EditCourse() {
    return (
        <>
            <PageCss href="/css/edit-course.css" />
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
                <div className="container">
                    <Link to="/" className="navbar-brand fw-bold">
                        <i className="bi bi-shield-lock-fill text-warning me-2"></i>
                        Admin Dashboard
                    </Link>
                    <div className="d-flex align-items-center gap-3">
                        <span className="text-muted d-none d-sm-inline small">
                            <i className="bi bi-person-circle me-1"></i>
                            Admin Session
                        </span>
                        <Link to="/" className="btn btn-outline-danger btn-sm px-3 rounded-pill">
                            Logout
                        </Link>
                    </div>
                </div>
            </nav>
            <div className="container px-4">
                <div className="edit-container">
                    <div className="mb-4">
                        <Link to="/courses" className="text-decoration-none text-muted small">
                            <i className="bi bi-arrow-left me-1"></i>
                            Back to Courses Selection
                        </Link>
                        <h2 className="fw-bold text-dark mt-2" id="pageTitle">Modify Track Content</h2>
                        <p className="text-muted mb-0">
                            Target ID Parameter Scope:
                            <span className="badge bg-secondary" id="idBadge">all</span>
                        </p>
                    </div>
                    <div className="card custom-card shadow-sm p-4 p-md-5">
                        <form id="editCourseForm">
                            <div className="row g-4">
                                <div className="col-md-8">
                                    <div className="mb-3">
                                        <label className="form-label">Course Title</label>
                                        <input type="text" className="form-control" id="courseTitleInput" required placeholder="Enter primary track title structure" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Categorization Tag</label>
                                        <select className="form-select" id="courseCategorySelect" required>
                                            <option value="web">Web Architecture & Engineering</option>
                                            <option value="ai">Artificial Intelligence Foundations</option>
                                            <option value="ml">Machine Learning Systems</option>
                                            <option value="security">Cyber Security Frameworks</option>
                                            <option value="analytics">Enterprise Data Analytics</option>
                                            <option value="mobile">Mobile Logic Platforms</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Graphic Cover Asset</label>
                                    <div className="preview-box">
                                        <img src className="preview-img" id="coverPreview" alt="Asset Validation Frame" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Course Duration</label>
                                        <input type="text" className="form-control" id="courseDurationInput" required placeholder="e.g., 8 weeks, 3 months" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Mentor Name</label>
                                        <input type="text" className="form-control" id="courseMentorInput" required placeholder="Enter lead instructor name" />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="mb-3">
                                        <label className="form-label">Source URL Pathway for Cover Image</label>
                                        <input type="url" className="form-control" id="courseImgUrlInput" placeholder="https://domain.com/asset-pathway.png" />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="mb-4">
                                        <label className="form-label">Subtext / Track Description Metadata</label>
                                        <textarea className="form-control" id="courseDescTextarea" rows="4" required placeholder="Outline module parameters, operational tracks, or prerequisite conditions targeted during initialization." defaultValue="" />
                                    </div>
                                </div>
                                <div className="col-12 border-top pt-4 d-flex justify-content-end gap-2">
                                    <Link to="/courses" className="btn btn-light px-4 py-2 border rounded-3">
                                        Cancel
                                    </Link>
                                    <button type="submit" className="btn btn-primary px-5 py-2 rounded-3">Save Parameter Matrix</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <footer>
                <div className="container text-center">
                    <p className="mb-0 opacity-75 small">© 2026 Student Course Management System. Secure Administrative Gateway.</p>
                </div>
            </footer>
        <LegacyScript src="/legacy/js/edit-course.js" />
        </>
    );
}
