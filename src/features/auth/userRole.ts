import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    role: string;
}

export const getRoleFromToken = (token: string): string | null => {
    try {
        const decodedToken: JwtPayload = jwtDecode(token);
        console.log(decodedToken);
        return decodedToken.role;
    } catch (error) {
        console.log(error);
        return null;
    }
}