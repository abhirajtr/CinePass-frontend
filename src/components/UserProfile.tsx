import { FC, useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";
// import { faUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";

interface IUserDetails {
    email: string;
    phone: string;
    username: string;
}

const UserProfile: FC = () => {
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newPhone, setNewPhone] = useState<string>("");
    const [username, setUserName] = useState<string>("");
    const [newUsername, setNewUsername] = useState<string>("");

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const userDetails = await axiosInstance<IUserDetails>('/user/profile');
            setEmail(userDetails.data.email);
            setPhone(userDetails.data.phone);
            setUserName(userDetails.data.username);
            setNewPhone(userDetails.data.phone);
            setNewUsername(userDetails.data.username);
            console.log(userDetails);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancelEdit = () => {
        setNewPhone(phone);
        setNewUsername(username);
        setIsEditing(false);
    }

    return (
        <div className="flex justify-center items-start mt-8 h-screen bg-background-50">
            <div className="bg-background-100 p-10 rounded-lg shadow-lg w-full max-w-lg text-text-950">
                <h2 className="text-text-950 text-3xl font-bold text-center mb-6">User Profile</h2>

                <div className="flex flex-col items-center mb-6">
                    {/* Placeholder for Profile Picture */}
                    {/* <div className="w-24 h-24 rounded-full bg-background-200 mb-4"></div>
                    <p className="text-text-900 text-xl font-medium">{email}</p>
                    <p className="text-text-700">{phone}</p> */}

                    <FontAwesomeIcon
                        icon={faUserCircle}
                        className="text-text-900 w-24 h-24 rounded-full mb-4"
                    />
                </div>

                <div className="border-t pt-6 border-accent-700">
                    <div className="mb-4">
                        <label className="block text-text-700 font-semibold mb-2">Email:</label>
                        {/* {isEditing ? (
                            <input
                                className="text-text-900 text-lg w-full bg-background-50 p-2 rounded"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                disabled={!isEditing}
                            />
                        ) : (
                            <p className="text-text-900 text-lg">{email}</p>
                        )} */}

                        <input
                            className="text-text-900 text-lg w-full bg-background-100 p-2 rounded border border-accent-200"
                            value={email}
                            // onChange={(e) => setNewEmail(e.target.value)}
                            disabled
                        />

                    </div>

                    <div className="mb-4">
                        <label className="block text-text-700 font-semibold mb-2">Phone Number:</label>
                        {/* {isEditing ?
                            <input
                                className="text-text-900 text-lg w-full bg-background-50 p-2 rounded"
                                value={newPhone}
                                onChange={(e) => setNewPhone(e.target.value)}
                            /> :
                            <p className="text-text-900 text-lg">{phone}</p>
                        } */}

                        <input
                            className="text-text-900 text-lg w-full bg-background-50 p-2 rounded border border-accent-200 disabled:bg-background-100"
                            value={isEditing ? newPhone : phone}
                            disabled={!isEditing}
                            onChange={(e) => setNewPhone(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-text-700 font-semibold mb-2">Username</label>
                        <input
                            className="text-text-900 text-lg w-full bg-background-50 p-2 rounded border border-accent-200 disabled:bg-background-100"
                            value={isEditing ? newUsername : username}
                            disabled={!isEditing}
                            placeholder="Enter a username"
                            onChange={(e) => setNewUsername(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-center mt-6">
                    {isEditing ?
                        <>
                            <button
                                className="bg-secondary-500 px-6 py-2 text-text-950 font-semibold rounded-lg shadow-md hover:bg-secondary-600 mr-4"
                            >
                                Save
                            </button>
                            <button
                                className="bg-red-500 px-6 py-2 text-text-950 font-semibold rounded-lg shadow-md hover:bg-red-600"
                                onClick={handleCancelEdit}
                            >
                                Cancel
                            </button>
                        </> :

                        <button
                            className="px-6 py-2 bg-secondary-500 text-text-950 font-semibold rounded-lg shadow-md hover:bg-secondary-600"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            Edit Profile
                        </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
