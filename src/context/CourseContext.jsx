import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const CourseContext = createContext(null);

export function CourseProvider({ children }) {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchCourses() {
        try {
            setLoading(true);
            const response = await api.get("/api/v1/courses");
            setCourses(response.data.data);
            setError(null);
        } catch (error) {
            console.error("Failed to fetch courses:", error);
            setError("Unable to load courses.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCourses();
    }, []);

    async function addCourse(course) {
        const response = await api.post("/api/v1/courses", course);
        setCourses((prev) => [...prev, response.data.data]);
        return response.data.data;
    }

    async function updateCourse(id, updatedCourse) {
        const response = await api.put(`/api/v1/courses/${id}`, updatedCourse);
        setCourses((prev) => prev.map((c) => (c.id === id ? response.data.data : c)));
        return response.data.data;
    }

    async function deleteCourse(id) {
        await api.delete(`/api/v1/courses/${id}`);
        setCourses((prev) => prev.filter((c) => c.id !== id));
    }

    return (
        <CourseContext.Provider value={{ courses, loading, error, fetchCourses, addCourse, updateCourse, deleteCourse }}>
            {children}
        </CourseContext.Provider>
    );
}

export function useCourses() {
    return useContext(CourseContext);
}