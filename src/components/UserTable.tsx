import React, { useEffect } from 'react'

interface User {
    userId: string;
    username: string;
    email: string;
    phone: string;
    createdAt: string;
    isBlocked: boolean;
}
interface UserTableProps {
    users: User[];
    toggleBlockStatus: (userId: string) => void; // Prop to toggle block/unblock
}
const UserTable: React.FC<UserTableProps> = ({ users, toggleBlockStatus }) => {

    useEffect(() => {
        
    }, [users])

    return (
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
    )
}

export default UserTable