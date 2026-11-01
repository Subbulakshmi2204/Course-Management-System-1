import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { getErrorMessage } from "../api/authApi";

// Task 12: reads and updates the logged-in user's profile from MongoDB.
function Profile() {
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [notice, setNotice] = useState(null);

    useEffect(() => {
        apiClient
            .get("/profile")
            .then((res) => {
                setUser(res.data.user);
                setName(res.data.user.name);
                setDepartment(res.data.user.department || "");
            })
            .catch((err) => setNotice({ type: "danger", text: getErrorMessage(err, "Unable to load profile") }));
    }, []);

    async function handleSave(event) {
        event.preventDefault();
        try {
            const res = await apiClient.put("/profile", { name, department });
            setUser(res.data.user);
            setNotice({ type: "success", text: "Profile updated" });
        } catch (err) {
            setNotice({ type: "danger", text: getErrorMessage(err, "Unable to update profile") });
        }
    }

    return (
        <section className="card shadow-sm border-0 p-4" style={{ maxWidth: 520 }}>
            <h2 className="h4 fw-bold mb-3">My Profile</h2>
            {notice && <div className={`alert alert-${notice.type} py-2`} role="alert">{notice.text}</div>}
            {user && (
                <form onSubmit={handleSave}>
                    <p className="mb-1"><strong>Email:</strong> {user.email}</p>
                    <p className="mb-3"><strong>Role:</strong> {user.role}</p>
                    <label className="form-label">Name</label>
                    <input className="form-control mb-3" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} required />
                    <label className="form-label">Department</label>
                    <input className="form-control mb-3" value={department} onChange={(e) => setDepartment(e.target.value)} maxLength={100} />
                    <button className="btn btn-primary" type="submit">Save changes</button>
                </form>
            )}
        </section>
    );
}

export default Profile;