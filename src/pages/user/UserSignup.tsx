import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    phone: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be 10 digits')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Password is too short - should be 6 characters minimum.')
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required'),
});


const UserSignup: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const isAuthenticated = useSelector((state: RootState) => state.authReducer.isAuthenticated);
    if (isAuthenticated) {
        return <Navigate to="/home" replace />
    }

    const handleSubmit = async (email: string, phone: string, password: string, confirmPassword: string) => {
        try {
            const response = await axios.post('http://localhost:3000/user/signup', { email, phone, password, confirmPassword });
            toast.success(response.data?.message);
            localStorage.setItem('otpTimer', "60");
            localStorage.setItem('otpTimestamp', Date.now().toString());
            navigate("/verify-otp", { state: { email } });
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message);
            } else {
                toast.error('An unexpected error occured');
            }
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-background-50">
            <div className="bg-background-100 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-text-950 text-2xl font-bold mb-2">Sign Up for CinePass</h1>

                {/* Standard Message */}
                <div className="mb-4   text-text-900 ">
                    <p>Welcome to CinePass! Create your account to book movie seats in theaters quickly and easily.</p>
                </div>

                <Formik
                    initialValues={{ email: '', phone: '', password: '', confirmPassword: '' }}
                    validationSchema={SignupSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        // Handle form submission (send data to backend, etc.)
                        handleSubmit(values.email, values.phone, values.password, values.confirmPassword);
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            {/* Email Field */}
                            <div className="mb-4">
                                <label htmlFor="email" className="block mb-1 text-text-950">Email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    className="text-text-950 bg-background-300 border border-secondary-200 p-2 rounded w-full"
                                    placeholder="example@gmail.com"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Phone Field */}
                            <div className="mb-4 relative">
                                <label htmlFor="phone" className="block mb-1 text-text-950">Phone</label>
                                <div className="flex items-center">
                                    <span className="bg-background-500 border border-secondary-50 p-2 rounded-l-md text-text-100">+91</span>
                                    <Field
                                        type="text"
                                        name="phone"
                                        placeholder="XXXXXXXXXX"
                                        className="text-text-950 bg-background-300 border border-secondary-200 p-2 rounded-r-md w-full"
                                    />
                                </div>
                                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Password Field */}
                            <div className="mb-4 relative">
                                <label htmlFor="password" className="block mb-1 text-text-950">Password</label>
                                <Field
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="text-text-950 bg-background-300 border border-secondary-200 p-2 rounded w-full"
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-10 cursor-pointer text-text-950"
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                </span>
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Confirm Password Field */}
                            <div className="mb-4 relative">
                                <label htmlFor="confirmPassword" className="block mb-1 text-text-950">Confirm Password</label>
                                <Field
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    className="text-text-950 bg-background-300 border border-secondary-200 p-2 rounded w-full"
                                />
                                <span
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-10 cursor-pointer text-text-950"
                                >
                                    <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
                                </span>
                                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-primary-600 text-white p-2 rounded mt-4"
                                    disabled={isSubmitting}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>

                {/* login */}
                <div className='mt-4 text-center'>
                    <p className='text-sm text-text-500'>
                        Already have an account?{' '}
                        <Link to="/login" className='text-accent-500 hover:underline'>Login</Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default UserSignup;
