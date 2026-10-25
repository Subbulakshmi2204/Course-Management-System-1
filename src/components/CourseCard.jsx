import { Link } from "react-router-dom";

function CourseCard({ image, alt, title, description, courseKey, category, level }) {
    return (
        <div className="card h-100 shadow-sm border-0 custom-card">
            <div className="course-img-container">
                {image && <img src={image} className="course-img" alt={alt || title} />}
            </div>
            <div className="card-body p-4 d-flex flex-column">
                {category && <span className="badge bg-primary-soft text-primary mb-2 align-self-start">{category}</span>}
                <h5 className="fw-bold mb-2">{title}</h5>
                <p className="text-muted small mb-3">{description}</p>
                {level && <p className="text-muted small mb-3 mt-auto">Level: {level}</p>}
                <div className="row g-2 pt-3 border-top">
                    <div className="col-6">
                        <Link
                            className="btn btn-outline-primary w-100 btn-sm py-2"
                            to={`/course/${encodeURIComponent(courseKey)}`}
                            onClick={() => localStorage.setItem("selectedCourseKey", courseKey)}
                        >
                            View Details
                        </Link>
                    </div>
                    <div className="col-6">
                        <button
                            className="btn btn-primary w-100 btn-sm py-2"
                            onClick={() => window.handleEnrollment && window.handleEnrollment(courseKey)}
                        >
                            Enroll
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;