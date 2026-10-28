import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import AdminLogin from "./pages/AdminLogin";
import UserRegister from "./pages/UserRegister";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Courses from "./pages/Courses";
import Certificate from "./pages/Certificate";
import EditCourse from "./pages/EditCourse";
import CourseContent from "./pages/CourseContent";
import Notifications from "./pages/Notifications";
import Progress from "./pages/Progress";
import MyCourses from "./components/MyCourses";
import MyLearningProgress from "./components/MyLearningProgress";
import PageShell from "./components/PageShell";
import RequireRole from "./auth/RequireRole";

// Single reusable course player component
import CoursePlayer from "./pages/CoursePlayer";

export default function App() {
    return (
        <Routes>
            {/* Core & Auth */}
            <Route path="/" element={<Home />} />
            <Route path="/index.html" element={<Home />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/user-login.html" element={<UserLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-login.html" element={<AdminLogin />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/user-register.html" element={<UserRegister />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/forgot-password.html" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/reset-password.html" element={<ResetPassword />} />

            {/* Dashboards */}
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/student-dashboard.html" element={<StudentDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-dashboard.html" element={<AdminDashboard />} />

            {/* Navigation & Student Tools */}
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses.html" element={<Courses />} />
            <Route path="/certificate" element={<Certificate />} />
            <Route path="/certificate.html" element={<Certificate />} />
            <Route path="/edit-course" element={<EditCourse />} />
            <Route path="/edit-course.html" element={<EditCourse />} />
            <Route path="/course-content" element={<CourseContent />} />
            <Route path="/course-content.html" element={<CourseContent />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/notifications.html" element={<Notifications />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/progress.html" element={<Progress />} />

            {/* Tasks 12-13: student-only pages (backed by /api/v1/enrollments and /api/v1/progress) */}
            <Route
                path="/my-courses"
                element={
                    <RequireRole role="student">
                        <PageShell variant="student3">
                            <div className="container py-4"><MyCourses /></div>
                        </PageShell>
                    </RequireRole>
                }
            />
            <Route
                path="/my-learning-progress"
                element={
                    <RequireRole role="student">
                        <PageShell variant="student3">
                            <div className="container py-4"><MyLearningProgress /></div>
                        </PageShell>
                    </RequireRole>
                }
            />

            {/* UNIFIED DYNAMIC COURSE ROUTE */}
            <Route path="/course/:courseKey" element={<CoursePlayer />} />
            <Route path="/course-player" element={<CoursePlayer />} />

            {/* Backward-compatibility redirects for existing .html links */}
            <Route path="/python-course.html" element={<Navigate to="/course/python-masterclass" replace />} />
            <Route path="/fullstack-course.html" element={<Navigate to="/course/fullstack-dev" replace />} />
            <Route path="/cyber-security.html" element={<Navigate to="/course/cyber-security" replace />} />
            <Route path="/ai-foundations.html" element={<Navigate to="/course/ai-foundations" replace />} />
            <Route path="/devops-course.html" element={<Navigate to="/course/devops" replace />} />
            <Route path="/data-analytics.html" element={<Navigate to="/course/data-analytics" replace />} />
            <Route path="/mlops-course.html" element={<Navigate to="/course/mlops" replace />} />
            <Route path="/nlp-course.html" element={<Navigate to="/course/nlp" replace />} />
            <Route path="/generative-ai.html" element={<Navigate to="/course/gen-ai" replace />} />
            <Route path="/advanced-mobile.html" element={<Navigate to="/course/advanced-mobile" replace />} />
            <Route path="/cross-platform-mobile.html" element={<Navigate to="/course/cross-platform-mobile" replace />} />
            <Route path="/reinforcement-learning.html" element={<Navigate to="/course/reinforcement-learning" replace />} />
        </Routes>
    );
}