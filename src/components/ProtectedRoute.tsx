import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";

interface ProtectedRouteProps {
    requiredRole: string; // Specify the required role
    children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ requiredRole, children }) => {
    const isAuthenticated = useSelector((state: RootState) => state.authReducer.accessToken);
    const userRole = useSelector((state: RootState) => state.authReducer.role);

    if (!isAuthenticated) {
        const loginPath = requiredRole === "user" ? `/login` : `/${requiredRole}/login`;
        return <Navigate to={loginPath} replace />;
    }
    if (requiredRole && userRole !== requiredRole) {
        // Redirect to unauthorized page if role doesn't match
        return <Navigate to="/unauthorized" replace />;
    }

    // Render children if authenticated and role matches
    return <>{children}</>;
};

export default ProtectedRoute;
