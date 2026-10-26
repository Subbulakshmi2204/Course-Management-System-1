import axios from "axios";

// Backend runs on port 4000 in this project (see backend/.env).
// Override with VITE_API_URL in a frontend .env file if needed.
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach the JWT (saved after login) to every request.
// sessionStorage keeps it for the current browser tab only - fine for a
// learning project, but JavaScript-readable storage is exposed to XSS, so
// production apps usually prefer HttpOnly cookies.
apiClient.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("token");

        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;