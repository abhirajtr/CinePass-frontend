import { FC, useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";

interface IUserDetails {
    email: string;
    phone: string;
    username: string;
}

const UserProfile: FC = () => {
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newPhone, setNewPhone] = useState<string>("");
    const [newUsername, setNewUsername] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const userDetails = await axiosInstance<IUserDetails>('/user/profile');
            setEmail(userDetails.data.email);
            setPhone(userDetails.data.phone);
            setUsername(userDetails.data.username);
            setNewPhone(userDetails.data.phone);
            setNewUsername(userDetails.data.username);
        } catch (error) {
            toast.error("Failed to load user details.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setNewPhone(phone);
        setNewUsername(username);
        setIsEditing(false);
    };

    const handleSave = async () => {
        const regex = /^[0-9]{10}$/;
        if (!regex.test(newPhone)) {
            return toast.error("Invalid phone number. It must be exactly 10 digits.");
        }
        if (newUsername.length > 20) {
            return toast.error("Username must be less than or equal to 20 characters long.");
        }
        try {
            await axiosInstance.put('/user/update-details', { phone: newPhone, username: newUsername });
            toast.success("Profile updated successfully!");
            setPhone(newPhone);
            setUsername(newUsername);
            setIsEditing(false);
        } catch (error) {
            toast.error("Failed to update profile.");
            console.error("Error updating profile", error);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>; // Loading indicator
    }

    return (
        <div className="flex justify-center items-start mt-8 h-screen bg-background-50">
            <div className="bg-background-100 p-10 rounded-lg shadow-lg w-full max-w-lg text-text-950">
                <h2 className="text-text-950 text-3xl font-bold text-center mb-6">User Profile</h2>

                <div className="flex flex-col items-center mb-6">
                    <FontAwesomeIcon icon={faUserCircle} className="text-text-900 w-24 h-24 mb-4" />
                </div>

                <div className="border-t pt-6 border-accent-700">
                    <div className="mb-4">
                        <label className="block text-text-700 font-semibold mb-2">Email:</label>
                        <input className="text-text-900 text-lg w-full bg-background-100 p-2 rounded border border-accent-200" value={email} disabled />
                    </div>

                    <div className="mb-4">
                        <label className="block text-text-700 font-semibold mb-2">Phone Number:</label>
                        <div className="flex items-center">
                            <span className="bg-background-500 border border-secondary-50 p-2 rounded-l-md text-text-100 text-lg">+91</span>
                            <input
                                type="text"
                                placeholder="XXXXXXXXXX"
                                className="text-text-900 text-lg bg-background-50 border border-accent-200 p-2 rounded-r-md w-full disabled:bg-background-100"
                                value={isEditing ? newPhone : phone}
                                disabled={!isEditing}
                                onChange={(e) => setNewPhone(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-text-700 font-semibold mb-2">Username</label>
                        <input
                            className="text-text-900 text-lg w-full bg-background-50 p-2 rounded border border-accent-200 disabled:bg-background-100"
                            value={isEditing ? newUsername : username}
                            disabled={!isEditing}
                            onChange={(e) => setNewUsername(e.target.value)}
                            placeholder="Enter a username"
                            aria-label="Username"
                        />
                    </div>
                </div>

                <div className="flex justify-center mt-6">
                    {isEditing ? (
                        <>
                            <button className="bg-secondary-500 px-6 py-2 text-text-950 font-semibold rounded-lg shadow-md hover:bg-secondary-600 mr-4" onClick={handleSave}>
                                Save
                            </button>
                            <button className="bg-red-500 px-6 py-2 text-text-950 font-semibold rounded-lg shadow-md hover:bg-red-600" onClick={handleCancelEdit}>
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button className="px-6 py-2 bg-secondary-500 text-text-950 font-semibold rounded-lg shadow-md hover:bg-secondary-600" onClick={() => setIsEditing(true)}>
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
