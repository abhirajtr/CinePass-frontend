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
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && userRole !== requiredRole) {
        // Redirect to unauthorized page if role doesn't match
        return <Navigate to="/unauthorized" replace />;
    }

    // Render children if authenticated and role matches
    return <>{children}</>;
};

export default ProtectedRoute;
