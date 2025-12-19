import axios from 'axios';

const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, 
});

api.interceptors.request.use(request => {
    console.log('Starting Request:', request.url);
    return request;
});

export default api;