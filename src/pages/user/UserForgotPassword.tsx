import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios, { AxiosError } from 'axios';
import OtpInput from './OtpInput';
import { toast } from 'sonner';
import PasswordInput from './PasswordInput';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';

const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
});

const ForgotPassword: React.FC = () => {
    const [otpSent, setOtpSent] = useState(false);
    const [email, setEmail] = useState('');
    const [otpVerified, setOtpVerified] = useState<boolean>(false);
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: RootState) => state.authReducer.isAuthenticated);
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/home", { replace: true });
        }
    }, [isAuthenticated, navigate]);
    const handleSendOtp = async (values: { email: string }) => {
        try {
            const response = await axios.post('http://localhost:3000/user/forgot-password', values);
            console.log(response);
            toast.success(response.data.message);
            setEmail(values.email); // Store email for OTP verification
            setOtpSent(true);
        } catch (error) {
            if (error instanceof AxiosError) {
                return toast.error(error.response?.data?.message);
            }
            toast.error('An unexpected error occured');
        }
    };
    const handleSubmit = async (otp: string) => {
        try {
            const { data } = await axios.post('http://localhost:3000/user/forgot-password/verify-otp', { email, otp });
            setOtpVerified(true);
            console.log(otp);
            toast.success(data.message);
        } catch (error) {
            if (error instanceof AxiosError) {
                return toast.error(error.response?.data.message);
            }
            toast.error('An Unexpected error occured');
            console.log(error);
        }
    }
    const handleSubmitPassword = async (password: string, confirmPassword: string) => {
        try {
            console.log(email, password, confirmPassword);
            const { data } = await axios.post('http://localhost:3000/user/password-reset', { email, password, confirmPassword });
            toast.success(data.message)
            navigate("/login", { replace: true });
        } catch (error) {
            if (error instanceof AxiosError) {
                return toast.error(error.response?.data.message);
            }
            toast.error('An unexpected error occured');
            console.log(error);
        }
    }

    const handleResendOtp = async () => {
        try {
            const response = await axios.post('http://localhost:3000/user/resend-otp', { email });
             // Reset timer
            toast.success(response.data.message);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || 'Failed to resend OTP.');
            } else {
                toast.error('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <>
            {!otpSent ? (
                <div className="flex justify-center items-center min-h-screen bg-background-50">
                    <div className="bg-background-100 p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h1 className="text-text-950 text-xl font-bold mb-4">Forgot Password</h1>
                        <Formik
                            initialValues={{ email: '' }}
                            validationSchema={ForgotPasswordSchema}
                            onSubmit={handleSendOtp}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="block mb-1 text-text-950">Email</label>
                                        <Field
                                            type="email"
                                            name="email"
                                            className="w-full p-2 bg-background-50 text-text-950 border border-gray-300 rounded"
                                        />
                                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-500 text-white py-2 rounded"
                                        disabled={isSubmitting}
                                    >
                                        Send OTP
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            ) : otpVerified ?
                <PasswordInput submitAction={handleSubmitPassword} /> :
                (
                    <OtpInput email={email} submitAction={handleSubmit} resendAction={handleResendOtp} />
                )}
        </>
    );
};

export default ForgotPassword;
