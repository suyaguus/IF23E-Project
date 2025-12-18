import axios, { AxiosError } from 'axios';

// Type untuk error response
interface ApiErrorResponse {
    success: boolean;
    message: string;
    error?: string;
}

// Base URL dari environment variable atau default ke localhost:3001
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Create axios instance
const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Bisa tambahkan token jika diperlukan
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('user');
            if (user) {
                const userData = JSON.parse(user);
                // Jika API Anda menggunakan Bearer token
                // config.headers.Authorization = `Bearer ${userData.token}`;
            }
        }

        console.log('Request:', config.method?.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        console.log('Response:', response.status, response.config.url);
        return response;
    },
    (error: AxiosError<ApiErrorResponse>) => {
        console.error('Response error:', error.response?.status, error.config?.url);

        // Handle specific error cases
        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;

            switch (status) {
                case 401:
                    // Unauthorized - redirect to login
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('user');
                        window.location.href = '/auth/login';
                    }
                    break;
                case 403:
                    // Forbidden
                    console.error('Access forbidden');
                    break;
                case 404:
                    // Not found
                    console.error('Resource not found');
                    break;
                case 500:
                    // Server error
                    console.error('Server error');
                    break;
            }

            return Promise.reject(data);
        } else if (error.request) {
            // Request made but no response
            console.error('No response from server');
            return Promise.reject({
                success: false,
                message: 'Tidak dapat terhubung ke server. Pastikan backend berjalan di ' + baseURL
            } as ApiErrorResponse);
        } else {
            // Something else happened
            console.error('Request setup error:', error.message);
            return Promise.reject({
                success: false,
                message: error.message
            } as ApiErrorResponse);
        }
    }
);

export default api;