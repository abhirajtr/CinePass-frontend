// import axios, { AxiosError } from 'axios';
import React, { useState, useRef, useEffect } from 'react';
// import { toast } from 'sonner';

interface OtpInputProps {
    email: string;
    submitAction: (otp: string) => void;
    resendAction: () => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ email, submitAction, resendAction }) => {
    const [otp, setOtp] = useState<string[]>(['', '', '', '']);
    const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);
    const [timer, setTimer] = useState<number>(60);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (isResendDisabled) {
            const interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        setIsResendDisabled(false);
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isResendDisabled]);

    const handleChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value;

        // Move focus to the next input
        if (value.length === 1 && index < 3) {
            inputsRef.current[index + 1]?.focus();
        }

        setOtp(newOtp);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        // Move focus to the previous input on backspace
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async () => {
        const otpValue = otp.join('');
        submitAction(otpValue);
    };

    const handleResendOtp = async() => {
        await resendAction();
        setIsResendDisabled(true);
        setTimer(60);
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
                            maxLength={1}
                            className="w-12 h-12 text-center text-text-950 bg-background-300 border border-secondary-200 rounded-lg text-xl"
                            value={otp[index]}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => (inputsRef.current[index] = el)}
                        />
                    ))}
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-primary-600 text-white p-2 rounded mt-4"
                    disabled={otp.some((digit) => digit === '')}
                >
                    Submit OTP
                </button>

                <div className='mt-4 text-center flex items-center min-h-16'>
                    {isResendDisabled ? (
                        <p className='text-text-950 mr-2'>
                            You can resend OTP in {timer} seconds
                        </p>
                    ) : (
                        <button
                            onClick={handleResendOtp}
                            className='bg-secondary-700 text-text-950 rounded p-2 mt-2'
                        >
                            Resend OTP
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OtpInput;
