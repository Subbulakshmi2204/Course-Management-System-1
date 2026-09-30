import { NavLink } from "react-router-dom";

/**
 * Shared logged-in-student navbar. Only used by pages that were rebuilt as
 * fully reusable React components (Courses, CoursePlayer) rather than
 * auto-converted 1:1 from the original HTML - the rest of the app's pages
 * keep their own original nav markup so the legacy scripts (which query it
 * by id, e.g. #navAuthArea) keep working untouched.
 */
function Navbar({ variant = "student" }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-3">
            <div className="container">
                <NavLink className="navbar-brand fw-bold logo" to="/">
                    <i className="bi bi-mortarboard-fill me-2"></i>
                    CourseHub
                </NavLink>

                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mainNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/student-dashboard">
                                Dashboard
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/courses">
                                Explore Courses
                            </NavLink>
                        </li>
                        {variant === "student3" && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/progress">
                                    My Progress
                                </NavLink>
                            </li>
                        )}
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/notifications">
                                Notifications
                            </NavLink>
                        </li>
                    </ul>

                    <button
                        id="logoutBtn"
                        type="button"
                        className="btn btn-outline-danger btn-sm rounded-pill px-3"
                        onClick={() => {
                            if (window.handleLogout) {
                                window.handleLogout("/user-login.html");
                            } else {
                                window.location.href = "/user-login.html";
                            }
                        }}
                    >
                        <i className="bi bi-box-arrow-right me-1"></i>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
