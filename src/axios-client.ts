import axios from 'axios';
import store from './redux/store';
import { RootState } from './redux/store';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

const getToken = () => {
    const state: RootState = store.getState();
    return state.user.token;
};
 
axiosClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        console.log(token)
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosClient;