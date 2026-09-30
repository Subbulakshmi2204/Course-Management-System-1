import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";

export default function Home() {
    return (
        <>
            <PageCss href="/css/style.css" />
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-3">
                <div className="container">
                    <a className="navbar-brand fw-bold logo" href="#">
                        <i className="bi bi-mortarboard-fill me-2"></i>
                        CourseHub
                    </a>
                    <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <a className="nav-link active" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <Link to="/courses" className="nav-link">
                                    Courses
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Contact</a>
                            </li>
                        </ul>
                        <div className="d-flex gap-2 flex-wrap">
                            <div className="dropdown">
                                <a className="btn btn-outline-primary dropdown-toggle px-4" href="#" role="button" data-bs-toggle="dropdown">Login</a>
                                <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                                    <li>
                                        <Link to="/login" className="dropdown-item">
                                            <i className="bi bi-person me-2"></i>
                                            User Login
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin-login" className="dropdown-item">
                                            <i className="bi bi-shield-lock me-2"></i>
                                            Admin Login
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="dropdown">
                                <a className="btn btn-primary dropdown-toggle px-4" href="#" role="button" data-bs-toggle="dropdown">Register</a>
                                <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                                    <li>
                                        <Link to="/register" className="dropdown-item">
                                            <i className="bi bi-person-plus me-2"></i>
                                            User Register
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin-login" className="dropdown-item">
                                            <i className="bi bi-shield-lock me-2"></i>
                                            Admin Login
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <section className="hero-section d-flex align-items-center">
                <div className="bg-grid-overlay"></div>
                <div className="glow-circle-1"></div>
                <div className="glow-circle-2"></div>
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6 text-center text-lg-start">
                            <span className="badge bg-warning-soft text-warning px-3 py-2 rounded-pill fw-semibold mb-3">
                                <i className="bi bi-sparkles me-1"></i>
                                Smart Learning Platform
                            </span>
                            <h1 className="display-4 fw-bold mb-4 header-title text-white">
                                Learn Today,
                                <br />
                                <span className="text-gradient">Build Tomorrow.</span>
                            </h1>
                            <p className="lead text-white-50 mb-4 fs-5">Discover world-class quality courses, enroll effortlessly, and track your structured learning journey all inside one beautiful ecosystem.</p>
                            <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
                                <a href="#" className="btn btn-primary btn-lg px-4 shadow-sm">Explore Courses</a>
                                <Link to="/register" className="btn btn-light btn-lg px-4 shadow-sm border">
                                    Get Started
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-6 text-center position-relative">
                            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png" className="img-fluid hero-img position-relative" alt="Hero Image" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="stats-section py-5">
                <div className="container bg-white shadow rounded-4 p-4">
                    <div className="row text-center g-4">
                        <div className="col-6 col-md-3 border-end-md">
                            <h3 className="fw-bold text-primary mb-1">15k+</h3>
                            <p className="text-muted small mb-0">Active Students</p>
                        </div>
                        <div className="col-6 col-md-3 border-end-md">
                            <h3 className="fw-bold text-primary mb-1">250+</h3>
                            <p className="text-muted small mb-0">Total Courses</p>
                        </div>
                        <div className="col-6 col-md-3 border-end-md">
                            <h3 className="fw-bold text-primary mb-1">98%</h3>
                            <p className="text-muted small mb-0">Success Rate</p>
                        </div>
                        <div className="col-6 col-md-3">
                            <h3 className="fw-bold text-primary mb-1">50+</h3>
                            <p className="text-muted small mb-0">Expert Mentors</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-5 bg-light-section">
                <div className="container py-4">
                    <div className="text-center max-w-600 mb-5">
                        <h2 className="fw-bold mb-2">Why Choose Our Platform?</h2>
                        <p className="text-muted">An ecosystem built intentionally for modern, uninterrupted online education.</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-3">
                            <div className="feature-card h-100">
                                <div className="icon-box bg-primary-soft mb-4">
                                    <i className="bi bi-book-half text-primary"></i>
                                </div>
                                <h5 className="fw-bold mb-3">Browse Courses</h5>
                                <p className="text-muted small mb-0">Find seamlessly categorized courses across multiple technical domains.</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="feature-card h-100">
                                <div className="icon-box bg-success-soft mb-4">
                                    <i className="bi bi-person-plus text-success"></i>
                                </div>
                                <h5 className="fw-bold mb-3">Easy Registration</h5>
                                <p className="text-muted small mb-0">Hop in with instant student registration, verification, and dashboard configuration.</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="feature-card h-100">
                                <div className="icon-box bg-warning-soft mb-4">
                                    <i className="bi bi-bar-chart-line text-warning"></i>
                                </div>
                                <h5 className="fw-bold mb-3">Track Progress</h5>
                                <p className="text-muted small mb-0">Monitor your interactive completed modules and code checkpoints effortlessly.</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="feature-card h-100">
                                <div className="icon-box bg-info-soft mb-4">
                                    <i className="bi bi-award text-info"></i>
                                </div>
                                <h5 className="fw-bold mb-3">Certificates</h5>
                                <p className="text-muted small mb-0">Earn high-quality verification credentials shareable on LinkedIn networks.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="courses py-5">
                <div className="container py-4">
                    <div className="d-flex justify-content-between align-items-end mb-5 flex-wrap gap-3">
                        <div>
                            <h2 className="fw-bold mb-2">Explore Popular Courses</h2>
                            <p className="text-muted mb-0">Pick your weapon of choice and fast-track your technological growth.</p>
                        </div>
                        <Link to="/courses" className="btn btn-outline-primary px-4">
                            View All Courses
                            <i className="bi bi-arrow-right ms-1"></i>
                        </Link>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card h-100 shadow-sm border-0 overflow-hidden custom-card">
                                <div className="course-img-container">
                                    <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80" className="card-img-top course-img" alt="Python Programming" />
                                </div>
                                <div className="card-body p-4">
                                    <span className="badge bg-primary-soft text-primary mb-2">Development</span>
                                    <h5 className="fw-bold mb-2">Python Programming Masterclass</h5>
                                    <p className="text-muted small mb-4">Learn basics to building automation workflows and real-world scripting from scratch.</p>
                                    <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                                        <span className="text-muted small">
                                            <i className="bi bi-clock me-1"></i>
                                            12 Weeks
                                        </span>
                                        <button className="btn btn-sm btn-primary px-3">View Details</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 shadow-sm border-0 overflow-hidden custom-card">
                                <div className="course-img-container">
                                    <img src="https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=600&q=80" className="card-img-top course-img" alt="Full Stack Web Dev" />
                                </div>
                                <div className="card-body p-4">
                                    <span className="badge bg-success-soft text-success mb-2">Full Stack</span>
                                    <h5 className="fw-bold mb-2">Full Stack Web Development</h5>
                                    <p className="text-muted small mb-4">Master modern front-end layout styling, scalable backend architectures, and production databases.</p>
                                    <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                                        <span className="text-muted small">
                                            <i className="bi bi-clock me-1"></i>
                                            16 Weeks
                                        </span>
                                        <button className="btn btn-sm btn-primary px-3">View Details</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 shadow-sm border-0 overflow-hidden custom-card">
                                <div className="course-img-container">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6grLVXJ8urLdHBRlAgUfovtkNTQ75URfRQg&s" className="card-img-top course-img" alt="Artificial Intelligence" />
                                </div>
                                <div className="card-body p-4">
                                    <span className="badge bg-info-soft text-info mb-2">Data Science</span>
                                    <h5 className="fw-bold mb-2">Artificial Intelligence Foundations</h5>
                                    <p className="text-muted small mb-4">Deep dive into multi-layered Neural Networks, pattern modeling, and linear automation engines.</p>
                                    <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                                        <span className="text-muted small">
                                            <i className="bi bi-clock me-1"></i>
                                            10 Weeks
                                        </span>
                                        <button className="btn btn-sm btn-primary px-3">View Details</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 shadow-sm border-0 overflow-hidden custom-card">
                                <div className="course-img-container">
                                    <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80" className="card-img-top course-img" alt="Cyber Security" />
                                </div>
                                <div className="card-body p-4">
                                    <span className="badge bg-danger-soft text-danger mb-2">Security</span>
                                    <h5 className="fw-bold mb-2">Cyber Security & Ethical Hacking</h5>
                                    <p className="text-muted small mb-4">Understand digital architecture weaknesses, network defenses, and threat analysis frameworks.</p>
                                    <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                                        <span className="text-muted small">
                                            <i className="bi bi-clock me-1"></i>
                                            8 Weeks
                                        </span>
                                        <button className="btn btn-sm btn-primary px-3">View Details</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 shadow-sm border-0 overflow-hidden custom-card">
                                <div className="course-img-container">
                                    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80" className="card-img-top course-img" alt="Data Science" />
                                </div>
                                <div className="card-body p-4">
                                    <span className="badge bg-warning-soft text-warning mb-2">Analytics</span>
                                    <h5 className="fw-bold mb-2">Data Science & Analytics BootCamp</h5>
                                    <p className="text-muted small mb-4">Transform raw enterprise variables into interactive visual matrices using Pandas and Tableau.</p>
                                    <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                                        <span className="text-muted small">
                                            <i className="bi bi-clock me-1"></i>
                                            14 Weeks
                                        </span>
                                        <button className="btn btn-sm btn-primary px-3">View Details</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 shadow-sm border-0 overflow-hidden custom-card">
                                <div className="course-img-container">
                                    <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80" className="card-img-top course-img" alt="Mobile App Development" />
                                </div>
                                <div className="card-body p-4">
                                    <span className="badge bg-primary-soft text-primary mb-2">Mobile</span>
                                    <h5 className="fw-bold mb-2">Cross-Platform App Development</h5>
                                    <p className="text-muted small mb-4">Build industry-grade intuitive workflows natively deployment-ready for both iOS and Android stores.</p>
                                    <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                                        <span className="text-muted small">
                                            <i className="bi bi-clock me-1"></i>
                                            12 Weeks
                                        </span>
                                        <button className="btn btn-sm btn-primary px-3">View Details</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-6 bg-white border-top position-relative overflow-hidden">
                <div className="container py-5">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6 position-relative text-center text-lg-start">
                            <div className="about-img-wrapper">
                                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" className="img-fluid rounded-4 shadow-lg main-about-img" alt="Students collaborating online" />
                                <div className="about-floating-badge bg-primary text-white p-3 rounded-3 shadow d-none d-sm-flex align-items-center gap-3">
                                    <i className="bi bi-shield-check fs-2"></i>
                                    <div className="text-start">
                                        <p className="fw-bold mb-0 lh-1">Fully Verified</p>
                                        <small className="opacity-75">Academic Standards</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <span className="badge bg-primary-soft text-primary px-3 py-2 rounded-pill fw-semibold mb-3">
                                <i className="bi bi-info-circle-fill me-1"></i>
                                Who We Are
                            </span>
                            <h2 className="fw-bold display-6 mb-4">
                                A Smart Ecosystem Built For
                                <span className="text-gradient">Modern Learners</span>
                            </h2>
                            <p className="text-muted mb-4 lead fs-6">The Student Course Management System bridges the gap between ambitious students and industry-level education. We provide a fluid environment to discover paths, register instantly, and capture milestones.</p>
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <div className="d-flex align-items-start gap-3">
                                        <div className="mini-icon-box bg-success-soft text-success rounded-3 p-2">
                                            <i className="bi bi-lightning-charge-fill"></i>
                                        </div>
                                        <div>
                                            <h6 className="fw-bold mb-1">Instant Enrollment</h6>
                                            <p className="text-muted small mb-0">Skip the lines. Jump straight into sandbox coding environments.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="d-flex align-items-start gap-3">
                                        <div className="mini-icon-box bg-primary-soft text-primary rounded-3 p-2">
                                            <i className="bi bi-phone-vibrate-fill"></i>
                                        </div>
                                        <div>
                                            <h6 className="fw-bold mb-1">Responsive Access</h6>
                                            <p className="text-muted small mb-0">Learn on your desktop browser, tablet, or mobile phone fluidly.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="d-flex align-items-start gap-3">
                                        <div className="mini-icon-box bg-warning-soft text-warning rounded-3 p-2">
                                            <i className="bi bi-people-fill"></i>
                                        </div>
                                        <div>
                                            <h6 className="fw-bold mb-1">Expert Mentorship</h6>
                                            <p className="text-muted small mb-0">Direct support channels connected to domain professionals.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="d-flex align-items-start gap-3">
                                        <div className="mini-icon-box bg-info-soft text-info rounded-3 p-2">
                                            <i className="bi bi-graph-up-arrow"></i>
                                        </div>
                                        <div>
                                            <h6 className="fw-bold mb-1">Analytics Dashboard</h6>
                                            <p className="text-muted small mb-0">Real-time modular metric tracking for your progression.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="py-4">
                <div className="container text-center text-md-between d-md-flex align-items-center justify-content-between">
                    <p className="mb-2 mb-md-0 opacity-75">© 2026 Student Course Management System. All rights reserved.</p>
                    <div className="d-flex gap-3 justify-content-center">
                        <a href="#" className="text-white opacity-75 text-decoration-none small">Privacy Policy</a>
                        <a href="#" className="text-white opacity-75 text-decoration-none small">Terms of Service</a>
                    </div>
                </div>
            </footer>
        
        </>
    );
}
