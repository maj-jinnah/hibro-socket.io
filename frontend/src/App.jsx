import { Loader } from "lucide-react";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Settings from "./pages/Settings";

import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { useAuthStore } from "./store/useAuthStore";

function App() {
    const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isCheckingAuth && !authUser)
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="size-10 animate-spin" />
            </div>
        );

    return (
        <div>
            <Navbar />

            <Routes>
                <Route
                    path="/"
                    element={authUser ? <Home /> : <Navigate to="/login" />}
                />
                <Route
                    path="/register"
                    element={!authUser ? <Register /> : <Navigate to="/" />}
                />
                <Route
                    path="/login"
                    element={!authUser ? <Login /> : <Navigate to="/" />}
                />
                <Route
                    path="/profile"
                    element={authUser ? <Profile /> : <Navigate to="/login" />}
                />
                <Route
                    path="/settings"
                    element={authUser ? <Settings /> : <Navigate to="/login" />}
                />
            </Routes>
        </div>
    );
}

export default App;
