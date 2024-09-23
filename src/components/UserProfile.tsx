import { FC, useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";

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

    // State for updating password
    const [isPasswordEditing, setIsPasswordEditing] = useState<boolean>(false);
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

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

    const handlePasswordUpdate = async () => {
        if (oldPassword.length < 8) {
            return toast.error("Current password must be at least 8 characters long.");
        }
        if (newPassword !== confirmPassword) {
            return toast.error("Passwords do not match.");
        }
        if (newPassword.length < 8) {
            return toast.error("Password must be at least 8 characters long.");
        }
        if (oldPassword === newPassword) {
            return toast.error("New password cannot be the same as the old password.");
        }

        try {
            await axiosInstance.put('/user/update-password', { oldPassword, newPassword, confirmPassword });
            toast.success("Password updated successfully!");
            setIsPasswordEditing(false);
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            if (error instanceof AxiosError) {
                return toast.error(error.response?.data?.message);
            }
            toast.error("Failed to update password.");
            console.error("Error updating password", error);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>; // Loading indicator
    }

    return (
        <div className="flex justify-center items-start mt-8 min-h-screen bg-background-50 mb-2">
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

                {/* Update Password Section */}
                <div className="mt-8 border-t pt-6 border-accent-700">
                    <h3 className="text-text-700 text-xl font-semibold mb-4">Update Password</h3>
                    {isPasswordEditing ? (
                        <div>
                            <div className="mb-4">
                                <label className="block text-text-700 font-semibold mb-2">Old Password</label>
                                <input
                                    type="password"
                                    className="text-text-900 text-xl w-full bg-background-50 p-2 rounded border border-accent-200"
                                    placeholder="Enter old password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </div>
                            <div className="mb-4 relative">
                                <label className="block text-text-700 font-semibold mb-2">New Password:</label>
                                <input
                                    autoComplete="off"
                                    type={showPassword ? "text" : "password"}
                                    className="text-text-900 text-lg w-full bg-background-50 p-2 rounded border border-accent-200"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <span
                                    className="absolute right-3 top-10 cursor-pointer text-text-950"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEyeSlash : faEye}
                                    />
                                </span>
                            </div>
                            <div className="mb-4 relative">
                                <label className="block text-text-700 font-semibold mb-2">Confirm Password:</label>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="text-text-900 text-lg w-full bg-background-50 p-2 rounded border border-accent-200"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <span
                                    className="absolute right-3 top-10 cursor-pointer text-text-950"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    <FontAwesomeIcon
                                        icon={showConfirmPassword ? faEyeSlash : faEye}
                                    />
                                </span>
                            </div>
                            <div className="flex justify-center">
                                <button className="bg-secondary-500 px-6 py-2 text-text-950 font-semibold rounded-lg shadow-md hover:bg-secondary-600 mr-4" onClick={handlePasswordUpdate}>
                                    Save Password
                                </button>
                                <button className="bg-red-500 px-6 py-2 text-text-950 font-semibold rounded-lg shadow-md hover:bg-red-600" onClick={() => setIsPasswordEditing(false)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button className="px-6 py-2 bg-secondary-500 text-text-950 font-semibold rounded-lg shadow-md hover:bg-secondary-600" onClick={() => setIsPasswordEditing(true)}>
                            Update Password
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
