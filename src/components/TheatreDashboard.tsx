// src/pages/TheatreDashboard.tsx

import React from 'react';

const TheatreDashboard: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Total Shows */}
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">Total Shows</h2>
                <p className="text-2xl">150</p>
            </div>

            {/* Card 2: Total Bookings */}
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">Total Bookings</h2>
                <p className="text-2xl">1200</p>
            </div>

            {/* Card 3: Total Seats Available */}
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">Seats Available</h2>
                <p className="text-2xl">800</p>
            </div>

            {/* Add more dashboard cards or charts as needed */}
        </div>
    );
};

export default TheatreDashboard;
