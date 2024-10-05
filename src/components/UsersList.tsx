import React, { useEffect, useState, useRef } from 'react';
import axiosInstance from '../axiosInstance';
import { toast } from 'sonner';

interface User {
    userId: string;
    username: string;
    email: string;
    phone: string;
    createdAt: string;
    isBlocked: boolean;
}

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    // const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    // const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [usersPerPage] = useState(10);

    // Timeout reference for debouncing
    const timeoutRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async (searchTerm: string = "") => {
        // setLoading(true);
        try {
            const response = await axiosInstance.get(`/admin/users`, {
                params: {
                    page: currentPage,
                    limit: usersPerPage,
                    searchTerm,
                }
            });
            // setFilteredUsers(response.data.users);
            setUsers(response.data.users);
            setTotalPages(response.data.totalPages);
            setErrorMessage(null); // Clear any previous errors
            console.log(response);

        } catch (error) {
            console.error(error);
            setErrorMessage('Failed to fetch users');
        } finally {
            // setLoading(false);
        }
    };

    const toggleBlockStatus = (userId: string) => {
        setSelectedUserId(userId);
        setModalOpen(true);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedSearchTerm = e.target.value;
        setSearchTerm(updatedSearchTerm);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
            console.log('fetchuser');

            fetchUsers(updatedSearchTerm);
        }, 500); // 1 second debounce
    };

    const confirmToggle = async () => {
        if (selectedUserId) {
            try {
                const user = users.find(u => u.userId === selectedUserId);

                await axiosInstance.patch(`/admin/users/${selectedUserId}/block`, {
                    isBlocked: !user?.isBlocked
                });

                setUsers(prevUsers =>
                    prevUsers.map(user =>
                        user.userId === selectedUserId ? { ...user, isBlocked: !user.isBlocked } : user
                    )
                )
                toast.success('success');
                setErrorMessage(null);
            } catch (error) {
                console.error(error);
                setErrorMessage('Failed to update user status');
            } finally {
                setModalOpen(false);
                setSelectedUserId(null);
            }
        }
    };

    const cancelToggle = () => {
        setModalOpen(false);
        setSelectedUserId(null);
    };

    const selectedUser = users.find(user => user.userId === selectedUserId);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-4">User List</h2>

            {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

            <input
                type="text"
                placeholder="Search by username or email..."
                value={searchTerm}
                onChange={handleSearch} // Updated to avoid inline definition
                className="mb-4 p-2 border border-accent-200 rounded w-full bg-background-50"
            />

            <div className="overflow-x-auto">
                <table className="min-w-full bg-background-100 border border-accent-200">
                    <thead>
                        <tr className="bg-background-200">
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
                            <tr key={user.userId} className="hover:bg-background-200">
                                <td className="py-2 px-4 border-b border-accent-200">{user.username}</td>
                                <td className="py-2 px-4 border-b border-accent-200">{user.email}</td>
                                <td className="py-2 px-4 border-b border-accent-200">{user.phone}</td>
                                <td className="py-2 px-4 border-b border-accent-200">
                                    {new Date(user.createdAt).toLocaleString('en-GB', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                        hour12: true,
                                    })}
                                </td>
                                <td className="py-2 px-4 border-b border-accent-200 text-center w-32">
                                    <span className={`inline-block w-full text-center py-1 rounded 
                                        ${user.isBlocked ? 'text-red-500' : 'text-green-500'}`}>
                                        {user.isBlocked ? 'Blocked' : 'Active'}
                                    </span>
                                </td>
                                <td className="py-2 px-4 border-b border-accent-200 text-center">
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

            {/* Pagination controls */}
            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {modalOpen && selectedUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-background-200 p-6 rounded shadow-lg">
                        <h3 className="text-lg font-bold mb-4">
                            Are you sure you want to {selectedUser.isBlocked ? 'unblock' : 'block'} this user?
                        </h3>
                        <p className="mb-4">Email: {selectedUser.email}</p>
                        <div className="flex justify-between">
                            <button
                                onClick={confirmToggle}
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={cancelToggle}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserList;
