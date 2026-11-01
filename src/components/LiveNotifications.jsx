import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { createSocket } from "../api/socketClient";

// Task 13: server-stored notifications that arrive live over Socket.IO.
// (Named LiveNotifications because pages/Notifications.jsx already exists.)
function LiveNotifications() {
    const loggedIn = !!sessionStorage.getItem("token");
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (!loggedIn) return undefined;
        let active = true;

        apiClient
            .get("/notifications")
            .then((response) => active && setNotifications(response.data.notifications))
            .catch(console.error);

        const socket = createSocket();
        socket.on("new_notification", (notification) => {
            setNotifications((prev) => [notification, ...prev]);
        });
        socket.connect();

        return () => {
            active = false;
            socket.disconnect();
        };
    }, [loggedIn]);

    async function markRead(id) {
        try {
            await apiClient.patch(`/notifications/${id}/read`);
            setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)));
        } catch {
            alert("Unable to update notification");
        }
    }

    if (!loggedIn) return null;

    return (
        <section className="container pt-4">
            <h2 className="h5 fw-bold mb-3">Live messages &amp; alerts</h2>
            {notifications.length === 0 && <p className="text-muted">No live notifications yet.</p>}
            {notifications.map((item) => (
                <div key={item._id} className={`card mb-2 ${item.isRead ? "" : "border-primary"}`}>
                    <div className="card-body py-2 d-flex justify-content-between align-items-center">
                        <div>
                            <div>{item.message}</div>
                            <small className="text-muted">{new Date(item.createdAt).toLocaleString()}</small>
                        </div>
                        {!item.isRead && (
                            <button className="btn btn-sm btn-outline-primary" onClick={() => markRead(item._id)}>
                                Mark as read
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </section>
    );
}

export default LiveNotifications;