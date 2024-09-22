import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
});

// Request interceptor to attach the access token to headers
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Prevent infinite retries

            try {
                // Request a new access token using the refresh token
                const response = await axios.post('http://localhost:3000/user/refresh-token', {}, { withCredentials: true });

                // Assuming the response contains a new access token
                const { accessToken } = response.data;

                // Save the new access token to local storage
                localStorage.setItem('accessToken', accessToken);

                // Update the Authorization header for the original request
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

                // Retry the original request with the new access token
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Handle refresh token failure (e.g., redirect to login)
                console.error("Refresh token failed:", refreshError);
                // Optionally, dispatch logout action or redirect to login
            }
        }

        // If the error is not a 401 or the refresh fails, reject the error
        return Promise.reject(error);
    }
);

export default axiosInstance;
