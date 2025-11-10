// import { Loader } from "lucide-react";
// import { useEffect } from "react";
// import Navbar from "./components/Navbar";
// import Login from "./pages/Login";
// import Profile from "./pages/Profile";
// import Register from "./pages/Register";

// import { Navigate, Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
// import { useAuthStore } from "./store/useAuthStore";
// import { useThemeStore } from "./store/useThemeStore";

// function App() {
//     const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
//     const { theme } = useThemeStore();

//     useEffect(() => {
//         checkAuth();
//     }, [checkAuth]);

//     if (isCheckingAuth && !authUser)
//         return (
//             <div className="flex items-center justify-center h-screen">
//                 <Loader className="size-10 animate-spin" />
//             </div>
//         );

//     const ProtectedRoute = ({ children }) => {
//         return authUser ? children : <Navigate to="/login" />;
//     };

//     return (
//         <div data-theme={theme}>
//             <Navbar />

//             <Routes>
//                 <Route
//                     path="/"
//                     element={
//                         <ProtectedRoute>
//                             <Home />
//                         </ProtectedRoute>
//                     }
//                 />
//                 <Route
//                     path="/profile"
//                     element={
//                         <ProtectedRoute>
//                             <Profile />
//                         </ProtectedRoute>
//                     }
//                 />
//                 <Route path="/register" element={<Register />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="*" element={<Navigate to="/" />} />
//             </Routes>
//         </div>
//     );
// }

// export default App;

import { Loader } from "lucide-react";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";

// Move ProtectedRoute outside the component
const ProtectedRoute = ({ children }) => {
    const { authUser } = useAuthStore();
    return authUser ? children : <Navigate to="/login" />;
};

// Add PublicRoute for login/register pages
const PublicRoute = ({ children }) => {
    const { authUser } = useAuthStore();
    return !authUser ? children : <Navigate to="/" />;
};

function App() {
    const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
    const { theme } = useThemeStore();

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
        <div data-theme={theme}>
            <Navbar />

            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default App;
