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


const router = createBrowserRouter(
    createRoutesFromElements(
        <> 
            <Route path="/theatre/signup" element={<TheatreSignup />} />
            <Route path="/theatre/signup/verify-opt" element={<TheatreVerifyOtp />} />
            <Route path="/theatre/signup/success" element={<TheatreSignupSuccess />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            {/* <Route path="/admin" element={<Navigate to="/admin/login" />} /> */}
            <Route path="/admin" element={<AdminLayout />}>
                <Route path="/admin" element={<Navigate to="/admin/users" />}></Route>
                <Route path="users" element={
                    <ProtectedRoute requiredRole="admin">
                        <UserList />
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
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </>

    )
)

export default router;