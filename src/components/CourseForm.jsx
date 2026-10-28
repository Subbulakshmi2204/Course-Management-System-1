import { useState } from "react";

const CATEGORIES = [
    "Programming", "Web Development", "DevOps", "Artificial Intelligence",
    "Machine Learning", "Security", "Data Analytics", "Mobile Development",
];

// Admin-only form used for both "Add Course" and "Edit Course".
// The backend (authMiddleware + authorizeRoles("admin") + validation) has the final say.
function CourseForm({ course, onSubmit, onCancel }) {
    const isEdit = Boolean(course);
    const [form, setForm] = useState({
        courseName: course?.courseName || "",
        courseCode: course?.courseCode || "",
        instructor: course?.instructor || "",
        duration: course?.duration || "",
        category: course?.category || CATEGORIES[0],
        level: course?.level || "Beginner",
        overview: course?.overview || "",
        image: course?.image || "",
    });
    const [saving, setSaving] = useState(false);

    const change = (event) =>
        setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

    async function handleSubmit(event) {
        event.preventDefault();
        setSaving(true);
        try {
            await onSubmit(form);
        } finally {
            setSaving(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="card shadow-sm border-0 p-4 mb-4">
            <h5 className="fw-bold mb-3">{isEdit ? `Edit: ${course.courseName}` : "Add Course"}</h5>
            <div className="row g-3">
                <div className="col-md-6">
                    <input className="form-control" name="courseName" placeholder="Course name" value={form.courseName} onChange={change} required />
                </div>
                <div className="col-md-6">
                    <input className="form-control" name="courseCode" placeholder="Course code (e.g. CS101)" value={form.courseCode} onChange={change} required />
                </div>
                <div className="col-md-6">
                    <input className="form-control" name="instructor" placeholder="Instructor" value={form.instructor} onChange={change} required />
                </div>
                <div className="col-md-6">
                    <input className="form-control" name="duration" placeholder="Duration (e.g. 6 Weeks)" value={form.duration} onChange={change} required />
                </div>
                <div className="col-md-6">
                    <select className="form-select" name="category" value={form.category} onChange={change}>
                        {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                </div>
                <div className="col-md-6">
                    <select className="form-select" name="level" value={form.level} onChange={change}>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>
                </div>
                <div className="col-12">
                    <input className="form-control" name="image" placeholder="Image URL (optional)" value={form.image} onChange={change} />
                </div>
                <div className="col-12">
                    <textarea className="form-control" name="overview" rows="2" placeholder="Overview" value={form.overview} onChange={change} />
                </div>
            </div>
            <div className="d-flex gap-2 mt-3">
                <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Course"}
                </button>
                <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}

export default CourseForm;