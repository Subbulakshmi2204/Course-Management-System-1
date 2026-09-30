import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import PageShell from "../components/PageShell";
import PageCss from "../components/PageCss";

// Loads the shared legacy modules (same URLs the other pages use, so the
// browser reuses the already-initialised auth/api singletons).
const load = (file) => import(/* @vite-ignore */ `/legacy/js/${file}`);

export default function CoursePlayer() {
    const { courseKey } = useParams();
    const [searchParams] = useSearchParams();
    const courseId = courseKey || searchParams.get("course") || "python-masterclass";
    const [course, setCourse] = useState(null);
    const [missing, setMissing] = useState(false);

    useEffect(() => {
        let cancelled = false;
        setCourse(null);
        setMissing(false);

        async function start() {
            const [api, player] = await Promise.all([load("api.js"), load("course-player.js")]);
            if (cancelled) return;
            const found = api.getCourseById(courseId);
            if (!found) {
                setMissing(true);
                return;
            }
            setCourse(found);
            window.__courseHubEnroll = () => player.handleEnrollClick(courseId);
            // wait one frame so the module containers exist in the DOM
            requestAnimationFrame(() => player.renderModules(courseId));
        }
        start();
        return () => {
            cancelled = true;
        };
    }, [courseId]);

    return (
        <>
            <PageCss href="/css/style.css" />
            <PageShell variant="student3">
                <div className="container py-5" style={{ maxWidth: 960 }}>
                    {missing && (
                        <div className="text-center py-5">
                            <h2 className="fw-bold">Course not found</h2>
                            <Link to="/courses" className="btn btn-primary mt-3">
                                Back to courses
                            </Link>
                        </div>
                    )}

                    {course && (
                        <>
                            <Link to="/courses" className="text-decoration-none small">
                                <i className="bi bi-arrow-left me-1"></i>All courses
                            </Link>

                            <div className="card border-0 shadow-sm overflow-hidden my-3">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    style={{ height: 220, width: "100%", objectFit: "cover" }}
                                />
                                <div className="card-body p-4">
                                    <h1 className="h3 fw-bold mb-1">{course.title}</h1>
                                    <p className="text-muted mb-0">
                                        <i className="bi bi-person me-1"></i>
                                        {course.mentor}
                                        <span className="mx-2">•</span>
                                        <i className="bi bi-clock me-1"></i>
                                        {course.duration}
                                    </p>
                                </div>
                            </div>

                            <div id="lockedNotice" className="alert alert-info d-none">
                                <p className="mb-2">Log in to unlock the video lessons and study material for this course.</p>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm"
                                    onClick={() => window.__courseHubEnroll && window.__courseHubEnroll()}
                                >
                                    Enroll / Log in
                                </button>
                            </div>

                            <div id="courseProgressWrap" className="mb-3 d-none">
                                <div className="d-flex justify-content-between small text-muted mb-1">
                                    <span>Your progress</span>
                                    <span id="courseProgressLabel">0% complete</span>
                                </div>
                                <div className="progress" style={{ height: 8 }}>
                                    <div
                                        id="courseProgressBar"
                                        className="progress-bar bg-success"
                                        role="progressbar"
                                        style={{ width: "0%" }}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    ></div>
                                </div>
                            </div>

                            <div id="interactiveModules" className="accordion d-none"></div>
                        </>
                    )}
                </div>
            </PageShell>
        </>
    );
}