import { FC, ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface LayoutProps {
    children: ReactNode;
}

const UserLayout: FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-background-50 text-text">
            <Navbar />
            <main className="flex-grow bg-background-50">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default UserLayout;
