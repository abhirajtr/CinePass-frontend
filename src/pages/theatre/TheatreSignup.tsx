import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AxiosError } from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from 'yup';
import { guestApi } from "../../features/guestApi";

const TheatreSignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    phone: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be 10 digits')
        .required('Required'),
    location: Yup.string()
        .min(2, 'Location must be at least 2 characters')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Password is too short - should be 6 characters minimum.')
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required'),
});


const TheatreSignup: FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (name: string, email: string, phone: string, location: string, password: string, confirmPassword: string) => {
        console.log({ name, email, phone, location, password, confirmPassword });
        try {
            const { data } = await guestApi.post('/theatre/signup', { name, email, phone, location, password, confirmPassword });
            toast.success(data.message);
            navigate('/theatre/signup/verify-otp', { state: { email }, replace: true });
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                return toast.error(error.response?.data.message);
            }
            toast.error('An unexpected error occured');
        }
    };

    return (
        <div className="bg-background-50 min-h-screen flex justify-center items-center">
            <div className="bg-background-100 p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-text-950 text-2xl font-bold mb-2">Signup for Theatre</h1>
                <Formik
                    initialValues={{ name: '', email: '', phone: '', location: '', password: '', confirmPassword: '' }}
                    validationSchema={TheatreSignupSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        handleSubmit(values.name, values.email, values.phone, values.location, values.password, values.confirmPassword);
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form autoComplete="off">
                            {/* Name Field */}
                            <div className="mb-2">
                                <label htmlFor="name" className="text-text-950 block mb-1">Name</label>
                                <Field
                                    type="text"
                                    name="name"
                                    className="text-text-950 bg-background-50 border border-secondary-200 p-2 w-full focus:outline-none focus:ring-1"
                                />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Email Field */}
                            <div className="mb-2">
                                <label htmlFor="email" className="text-text-950 block mb-1">Email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    className="text-text-950 bg-background-50 border border-secondary-200 p-2 w-full focus:outline-none focus:ring-1"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Phone Field */}
                            <div className="mb-2">
                                <label htmlFor="phone" className="text-text-950 block mb-1">Phone</label>
                                <Field
                                    type="text"
                                    name="phone"
                                    className="text-text-950 bg-background-50 border border-secondary-200 p-2 w-full focus:outline-none focus:ring-1"
                                />
                                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Location Field */}
                            <div className="mb-2">
                                <label htmlFor="location" className="text-text-950 block mb-1">Location</label>
                                <Field
                                    type="text"
                                    name="location"
                                    className="text-text-950 bg-background-50 border border-secondary-200 p-2 w-full focus:outline-none focus:ring-1"
                                />
                                <ErrorMessage name="location" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Password Field */}
                            <div className="mb-2 relative">
                                <label htmlFor="password" className="text-text-950 block mb-1">Password</label>
                                <Field
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    autoComplete="new-password"
                                    className="text-text-950 bg-background-50 border border-secondary-200 p-2 w-full focus:outline-none focus:ring-1"
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-10 text-text-900 cursor-pointer"
                                >
                                    <FontAwesomeIcon icon={!showPassword ? faEye : faEyeSlash} />
                                </span>
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Confirm Password Field */}
                            <div className="mb-2 relative">
                                <label htmlFor="confirmPassword" className="text-text-950 block mb-1">Confirm Password</label>
                                <Field
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    className="text-text-950 bg-background-50 border border-secondary-200 p-2 w-full focus:outline-none focus:ring-1"
                                />
                                <span
                                    className="text-text-900 absolute top-10 right-3 cursor-pointer"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    <FontAwesomeIcon icon={!showConfirmPassword ? faEye : faEyeSlash} />
                                </span>
                                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="bg-primary-500 text-white p-2 w-full rounded-lg mt-4 focus:outline-none focus:ring-2"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Signup'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default TheatreSignup;
