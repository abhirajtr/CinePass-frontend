import React, {  useState } from 'react';

interface User {
    userId: string;
    username: string;
    email: string;
    phone: string;
    createdAt: string;
    isBlocked: boolean;
}

const dummyUsers: User[] = [
    { userId: '1', username: 'Alice Smith', email: 'alice@example.com', phone: '123-456-7890', createdAt: '2023-01-01', isBlocked: false },
    { userId: '2', username: 'Bob Johnson', email: 'bob@example.com', phone: '098-765-4321', createdAt: '2023-01-02', isBlocked: true },
    { userId: '3', username: 'Charlie Brown', email: 'charlie@example.com', phone: '555-123-4567', createdAt: '2023-01-03', isBlocked: false },
    { userId: '4', username: 'Diana Prince', email: 'diana@example.com', phone: '555-987-6543', createdAt: '2023-01-04', isBlocked: true },
    // Add more dummy users as needed
];

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>(dummyUsers);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    // useEffect(() => {
        
    // }, [])
    const toggleBlockStatus = (userId: string) => {
        setSelectedUserId(userId);
        setModalOpen(true);
    };

    const confirmToggle = () => {
        if (selectedUserId) {
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.userId === selectedUserId ? { ...user, isBlocked: !user.isBlocked } : user
                )
            );
        }
        setModalOpen(false);
        setSelectedUserId(null);
    };

    const cancelToggle = () => {
        setModalOpen(false);
        setSelectedUserId(null);
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-4">User List</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border-b text-left">Username</th>
                            <th className="py-2 px-4 border-b text-left">Email</th>
                            <th className="py-2 px-4 border-b text-left">Phone</th>
                            <th className="py-2 px-4 border-b text-left">Created At</th>
                            <th className="py-2 px-4 border-b text-center">Status</th>
                            <th className="py-2 px-4 border-b text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.userId} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{user.username}</td>
                                <td className="py-2 px-4 border-b">{user.email}</td>
                                <td className="py-2 px-4 border-b">{user.phone}</td>
                                <td className="py-2 px-4 border-b">{user.createdAt}</td>
                                <td className="py-2 px-4 border-b text-center w-32">
                                    <span className={`inline-block w-full text-center py-1 rounded 
                                        ${user.isBlocked ? 'text-red-500' : 'text-green-500'}`}>
                                        {user.isBlocked ? 'Blocked' : 'Active'}
                                    </span>
                                </td>
                                <td className="py-2 px-4 border-b text-center">
                                    <button
                                        onClick={() => toggleBlockStatus(user.userId)}
                                        className={`w-24 py-1 rounded text-white transition-colors duration-200 ease-in-out 
                                            ${user.isBlocked ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                                    >
                                        {user.isBlocked ? 'Unblock' : 'Block'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for confirmation */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h3 className="text-lg font-bold mb-4">
                            Are you sure you want to {users.find(user => user.userId === selectedUserId)?.isBlocked ? 'unblock' : 'block'} this user?
                        </h3>
                        <div className="flex justify-between">
                            <button
                                onClick={confirmToggle}
                                className="bg-green-500 text-white py-2 px-4 rounded"
                            >
                                Yes
                            </button>
                            <button
                                onClick={cancelToggle}
                                className="bg-red-500 text-white py-2 px-4 rounded"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserList;
