import React from 'react';
import { NavLink } from 'react-router-dom';

const TheatreSidebar: React.FC = () => {
    return (
        <div className="bg-gray-900 text-white w-64 h-full px-4 py-8">
            <ul>
                <li className="mb-4">
                    <NavLink
                        to="/theatre/dashboard"
                        className={({ isActive }) =>
                            isActive ? "bg-accent-500 p-2 font-bold block w-full" : "hover:text-gray-300 p-2 block w-full"
                        }
                    >
                        Overview
                    </NavLink>
                </li>
                <li className="mb-4">
                    <NavLink
                        to="/theatre/manage-seats"
                        className={({ isActive }) =>
                            isActive ? "bg-accent-500 p-2 font-bold block w-full" : "hover:text-gray-300 p-2 block w-full"
                        }
                    >
                        Manage Seats
                    </NavLink>
                </li>
                <li className="mb-4">
                    <NavLink
                        to="/theatre/view-bookings"
                        className={({ isActive }) =>
                            isActive ? "bg-accent-500 p-2 font-bold block w-full" : "hover:text-gray-300 p-2 block w-full"
                        }
                    >
                        View Bookings
                    </NavLink>
                </li>
                <li className="mb-4">
                    <NavLink
                        to="/theatre/showtimes"
                        className={({ isActive }) =>
                            isActive ? "bg-accent-500 p-2 font-bold block w-full" : "hover:text-gray-300 p-2 block w-full"
                        }
                    >
                        Showtimes
                    </NavLink>
                </li>
                <li className="mb-4">
                    <NavLink
                        to="/theatre/info"
                        className={({ isActive }) =>
                            isActive ? "bg-accent-500 p-2 font-bold block w-full" : "hover:text-gray-300 p-2 block w-full"
                        }
                    >
                        Theatre Info
                    </NavLink>
                </li>
                <li className="mb-4">
                    <NavLink
                        to="/theatre/reports"
                        className={({ isActive }) =>
                            isActive ? "bg-accent-500 p-2 font-bold block w-full" : "hover:text-gray-300 p-2 block w-full"
                        }
                    >
                        Reports
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default TheatreSidebar;
