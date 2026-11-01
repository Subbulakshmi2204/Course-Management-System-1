import { Navigate } from "react-router-dom";

// Any logged-in user (student or admin). UI guard only - the API enforces access.
export default function RequireAuth({ children, redirectTo = "/login" }) {
    if (!sessionStorage.getItem("token")) {
        return <Navigate to={redirectTo} replace />;
    }
    return children;
}