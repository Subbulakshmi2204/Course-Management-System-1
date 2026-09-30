import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

const FILTERS = [
    { key: "all", label: "All" },
    { key: "ai", label: "AI" },
    { key: "ml", label: "ML" },
    { key: "web", label: "Web" },
    { key: "security", label: "Security" },
    { key: "analytics", label: "Analytics" },
    { key: "mobile", label: "Mobile" },
];

const COURSES = [
    { id: "python-masterclass", category: "web", badge: "Development", badgeClass: "primary", title: "Python Programming Masterclass", description: "Learn basics to building automation workflows and real-world scripting from scratch.", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80", alt: "Python Masterclass" },
    { id: "fullstack-dev", category: "web", badge: "Full Stack", badgeClass: "success", title: "Full Stack Web Development", description: "Master modern front-end layout styling, scalable backend architectures, and production databases.", image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=600&q=80", alt: "Full Stack Dev" },
    { id: "ai-foundations", category: "ai", badge: "Data Science", badgeClass: "info", title: "Artificial Intelligence Foundations", description: "Deep dive into multi-layered Neural Networks, pattern modeling, and linear automation engines.", image: "https://lirp.cdn-website.com/de11e97c/dms3rep/multi/opt/AI+FOUNDATIONS-640w.png", alt: "AI Foundations" },
    { id: "gen-ai", category: "ai", badge: "Generative AI", badgeClass: "info", title: "Generative AI & Large Language Models", description: "Explore transformers architectures, structural fine-tuning parameters, prompt workflows, and context window logic.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ-HU7vvPiM9SBgEhJCRi48tQbm7P-bLf4Yr15IJkEuI0ugjDK8GiNi_E&s=10", alt: "Generative AI & LLMs" },
    { id: "cyber-security", category: "security", badge: "Security", badgeClass: "danger", title: "Cyber Security & Ethical Hacking", description: "Understand digital architecture weaknesses, network defenses, and threat analysis frameworks.", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80", alt: "Cyber Security" },
    { id: "data-analytics", category: "analytics", badge: "Analytics", badgeClass: "warning", title: "Data Science & Analytics BootCamp", description: "Transform raw enterprise variables into interactive visual matrices using Pandas and Tableau.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80", alt: "Data Analytics" },
    { id: "cross-platform-mobile", category: "mobile", badge: "Mobile", badgeClass: "primary", title: "Cross-Platform App Development", description: "Build industry-grade intuitive workflows natively deployment-ready for iOS and Android stores.", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80", alt: "Mobile Development" },
    { id: "advanced-mobile", category: "mobile", badge: "Mobile", badgeClass: "primary", title: "Advanced iOS & Android Architecture", description: "Optimize device performance matrix using asynchronous operations, lifecycle models, and reactive structures.", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80", alt: "Mobile Development Native" },
    { id: "reinforcement-learning", category: "ai", badge: "Artificial Intelligence", badgeClass: "info", title: "Deep Reinforcement Learning", description: "Master decision-making agents using Q-learning, policy gradients, and algorithmic actors.", image: "https://bs-uploads.toptal.io/blackfish-uploads/components/open_graph_image/8958314/og_image/optimized/deep-dive-into-reinforcement-learning-2393e08aa800a4247f6066eee9ba0e8d.png", alt: "Advanced AI" },
    { id: "nlp", category: "ml", badge: "Machine Learning", badgeClass: "warning", title: "Natural Language Processing", description: "Construct parsing tokenizers, sequence generation loops, and transformer translation layers.", image: "https://miro.medium.com/1*tjyq7DrWkcK_rgym6YJ1Pw.png", alt: "Machine Learning NLP" },
    { id: "mlops", category: "ml", badge: "Machine Learning", badgeClass: "warning", title: "Predictive Analytics & ML Ops", description: "Implement automation orchestration frameworks, continuous calibration steps, and pipeline monitoring tracking.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80", alt: "Predictive Analytics" },
    { id: "devops", category: "web", badge: "DevOps", badgeClass: "success", title: "Cloud Native DevOps Engine", description: "Deploy production networks using micro-container clusters, orchestration logs, and pipelines.", image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=600&q=80", alt: "Cloud Architectures" },
];

export default function Courses() {
    // courses.js exposes these on window (filterCategory, handleEnrollment, ...)
    const call = (fn, ...args) => window[fn] && window[fn](...args);

    return (
        <>
            <PageCss href="/css/courses.css" />

            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-3">
                <div className="container">
                    <Link to="/" className="navbar-brand fw-bold logo">
                        <i className="bi bi-mortarboard-fill me-2"></i>
                        CourseHub
                    </Link>
                    <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                            <li className="nav-item"><a className="nav-link active" href="#">Courses</a></li>
                            <li className="nav-item"><a className="nav-link" href="#">About</a></li>
                            <li className="nav-item"><a className="nav-link" href="#">Contact</a></li>
                        </ul>
                        <div className="d-flex gap-2 flex-wrap" id="navAuthArea">
                            <div className="dropdown">
                                <a className="btn btn-outline-primary dropdown-toggle px-4" href="#" role="button" data-bs-toggle="dropdown">Login</a>
                                <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                                    <li><Link to="/login" className="dropdown-item"><i className="bi bi-person me-2"></i>User Login</Link></li>
                                    <li><Link to="/admin-login" className="dropdown-item"><i className="bi bi-shield-lock me-2"></i>Admin Login</Link></li>
                                </ul>
                            </div>
                            <div className="dropdown">
                                <a className="btn btn-primary dropdown-toggle px-4" href="#" role="button" data-bs-toggle="dropdown">Register</a>
                                <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                                    <li><Link to="/register" className="dropdown-item"><i className="bi bi-person-plus me-2"></i>User Register</Link></li>
                                    <li><Link to="/admin-login" className="dropdown-item"><i className="bi bi-shield-lock me-2"></i>Admin Login</Link></li>
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
                    <h1 className="display-5 fw-bold text-white mb-2">Explore Specialized Tracks</h1>
                    <p className="text-white-50 lead fs-6">Filter through global computational sectors and start working on modular tracks.</p>
                </div>
            </section>

            <div className="container py-5">
                <div className="d-flex justify-content-center gap-2 flex-wrap mb-5" id="filter-container">
                    {FILTERS.map((f, i) => (
                        <button
                            key={f.key}
                            className={`btn ${i === 0 ? "btn-primary" : "btn-outline-primary"} filter-btn px-4`}
                            onClick={(e) => call("filterCategory", f.key, e.currentTarget)}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                <div className="row g-4" id="coursesGridContainer">
                    {COURSES.map((c) => (
                        <div key={c.id} className={`col-md-4 course-card-wrapper ${c.category}`}>
                            <div className="card h-100 shadow-sm border-0 custom-card">
                                <div className="course-img-container">
                                    <img src={c.image} className="course-img" alt={c.alt} />
                                </div>
                                <div className="card-body p-4">
                                    <span className={`badge bg-${c.badgeClass}-soft text-${c.badgeClass} mb-2`}>{c.badge}</span>
                                    <h5 className="fw-bold mb-2">{c.title}</h5>
                                    <p className="text-muted small mb-4">{c.description}</p>
                                    <div className="row g-2 pt-3 border-top">
                                        <div className="col-12">
                                            <button className="btn btn-primary w-100 btn-sm py-2" onClick={() => call("handleEnrollment", c.id)}>
                                                Enroll
                                            </button>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-outline-secondary w-100 btn-sm py-2" onClick={() => call("openAdminAuthModal", c.id)}>
                                                <i className="bi bi-pencil-square me-1"></i>
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="modal fade" id="adminAuthModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow">
                        <div className="modal-header border-0 pb-0">
                            <h5 className="fw-bold mb-0">Admin Verification</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-4">
                            <form id="adminAuthForm" onSubmit={(e) => call("submitAdminAuth", e)}>
                                <input type="hidden" id="targetCourseId" />
                                <div className="mb-3">
                                    <label htmlFor="adminEmailField" className="form-label small fw-medium text-secondary">Email address</label>
                                    <input type="email" className="form-control py-2" id="adminEmailField" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="adminPasswordField" className="form-label small fw-medium text-secondary">Password</label>
                                    <input type="password" className="form-control py-2" id="adminPasswordField" required />
                                </div>
                                <button type="submit" className="btn btn-primary w-100 py-2 fw-medium">Verify & Edit Course</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <footer>
                <div className="container text-center text-md-between d-md-flex align-items-center justify-content-between">
                    <p className="mb-2 mb-md-0 opacity-75">© 2026 Student Course Management System. All rights reserved.</p>
                    <div className="d-flex gap-3 justify-content-center">
                        <a href="#" className="text-white opacity-75 text-decoration-none small">Privacy Policy</a>
                        <a href="#" className="text-white opacity-75 text-decoration-none small">Terms of Service</a>
                    </div>
                </div>
            </footer>

            <LegacyScript src="/legacy/js/courses.js" />
        </>
    );
}