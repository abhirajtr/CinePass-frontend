import { FC, useEffect, useState, useRef } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/Store";
import { toast } from "sonner";

const Navbar: FC = () => {
    const [locationDropDown, setLocationDropDown] = useState<boolean>(false);
    const [profileDropDown, setProfileDropDown] = useState<boolean>(false);
    const [selectedLocation, setSelectedLocation] = useState<string>("Location");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuthenticated = useSelector((state: RootState) => state.authReducer.isAuthenticated);
    const userRole = useSelector((state: RootState) => state.authReducer.role);

    const locationRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/home");
    }
    const toggleLocationDropDown = () => {
        setLocationDropDown(!locationDropDown);
        setProfileDropDown(false);
    };

    const toggleProfileDropDown = () => {
        setProfileDropDown(!profileDropDown);
        setLocationDropDown(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        // Close dropdowns if clicking outside of them
        if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
            setLocationDropDown(false);
        }
        if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
            setProfileDropDown(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-background-100 p-3 shadow-md fixed top-0 left-0 right-0 z-50 border-b-[0.5px] border-accent-300">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="text-primary-800 font-bold text-xl">
                    <Link to="/">CinePass</Link>
                </div>

                {/* Search bar */}
                <form autoComplete="off" className="flex-grow max-w-lg mx-4 relative">

                    <input
                        id="searchInput"
                        name="searchInput"
                        type="text"
                        placeholder="Search for movie or theatre"
                        className="w-full p-2 pl-10 text-text-950 bg-background-200 placeholder-text-500 border border-secondary-50 rounded-md focus:outline-none focus:ring focus:ring-accent"
                        autoComplete="off"
                    />
                    <FaSearch className="text-text-700 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </form>

                {/* Location and profile dropdowns */}
                <div className="flex items-center space-x-4">
                    {/* Location */}
                    <div className="relative" ref={locationRef}>
                        <button
                            onClick={toggleLocationDropDown}
                            className="flex items-center w-40 text-text-950 focus:outline-none focus:ring focus:ring-accent-500"
                            aria-haspopup="true"
                            aria-expanded={locationDropDown}
                        >
                            <MdLocationOn className="mr-1" />
                            <span className="truncate">{selectedLocation}</span>
                            <IoMdArrowDropdown className="ml-1" />
                        </button>

                        {locationDropDown && (
                            <div className="absolute right-0 mt-2 w-48 bg-secondary-950 rounded-md shadow-lg py-2 z-20">
                                {["New York", "Los Angeles", "Chicago"].map((city) => (
                                    <button
                                        key={city}
                                        onClick={() => { setSelectedLocation(city); setLocationDropDown(false) }}
                                        className="block w-full text-left px-4 py-2 text-light hover:bg-accent-500"
                                    >
                                        {city}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Profile */}
                    <div className="min-w-20">
                        {isAuthenticated && userRole === "user" ?
                            <div className="relative" ref={profileRef}>
                                <button
                                    onClick={toggleProfileDropDown}
                                    className="flex items-center text-text-950 focus:outline-none focus:ring focus:ring-accent-500"
                                    aria-haspopup="true"
                                    aria-expanded={profileDropDown}
                                >
                                    <FaUserCircle className="text-2xl" />
                                    <IoMdArrowDropdown className="ml-1" />
                                </button>
                                {profileDropDown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-secondary-950 rounded-md shadow-lg py-2 z-20">

                                        <Link
                                            to="/profile"
                                            onClick={() => setProfileDropDown(false)}
                                            className="block px-4 py-2 text-text-50 hover:bg-accent-500"
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setProfileDropDown(false);
                                                toast('Are you sure you want to logout?', {
                                                    position: "top-right",
                                                    duration: Infinity, // Keeps toast until action/cancel is clicked
                                                    unstyled: true, // Keep this if you want full control of the styles
                                                    classNames: {
                                                        toast: 'bg-background-500  p-4 rounded-lg', // Main toast container styles
                                                        title: 'text-text-950 text-xl font-semibold mb-2', // Toast title
                                                        description: 'text-white text-md', // Toast description (if any)
                                                        actionButton: 'ml-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition', // Style for "Yes" button
                                                        cancelButton: 'bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition', // Style for "Cancel" button
                                                        closeButton: 'bg-lime-400 text-white p-2 rounded-full hover:bg-lime-500 transition', // Style for "Close" button if it exists
                                                    },
                                                    action: {
                                                        label: "Yes",
                                                        onClick: () => {
                                                            setProfileDropDown(false); // Close dropdown
                                                            handleLogout(); // Call the logout handler
                                                        },
                                                    },
                                                    cancel: {
                                                        label: 'Cancel',
                                                        onClick: () => console.log('Cancelled logout!'),
                                                    },
                                                });
                                            }}
                                            className="block w-full px-3 py-2 text-left text-text-50 hover:bg-accent-500"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div> :
                            <button className="text-text-950 px-3 py-1 rounded bg-pink-600"
                                onClick={() => {
                                    if (userRole) {
                                        return navigate(`${userRole}/`);
                                    } else {
                                        return navigate("/login");
                                    }
                                }}

                            >
                                Sign In
                            </button>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
