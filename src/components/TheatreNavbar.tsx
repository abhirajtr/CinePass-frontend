import React from 'react';

interface TheatreNavbarProps {
    onLogout: () => void;
}

const TheatreNavbar: React.FC<TheatreNavbarProps> = ({ onLogout }) => {
    return (
        <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
            {/* Theatre Name */}
            <div className="text-xl font-semibold">
                Theatre Management
            </div>
            {/* Logout Button */}
            <button
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
                Logout
            </button>
        </nav>
    );
};

export default TheatreNavbar;
