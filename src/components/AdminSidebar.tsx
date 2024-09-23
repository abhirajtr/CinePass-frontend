import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

const AdminSidebar: React.FC = () => {
    const navigate = useNavigate(); // Hook to programmatically navigate
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/admin/login");
    };

    return (
        <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
            <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
            <nav>
                <ul>
                    <li className="mb-2">
                        <NavLink
                            to="/admin/users"
                            className={({ isActive }) =>
                                `block p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
                            }
                        >
                            Users
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink
                            to="/admin/theatres"
                            className={({ isActive }) =>
                                `block p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
                            }
                        >
                            Theatres
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink
                            to="/admin/reports"
                            className={({ isActive }) =>
                                `block p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
                            }
                        >
                            Reports
                        </NavLink>
                    </li>
                    {/* Add more links as needed */}
                    <li className="mb-2">
                        <button
                            onClick={handleLogout}
                            className="block w-full p-2 rounded bg-red-600 hover:bg-red-500"
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminSidebar;
