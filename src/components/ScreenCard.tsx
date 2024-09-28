import React from 'react';

// interface ScreenCardProps {
//     screenNumber: number;
//     capacity: number;
// }
const screenNumber = 1;
const capacity = 120;

const ScreenCard: React.FC = () => {
    return (
        <div className="bg-background-100 p-4 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-bold text-text-950">Screen {screenNumber}</h2>
            <p className="text-text-900">Capacity: {capacity} seats</p>
        </div>
    );
};

export default ScreenCard;
