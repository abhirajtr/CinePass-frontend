import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import Home from "../Home";
import ErrorPage from "../ErrorPage";
import UserSignup from "../pages/user/UserSignup";
import UserLogin from "../pages/user/UserLogin";
import UserProfile from "../components/UserProfile";
import ProtectedRoute from "../components/ProtectedRoute";
import UserOtpInput from "../pages/user/UserOtpInput";
import SignupSuccess from "../pages/user/SignupSuccess";
import ForgotPassword from "../pages/user/UserForgotPassword";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminLayout from "../layouts/AdminLayout";
import UserList from "../components/UsersList";
import TheatreSignup from "../pages/theatre/TheatreSignup";
import TheatreVerifyOtp from "../pages/theatre/TheatreVerifyOtp";
import TheatreSignupSuccess from "../pages/theatre/TheatreSignupSuccess";
import TheatreLogin from "../pages/theatre/TheatreLogin";
// import ScreenCard from "../components/ScreenCard";
import TheatreDashboard from "../components/TheatreDashboard";
import TheatreLayout from "../layouts/TheatreLayout";
import AdminTheatreList from "../components/AdminTheatreList";
import AdminMovies from "../components/AdminMovies";
// import { TheatreLayout } from "../layouts/TheatreLayout";


const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* Theatre Routes */}
            <Route path="/theatre/signup" element={<TheatreSignup />} />
            <Route path="/theatre/login" element={<TheatreLogin />} />
            <Route path="/theatre/signup/verify-otp" element={<TheatreVerifyOtp />} />
            <Route path="/theatre/signup/success" element={<TheatreSignupSuccess />} />
            {/* <Route path="/theatre" element={<Navigate to="/theatre/dashboard/screens" replace />} /> */}
            <Route path="/theatre" element={<TheatreLayout />}>
                <Route index element={<Navigate to="/theatre/dashboard" replace={true} />} />
                <Route path="dashboard" element={<TheatreDashboard />} />

            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
                <Route path="/admin" element={<Navigate to="/admin/users" />}></Route>
                <Route path="users" element={
                    <ProtectedRoute requiredRole="admin">
                        <UserList />
                    </ProtectedRoute>
                } />
                <Route path="theatres" element={
                    <ProtectedRoute requiredRole="admin">
                        <AdminTheatreList />
                    </ProtectedRoute>
                } />
                <Route path="movies" element={
                    <ProtectedRoute requiredRole="admin">
                        <AdminMovies />
                    </ProtectedRoute>
                } />
            </Route>


            <Route path="/signup" element={<UserSignup />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/verify-otp" element={<UserOtpInput />} />
            <Route path="/signup-success" element={<SignupSuccess />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={<UserLayout />} >
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={
                    <ProtectedRoute requiredRole="user">
                        <UserProfile />
                    </ProtectedRoute>
                } />
            </Route>
            <Route path="*" element={<ErrorPage />} />
        </>

    )
)

export default router;