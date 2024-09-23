import { FC } from "react";
import AdminSidebar from "../components/AdminSidebar"; // Import the Admin Sidebar
// import AdminFooter from "../components/AdminFooter";
import { Outlet } from "react-router-dom";

const AdminLayout: FC = () => {
    return (
        <div className="flex min-h-screen bg-gray-100 text-gray-800">
            <AdminSidebar /> {/* Render the Admin Sidebar */}
            <div className="flex flex-col flex-grow">
                <main className="flex-grow bg-gray-50 pt-4 px-4">
                    <Outlet /> {/* Render child routes */}
                </main>
                {/* <AdminFooter /> */}
            </div>
        </div>
    );
};

export default AdminLayout;
