import { useEffect, useRef, useState } from "react";
import apiClient from "../api/apiClient";
import { createSocket } from "../api/socketClient";

// Task 13: real-time direct messages (Socket.IO) + saved history (REST).
function Chat() {
    const myId = (() => {
        try {
            return JSON.parse(localStorage.getItem("courseHub_currentUser"))?.id || "";
        } catch {
            return "";
        }
    })();

    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [recipientId, setRecipientId] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState("");
    const recipientRef = useRef("");
    const bottomRef = useRef(null);

    useEffect(() => {
        recipientRef.current = recipientId;
    }, [recipientId]);

    useEffect(() => {
        apiClient
            .get("/messages/contacts")
            .then((res) => setContacts(res.data.contacts))
            .catch(() => setError("Unable to load contacts"));

        const client = createSocket();

        client.on("connect", () => {
            setConnected(true);
            setError("");
        });
        client.on("disconnect", () => setConnected(false));
        client.on("connect_error", (err) => {
            setConnected(false);
            setError(err.message);
        });
        client.on("receive_message", (data) => {
            // Only show messages that belong to the conversation that is open.
            const open = recipientRef.current;
            const mine = String(data.sender) === myId || String(data.recipient) === myId;
            const inThread = String(data.sender) === open || String(data.recipient) === open;
            if (!mine || !inThread) return;
            setMessages((prev) => (prev.some((m) => m._id === data._id) ? prev : [...prev, data]));
        });

        client.connect();
        setSocket(client);
        return () => client.disconnect();
    }, [myId]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    async function selectRecipient(id) {
        setRecipientId(id);
        setMessages([]);
        setError("");
        if (!id) return;
        try {
            const response = await apiClient.get(`/messages/${id}`);
            setMessages(response.data.messages);
        } catch {
            setError("Unable to load message history");
        }
    }

    function sendMessage(event) {
        event.preventDefault();
        if (!socket || !connected || !recipientId || !message.trim()) return;

        socket.emit("send_message", { recipientId, text: message }, (result) => {
            if (result?.success) {
                setMessage("");
                setError("");
            } else {
                setError(result?.message || "Message failed");
            }
        });
    }

    const nameOf = (id) =>
        String(id) === myId ? "You" : contacts.find((c) => c._id === String(id))?.name || "User";

    return (
        <section className="card shadow-sm border-0 p-4">
            <h2 className="h4 fw-bold">Chat</h2>
            <p className="mb-2">
                Connection:{" "}
                <span className={`badge ${connected ? "bg-success" : "bg-secondary"}`}>
                    {connected ? "Online" : "Offline"}
                </span>
            </p>

            {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}

            <select
                className="form-select mb-3"
                value={recipientId}
                onChange={(e) => selectRecipient(e.target.value)}
                aria-label="Choose who to chat with"
            >
                <option value="">Choose who to chat with...</option>
                {contacts.map((c) => (
                    <option key={c._id} value={c._id}>
                        {c.name} ({c.role})
                    </option>
                ))}
            </select>

            <div className="border rounded p-3 mb-3" style={{ height: 260, overflowY: "auto" }}>
                {!recipientId && <p className="text-muted mb-0">Select a person to start chatting.</p>}
                {recipientId && messages.length === 0 && <p className="text-muted mb-0">No messages yet.</p>}
                {messages.map((item) => (
                    <p key={item._id} className="mb-2">
                        <strong>{nameOf(item.sender)}:</strong> {item.text}{" "}
                        <small className="text-muted">
                            {new Date(item.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </small>
                    </p>
                ))}
                <div ref={bottomRef} />
            </div>

            <form onSubmit={sendMessage} className="d-flex gap-2">
                <input
                    className="form-control"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                    maxLength={2000}
                    disabled={!recipientId}
                />
                <button type="submit" className="btn btn-primary" disabled={!connected || !recipientId || !message.trim()}>
                    Send
                </button>
            </form>
        </section>
    );
}

export default Chat;
