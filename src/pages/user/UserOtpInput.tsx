import axios, { AxiosError } from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



const UserOtpInput: React.FC = () => {
    const [otp, setOtp] = useState<string[]>(['', '', '', '']);
    const t = localStorage.getItem('otpTimer');
    const [timer, setTimer] = useState<number>(Number(t));
    const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);
    const inputsRef = useRef<HTMLInputElement[]>([]); // Refs for input fields
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;

    useEffect(() => {
        if (!email) {
            navigate("/signup", { replace: true });
        }
    }, [email, navigate]);

    useEffect(() => {
        if (location.state?.otpVerified) {
            navigate("/signup-success", { replace: true });
        }
    }, [location.state?.otpVerified, navigate]);

    useEffect(() => {
        const storedTimer = localStorage.getItem('otpTimer');
        const savedTime = localStorage.getItem('otpTimestamp');


        if (storedTimer && savedTime) {
            const currentTime = Date.now();
            const timePassed = Math.floor((currentTime - parseInt(savedTime)) / 1000); // Time passed in seconds
            const remainingTime = parseInt(storedTimer) - timePassed; // Remaining time


            if (remainingTime > 0) {
                setTimer(remainingTime);
                setIsResendDisabled(true);
            } else {
                setTimer(0);
                setIsResendDisabled(false); // Enable resend button if time is up
            }
        } else {
            // If no stored time is found, reset to allow OTP resend
            setTimer(0);
            setIsResendDisabled(false);
        }
    }, []);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => {
                    const newTime = prev - 1;
                    localStorage.setItem('otpTimer', newTime.toString()); // Store the updated timer value
                    return newTime;
                });
            }, 1000);

            localStorage.setItem('otpTimestamp', Date.now().toString());

            return () => clearInterval(interval);
        } else {
            setIsResendDisabled(false);
            localStorage.removeItem('otpTimer');
            localStorage.removeItem('otpTimestamp');
        }
    }, [timer]);



    if (!email) {
        return null; // Render nothing until redirect happens
    }


    const handleChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value;

        if (value.length === 1 && index < 3) {
            // Move focus to the next input if the current one is filled
            inputsRef.current[index + 1]?.focus();
        }

        setOtp(newOtp);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            // Move focus to the previous input on backspace if the current one is empty
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async () => {
        const otpValue = otp.join(''); // Combine OTP digits into one string
        // onSubmitOtp(otpValue); // Trigger callback with OTP
        try {
            const response = await axios.post('http://localhost:3000/user/verify-signup', { email, otp: otpValue });
            toast.success(response.data.message);
            navigate("/signup-success", { state: { otpVerified: true }, replace: true });
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message);
            } else {
                toast.error('An unexpected error occured');
            }
        }

    };
    const handleResendOtp = async () => {
        try {
            const response = await axios.post('http://localhost:3000/user/resend-otp', { email });
            setTimer(60);
            setIsResendDisabled(true);
            toast.success(response.data.message);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            } else {
                toast.error('An unexpected error occured');
            }
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-background-50">
            <div className="bg-background-100 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-text-950 text-2xl font-bold mb-2">Enter OTP</h1>

                <div className="mb-4 text-text-900">
                    <p>We have sent a 4-digit OTP to your email: <span className="font-bold">{email}</span></p>
                </div>

                <div className="flex justify-center mb-4 space-x-2">
                    {otp.map((_, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1} // Restrict to a single digit
                            className="w-12 h-12 text-center text-text-950 bg-background-300 border border-secondary-200 rounded-lg text-xl"
                            value={otp[index]}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => (inputsRef.current[index] = el!)} // Store ref for each input
                        />
                    ))}
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-primary-600 text-white p-2 rounded mt-4"
                    disabled={otp.some((digit) => digit === '')} // Disable if any input is empty
                >
                    Submit OTP
                </button>

                <div className='mt-4 text-center flex items-center min-h-16'>
                    {isResendDisabled &&
                        <p className='text-text-950 mr-2'>
                            You can resend OTP in {timer} seconds
                        </p>
                    }
                    {!isResendDisabled &&
                        <button
                            onClick={handleResendOtp}
                            className='bg-secondary-700 text-text-950 rounded p-2 mt-2'
                        >
                            Resend OTP
                        </button>}
                </div>
            </div>
        </div>
    );
};

export default UserOtpInput;
