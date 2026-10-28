import { createContext, useContext, useState, useEffect, useCallback } from "react";

/*
 * The existing vanilla-JS "backend" (public/legacy/js/auth.js + state.js)
 * already owns login/logout and keeps its session in localStorage under
 * "courseHub_currentUser" / "courseHub_userLoggedIn". This context does not
 * replace that logic - the legacy scripts still run exactly as before via
 * <LegacyScript>. It simply exposes the same session to any *new* React
 * component that wants to read "who is logged in" without reaching into
 * localStorage directly, and re-syncs whenever the legacy scripts change it.
 */

const USER_KEY = "courseHub_currentUser";
const SESSION_FLAG_KEY = "courseHub_userLoggedIn";

const AuthContext = createContext(null);

function readCurrentUser() {
    try {
        const raw = localStorage.getItem(USER_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUserState] = useState(() => readCurrentUser());
    const [isLoggedIn, setIsLoggedIn] = useState(
        () => localStorage.getItem(SESSION_FLAG_KEY) === "true"
    );

    const refresh = useCallback(() => {
        setCurrentUserState(readCurrentUser());
        setIsLoggedIn(localStorage.getItem(SESSION_FLAG_KEY) === "true");
    }, []);

    useEffect(() => {
        // Picks up logins/logouts made by the legacy scripts in *other* tabs.
        window.addEventListener("storage", refresh);
        // Picks up logins/logouts made by the legacy scripts in *this* tab
        // (the "storage" event only fires cross-tab), right after each
        // LegacyScript-driven navigation.
        window.addEventListener("load", refresh);
        return () => {
            window.removeEventListener("storage", refresh);
            window.removeEventListener("load", refresh);
        };
    }, [refresh]);

    function logout() {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role");
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(SESSION_FLAG_KEY);
        if (window.handleLogout) {
            window.handleLogout("/user-login.html");
        } else {
            setCurrentUserState(null);
            setIsLoggedIn(false);
        }
    }

    return (
        <AuthContext.Provider value={{ currentUser, isLoggedIn, refresh, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}