import { FC, useEffect } from "react";
import OtpInput from "../user/OtpInput";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { useLocation, useNavigate } from "react-router-dom";

// const email = "abhirajtr007@gmail.com";


const TheatreVerifyOtp: FC = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || null;
    console.log(email);


    useEffect(() => {
        if (!email) {
            navigate("/theatre/signup", { replace: true });
        }
    }, [email, location, navigate])

    const submitAction = async (otp: string) => {
        try {
            const { data } = await axios.post('http://localhost:3000/theatre/signup/verify-otp', { email, otp });
            toast.success(data.message);
            navigate("/theatre/signup/success", { state: { verified: true }, replace: true })
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                if (error.status === 404) {
                    navigate("/theatre/signup", { replace: true });
                }
                return toast.error(error.response?.data.message);
            }
            toast.error('An unexpected error occured');

        }
    }
    const resendAction = async () => {
        try {
            const { data } = await axios.post('http://localhost:3000/theatre/signup/resend-otp', { email });
            toast.success(data.message);
        } catch (error) {
            if (error instanceof AxiosError) {
                return toast.error(error.response?.data.message);
            }
            toast.error('An Unexpected error occured');
        }
    }

    return (
        <OtpInput email={email} submitAction={submitAction} resendAction={resendAction} />
    )
}

export default TheatreVerifyOtp;