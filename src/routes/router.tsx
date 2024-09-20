import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import Home from "../Home";
import ErrorPage from "../ErrorPage";
import UserSignup from "../pages/user/UserSignup";
import UserLogin from "../pages/user/UserLogin";
import UserProfile from "../components/UserProfile";
import ProtectedRoute from "../components/ProtectedRoute";


const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/signup" element={<UserSignup />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/" element={<UserLayout />} >
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={
                    <ProtectedRoute requiredRole="user">
                        <UserProfile />
                    </ProtectedRoute>
                } />
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </>

    )
)

export default router;