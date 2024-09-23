import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Validation schema for password
const PasswordSchema = Yup.object().shape({
    password: Yup.string().min(6, 'Password is too short').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
});

interface PasswordInputProps {
    submitAction: (password: string, confirmPassword: string) => void
}

const PasswordInput: React.FC<PasswordInputProps> = ({ submitAction }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const handleSubmitPassword = async (values: { password: string, confirmPassword: string }) => {
        submitAction(values.password, values.confirmPassword);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-background-50">
            <div className="bg-background-100 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-text-950 text-xl font-bold mb-4">Reset Password</h1>
                <Formik
                    initialValues={{ password: '', confirmPassword: '' }}
                    validationSchema={PasswordSchema}
                    onSubmit={handleSubmitPassword}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-4 relative">
                                <label htmlFor="password" className="block mb-1 text-text-950">New Password</label>
                                <Field
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="w-full p-2 bg-background-50 text-text-950 border border-gray-300 rounded"
                                />
                                <span
                                    className="absolute right-3 top-10 cursor-pointer text-text-950"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEyeSlash : faEye}
                                    />
                                </span>
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4 relative">
                                <label htmlFor="confirmPassword" className="block mb-1 text-text-950">Confirm Password</label>
                                <Field
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    className="w-full p-2 bg-background-50 text-text-950 border border-gray-300 rounded"
                                />
                                <span
                                    className="absolute right-3 top-10 cursor-pointer text-text-950"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    <FontAwesomeIcon
                                        icon={showConfirmPassword ? faEyeSlash : faEye}
                                    />
                                </span>
                                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded"
                                disabled={isSubmitting}
                            >
                                Reset Password
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default PasswordInput;
