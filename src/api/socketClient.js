import { io } from "socket.io-client";

// Backend ORIGIN only - no "/api/v1".
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:4000";

export function createSocket() {
    return io(SOCKET_URL, {
        autoConnect: false,
        // The JWT saved at login; the server rejects sockets without a valid one.
        auth: { token: sessionStorage.getItem("token") },
    });
}