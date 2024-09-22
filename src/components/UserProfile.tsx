import { FC, useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

interface IUserDetails {
    email: string;
    phone: string;
}

const UserProfile: FC = () => {
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");

    useEffect(() => {
        fetchUserDetails();
    }, [])

    const fetchUserDetails = async () => {
        try {
            const userDetails = await axiosInstance<IUserDetails>('/user/profile');
            setEmail(userDetails.data.email);
            setPhone(userDetails.data.phone);
            console.log(userDetails);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="p-6 h-screen rounded-lg shadow-md">
            <h2 className="text-text-950 text-2xl font-bold mb-4">User Profile</h2>

            <div className="mb-4">
                <label className="block text-text-700 font-semibold">Email:</label>
                <p className="text-text-900">{email}</p>
            </div>

            <div>
                <label className="block text-text-700 font-semibold">Phone Number:</label>
                <p className="text-text-900">{phone}</p>
            </div>
        </div>
    );
};

export default UserProfile;
