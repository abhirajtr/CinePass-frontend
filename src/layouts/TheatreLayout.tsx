import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import TheatreSidebar from '../components/TheatreSidebar';
import TheatreNavbar from '../components/TheatreNavbar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/Store';
import { logout } from '../features/auth/authSlice';

const TheatreLayout: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.authReducer.isAuthenticated);
    const userRole = useSelector((state: RootState) => state.authReducer.role);
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logout());
    };

    // Redirect to login if not authenticated or wrong role
    if (!isAuthenticated || userRole !== "theatre") {
        return <Navigate to="/theatre/login" replace={true} />;
    }

    return (
        <div className="h-screen flex flex-col">
            {/* Navbar at the top */}
            <TheatreNavbar onLogout={onLogout} />

            {/* Main content area */}
            <div className="flex flex-1">
                {/* Sidebar on the left */}
                <TheatreSidebar />

                {/* Main content on the right */}
                <div className="flex-1 p-8 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default TheatreLayout;
