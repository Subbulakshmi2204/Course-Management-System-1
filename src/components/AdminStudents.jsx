import { useCallback, useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { getErrorMessage } from "../api/authApi";

// Task 9: admin student management using GET/POST/PUT/DELETE /api/v1/students.
const EMPTY = { name: "", email: "", department: "", password: "" };

function AdminStudents() {
    const [students, setStudents] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [form, setForm] = useState(EMPTY);
    const [editingId, setEditingId] = useState(null);
    const [notice, setNotice] = useState(null);

    const load = useCallback(async (p) => {
        try {
            const res = await apiClient.get(`/students?page=${p}&limit=10`);
            setStudents(res.data.students);
            setTotalPages(res.data.totalPages || 1);
        } catch (err) {
            setNotice({ type: "danger", text: getErrorMessage(err, "Unable to load students") });
        }
    }, []);

    useEffect(() => {
        load(page);
    }, [load, page]);

    const change = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    async function save(event) {
        event.preventDefault();
        try {
            if (editingId) {
                const { name, email, department } = form;
                await apiClient.put(`/students/${editingId}`, { name, email, department });
            } else {
                await apiClient.post("/students", form);
            }
            setNotice({ type: "success", text: editingId ? "Student updated" : "Student created" });
            setForm(EMPTY);
            setEditingId(null);
            load(page);
        } catch (err) {
            setNotice({ type: "danger", text: getErrorMessage(err, "Unable to save student") });
        }
    }

    async function remove(id) {
        if (!window.confirm("Delete this student and all their enrollments, progress and messages?")) return;
        try {
            await apiClient.delete(`/students/${id}`);
            setNotice({ type: "success", text: "Student deleted" });
            load(page);
        } catch (err) {
            setNotice({ type: "danger", text: getErrorMessage(err, "Unable to delete student") });
        }
    }

    function startEdit(s) {
        setEditingId(s._id);
        setForm({ name: s.name, email: s.email, department: s.department || "", password: "" });
    }

    return (
        <section>
            <h2 className="h4 fw-bold mb-3">Manage Students</h2>
            {notice && <div className={`alert alert-${notice.type} py-2`} role="alert">{notice.text}</div>}

            <form onSubmit={save} className="card shadow-sm border-0 p-3 mb-4">
                <h3 className="h6 fw-bold">{editingId ? "Edit student" : "Add student"}</h3>
                <div className="row g-2">
                    <div className="col-md-3"><input className="form-control" name="name" placeholder="Name" value={form.name} onChange={change} required /></div>
                    <div className="col-md-3"><input className="form-control" type="email" name="email" placeholder="Email" value={form.email} onChange={change} required /></div>
                    <div className="col-md-2"><input className="form-control" name="department" placeholder="Department" value={form.department} onChange={change} /></div>
                    {!editingId && (
                        <div className="col-md-2"><input className="form-control" type="password" name="password" placeholder="Password (12+)" minLength={12} maxLength={72} value={form.password} onChange={change} required /></div>
                    )}
                    <div className="col-md-2 d-flex gap-2">
                        <button className="btn btn-primary" type="submit">{editingId ? "Update" : "Create"}</button>
                        {editingId && <button type="button" className="btn btn-outline-secondary" onClick={() => { setEditingId(null); setForm(EMPTY); }}>Cancel</button>}
                    </div>
                </div>
            </form>

            <div className="table-responsive">
                <table className="table align-middle">
                    <thead><tr><th>Name</th><th>Email</th><th>Department</th><th className="text-end">Actions</th></tr></thead>
                    <tbody>
                        {students.length === 0 && <tr><td colSpan="4" className="text-muted">No students yet.</td></tr>}
                        {students.map((s) => (
                            <tr key={s._id}>
                                <td>{s.name}</td>
                                <td>{s.email}</td>
                                <td>{s.department}</td>
                                <td className="text-end">
                                    <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => startEdit(s)}>Edit</button>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => remove(s._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="d-flex gap-2 align-items-center">
                <button className="btn btn-sm btn-outline-primary" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
                <span className="small">Page {page} of {totalPages}</span>
                <button className="btn btn-sm btn-outline-primary" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
            </div>
        </section>
    );
}

export default AdminStudents;