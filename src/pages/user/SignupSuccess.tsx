import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SignupSuccess: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();


    const otpVerified = location.state?.otpVerified;

    useEffect(() => {
        if (!otpVerified) {
            navigate('/signup', { replace: true });
        }
    }, [otpVerified, navigate]);

    // Auto-redirect after 5 seconds to the login page
    useEffect(() => {
        if (otpVerified) {
            const timer = setTimeout(() => {
                navigate('/login', { replace: true });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [otpVerified, navigate]);

    // If accessed directly, don't render anything
    if (!otpVerified) return null;

    return (
        <div className="flex justify-center items-center min-h-screen bg-background-50">
            <div className="bg-background-100 p-32 rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-bold text-accent-500 mb-4">Signup Successful!</h1>
                <p className="text-text-700 mb-6">
                    Your account has been created successfully. You will be redirected to the login page shortly.
                </p>

                {/* Button to navigate immediately */}
                <button
                    className="bg-secondary-500 text-text-900 px-4 py-2 rounded"
                    onClick={() => navigate('/login', { replace: true })}
                >
                    Go to Login
                </button>
            </div>
        </div>
    );
};

export default SignupSuccess;
