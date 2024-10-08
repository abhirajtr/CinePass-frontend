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
        <div className="flex flex-col w-64 bg-background-100 text-white min-h-screen p-4 fixed top-0 left-0 h-screen">
            <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
            <nav>
                <ul>
                    <li className="mb-2">
                        <NavLink
                            to="/admin/users"
                            className={({ isActive }) =>
                                `block p-2 rounded ${isActive ? 'bg-accent-500' : 'hover:bg-accent-200'}`
                            }
                        >
                            Users
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink
                            to="/admin/theatres"
                            className={({ isActive }) =>
                                `block p-2 rounded ${isActive ? 'bg-accent-500' : 'hover:bg-accent-200'}`
                            }
                        >
                            Theatres
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink
                            to="/admin/movies"
                            className={({ isActive }) =>
                                `block p-2 rounded ${isActive ? 'bg-accent-500' : 'hover:bg-accent-200'}`
                            }
                        >
                            Movies
                        </NavLink>
                    </li>
                    {/* Add more links as needed */}
                    {/* <li className="mt-20">
                        <button
                            onClick={handleLogout}
                            className="block w-full p-2 rounded bg-red-600 hover:bg-red-500"
                        >
                            Logout
                        </button>
                    </li> */}
                </ul>
            </nav>
            <div className="mt-auto mb-5"> {/* This pushes the logout button to the bottom */}
                <button
                    onClick={handleLogout}
                    className="block w-full p-2 rounded bg-red-600 hover:bg-red-500"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
