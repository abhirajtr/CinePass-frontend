import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const TheatreSignupSuccess: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isVerified = location.state?.verified || false;
    console.log(isVerified);

    const handleLoginRedirect = () => {
        navigate('/theatre/login', { replace: true });
    };
    useEffect(() => {
        if (!isVerified) {
            return navigate("/theatre/login", { replace: true });
        }
    }, [isVerified, navigate, location])



    return (
        <div className="flex justify-center items-center min-h-screen bg-background-50">
            <div className="bg-background-100 p-8 rounded-lg shadow-lg text-center w-full max-w-md">
                <div className="flex justify-center mb-4">
                    <FaCheckCircle className="text-green-500 text-6xl" />
                </div>
                <h1 className="text-text-950 text-2xl font-bold mb-2">Registration Successful</h1>
                <p className="text-text-900 mb-4">Your theatre account has been successfully created.</p>
                <p className="text-text-900 mb-6">
                    You may now log in to your account. Please note that access to manage your theatre will require approval from an administrator. You will be notified once your account has been approved.
                </p>

                <button
                    onClick={handleLoginRedirect}
                    className="w-full bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition-all duration-200"
                >
                    Proceed to Login
                </button>
            </div>
        </div>
    );
};

export default TheatreSignupSuccess;
