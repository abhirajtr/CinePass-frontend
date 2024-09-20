import { FC } from "react";

// interface UserProfileProps {
//     email: string;
//     phoneNumber: string;
// }

const email = "abhirahtr007@gmail.com";
const phoneNumber = "7034396205"
const UserProfile: FC = () => {
    return (
        <div className="p-6 h-screen rounded-lg shadow-md">
            <h2 className="text-text-950 text-2xl font-bold mb-4">User Profile</h2>

            <div className="mb-4">
                <label className="block text-text-700 font-semibold">Email:</label>
                <p className="text-text-900">{email}</p>
            </div>

            <div>
                <label className="block text-text-700 font-semibold">Phone Number:</label>
                <p className="text-text-900">{phoneNumber}</p>
            </div>
        </div>
    );
};

export default UserProfile;
