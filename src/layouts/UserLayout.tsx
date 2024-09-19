import { FC } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";


const UserLayout: FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-background-50 text-text">
            <Navbar />
            <main className="flex-grow bg-background-50">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default UserLayout;
