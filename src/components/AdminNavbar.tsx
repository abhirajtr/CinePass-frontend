import { FC } from "react";
import { Link } from "react-router-dom";

const AdminNavbar: FC = () => {
    return (
        <nav className="bg-blue-600 text-white p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-bold">Admin Dashboard</h1>
                <div>
                    <Link to="/admin/users" className="mx-2">Users</Link>
                    <Link to="/admin/theatres" className="mx-2">Theatres</Link>
                    <Link to="/admin/settings" className="mx-2">Settings</Link>
                    {/* Add more links as needed */}
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
