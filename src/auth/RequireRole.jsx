import { Navigate } from "react-router-dom";

// Route guard for the UI. Not a security boundary - the API enforces roles.
export default function RequireRole({ role, redirectTo = "/login", children }) {
    const hasToken = !!sessionStorage.getItem("token");
    const currentRole = sessionStorage.getItem("role");

    if (!hasToken || currentRole !== role) {
        return <Navigate to={redirectTo} replace />;
    }
    return children;
}