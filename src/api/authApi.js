import apiClient from "./apiClient";

export async function registerStudent(studentData) {
    const response = await apiClient.post("/auth/register", studentData);
    return response.data;
}

export async function loginStudent(credentials) {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
}

/** Turns an Axios error into a message that is safe to show in the UI. */
export function getErrorMessage(error, fallback) {
    if (error.response?.data?.message) {
        return error.response.data.message;
    }
    if (error.request) {
        // The request was sent but nothing came back.
        return "Cannot reach the server. Make sure the backend is running.";
    }
    return fallback;
}