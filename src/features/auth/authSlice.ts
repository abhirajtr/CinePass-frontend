import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRoleFromToken } from "./userRole";


interface AuthState {
    accessToken: string | null;
    isAuthenticated: boolean;
    role: string | null;
}

const accessToken = localStorage.getItem('accessToken');
const initialState: AuthState = {
    accessToken,
    isAuthenticated: !!accessToken,
    role: accessToken ? getRoleFromToken(accessToken) : null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
            state.isAuthenticated = true;
            state.role = getRoleFromToken(action.payload);
            localStorage.setItem('accessToken', action.payload);
        },
        logout: (state) => {
            state.accessToken = null;
            state.isAuthenticated = false;
            state.role = null;
            localStorage.removeItem('accessToken');
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;