import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/Store';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from '../../features/auth/authThunks';
import { Navigate } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(6, 'Password is too short - should be 6 characters minimum.')
        .required('Required'),
});

const AdminLogin: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    // const navigate = useNavigate();

    const isAuthenticated = useSelector((state: RootState) => state.authReducer.isAuthenticated);

    if (isAuthenticated) {
        return <Navigate to="/admin" replace />
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-background-50">
            <div className="bg-background-100 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-text-950 text-2xl font-bold mb-2">CinePass</h1>

                <div className="mb-4">
                    <h3 className='font-semibold text-text-950'>Welcome back!</h3>
                </div>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={LoginSchema}
                    onSubmit={async (values) => {
                        const { email, password } = values;
                        try {
                            await dispatch(adminLogin({ email, password }));
                            // navigate("/home");
                        } catch (error) {
                            console.log(error);
                        }
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

                            {/* Password Field */}
                            <div className=" relative">
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
                            {/* <div className="">
                                <Link to="/forgot-password" className="text-accent-500 hover:underline">Forgot Password?</Link>
                            </div> */}

                            {/* Submit Button */}
                            <div className='mt-2'>
                                <button
                                    type="submit"
                                    className="w-full bg-primary-600 text-white p-2 rounded mt-4"
                                    disabled={isSubmitting}
                                >
                                    Login
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>

                {/* Signup redirect */}
                {/* <div className="mt-4 text-center">
                    <p className="text-sm text-text-500">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-accent-500 hover:underline">Sign Up</Link>
                    </p>
                </div> */}
            </div>
        </div>
    );
};

export default AdminLogin;
