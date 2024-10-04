import axios from "axios";
console.log(process.env.BASE_URL);

export const guestApi = axios.create({
    baseURL: process.env.BASE_URL,
    withCredentials: true,
});