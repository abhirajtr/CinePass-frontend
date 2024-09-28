import { FC } from "react";

const TheatreHeader: FC = () => {
    return (
        <div className="w-full bg-gray-800 text-white h-16 flex items-center justify-between px-4">
            <h2 className="text-lg font-semibold">Theatre Name</h2>
            <div className="flex items-center">
                <button className="mr-4">Notifications</button>
                <button className="mr-4">Profile</button>
            </div>
        </div>
    );
};

export default TheatreHeader;
