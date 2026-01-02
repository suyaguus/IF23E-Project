import axios, { AxiosError } from 'axios';

interface ApiErrorResponse {
    success: boolean;
    message: string;
    error?: string;
}

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('user');
            if (user) {
                const userData = JSON.parse(user);
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

api.interceptors.response.use(
    (response) => {
        console.log('Response:', response.status, response.config.url);
        return response;
    },
    (error: AxiosError<ApiErrorResponse>) => {
        console.error('Response error:', error.response?.status, error.config?.url);

        if (error.response) {
            const { status, data } = error.response;

            switch (status) {
                case 401:
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('user');
                        window.location.href = '/auth/login';
                    }
                    break;
                case 403:
                    console.error('Access forbidden');
                    break;
                case 404:
                    console.error('Resource not found');
                    break;
                case 500:
                    console.error('Server error');
                    break;
            }

            return Promise.reject(data);
        } else if (error.request) {
            console.error('No response from server');
            return Promise.reject({
                success: false,
                message: 'Tidak dapat terhubung ke server. Pastikan backend berjalan di ' + baseURL
            } as ApiErrorResponse);
        } else {
            console.error('Request setup error:', error.message);
            return Promise.reject({
                success: false,
                message: error.message
            } as ApiErrorResponse);
        }
    }
);

export const fetcher = (url: string) => api.get(url).then((res) => res.data);
export default api;