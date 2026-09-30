import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function Certificate() {
    return (
        <>
            <PageCss href="/css/certificate.css" />
            <nav className="navbar navbar-expand-lg navbar-white bg-white border-bottom sticky-top py-3 no-print">
                <div className="container">
                    <Link to="/student-dashboard" className="navbar-brand navbar-brand-custom fs-4 d-flex align-items-center">
                        <i className="bi bi-mortarboard-fill me-2 text-warning"></i>
                        CourseHub
                    </Link>
                    <div className="d-flex align-items-center gap-3">
                        <Link to="/progress" className="text-decoration-none text-dark fw-medium small">
                            <i className="bi bi-arrow-left me-1"></i>
                            Back to Progress
                        </Link>
                    </div>
                </div>
            </nav>
            <div className="container my-5">
                {/* Locked state: shown when the course isn't finished yet */}
                <div id="lockedState" className="cert-stage d-none">
                    <div className="card border-0 rounded-4 shadow-sm p-5 text-center bg-white">
                        <i className="bi bi-lock-fill locked-icon mb-3"></i>
                        <h4 className="fw-bold text-dark mb-2">Certificate Not Unlocked Yet</h4>
                        <p className="text-muted mb-1" id="lockedCourseTitle"></p>
                        <div className="progress mx-auto my-3" style={{maxWidth: "360px", height: "10px"}}>
                            <div className="progress-bar bg-warning" id="lockedProgressBar" style={{width: "0%"}}></div>
                        </div>
                        <p className="text-muted small mb-4" id="lockedProgressText"></p>
                        <Link to="/progress" className="btn btn-primary rounded-pill px-4 mx-auto">
                            Complete Remaining Modules
                            <i className="bi bi-arrow-right ms-1"></i>
                        </Link>
                    </div>
                </div>
                {/* Not found / unauthorized state */}
                <div id="notFoundState" className="cert-stage d-none">
                    <div className="card border-0 rounded-4 shadow-sm p-5 text-center bg-white">
                        <i className="bi bi-exclamation-triangle locked-icon mb-3 text-danger"></i>
                        <h4 className="fw-bold text-dark mb-2">Certificate Not Found</h4>
                        <p className="text-muted mb-4">We couldn't find an enrollment matching this certificate link.</p>
                        <Link to="/student-dashboard" className="btn btn-primary rounded-pill px-4 mx-auto">
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
                {/* Certificate */}
                <div id="certState" className="d-none">
                    <div className="cert-stage">
                        <div className="certificate text-center">
                            <div className="cert-eyebrow mb-2">CourseHub • Certificate of Completion</div>
                            <div className="cert-seal mb-3">
                                <i className="bi bi-award-fill"></i>
                            </div>
                            <div className="cert-title">Certificate of Completion</div>
                            <p className="cert-subtext mt-2 mb-0">This is proudly presented to</p>
                            <div className="cert-name" id="certStudentName">—</div>
                            <p className="cert-subtext mb-0">for successfully completing all modules of</p>
                            <div className="cert-course mt-2" id="certCourseTitle">—</div>
                            <div className="cert-divider"></div>
                            <div className="row justify-content-center mt-4 gx-5">
                                <div className="col-auto text-center">
                                    <div className="cert-sign-line" id="certMentorName">—</div>
                                    <div className="cert-meta mt-1">Course Mentor</div>
                                </div>
                                <div className="col-auto text-center">
                                    <div className="cert-sign-line" id="certDate">—</div>
                                    <div className="cert-meta mt-1">Date Completed</div>
                                </div>
                            </div>
                            <p className="cert-meta mt-4 mb-0" id="certVerify"></p>
                        </div>
                        <div className="action-bar d-flex justify-content-center gap-2 no-print">
                            <button className="btn btn-primary rounded-pill px-4" onClick={() => window.eval("window.print()")}>
                                <i className="bi bi-printer-fill me-1"></i>
                                Print / Save as PDF
                            </button>
                            <Link to="/progress" className="btn btn-outline-secondary rounded-pill px-4">
                                <i className="bi bi-arrow-left me-1"></i>
                                Back to Progress
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        <LegacyScript src="/legacy/js/certificate.js" />
        </>
    );
}
