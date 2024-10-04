import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginSuccess } from "./authSlice";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { guestApi } from "../guestApi";


export const login = createAsyncThunk(
    'auth/login',
    async (loginData: { email: string, password: string }, { dispatch }) => {
        try {
            const response = await guestApi.post(`/user/login`, loginData, { withCredentials: true });
            toast.success(response.data?.message);
            dispatch(loginSuccess(response.data.accessToken));
            console.log(response);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message);
            }
            console.log(error);
        }
    }
)

export const adminLogin = createAsyncThunk(
    'auth/adminLogin',
    async (loginData: { email: string, password: string }, { dispatch }) => {
        try {
            const response = await guestApi.post(`/admin/login`, loginData, { withCredentials: true });
            toast.success(response.data?.message);
            dispatch(loginSuccess(response.data.accessToken));
            console.log(response);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message);
            }
            console.log(error);
        }
    }
)
export const theatreLogin = createAsyncThunk(
    'auth/theatreLogin',
    async (loginData: { email: string, password: string }, { dispatch }) => {
        try {
            const response = await guestApi.post(`/theatre/login`, loginData, { withCredentials: true });
            toast.success(response.data?.message);
            dispatch(loginSuccess(response.data.accessToken));
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message);
            }
            console.log(error);
        }
    }
)