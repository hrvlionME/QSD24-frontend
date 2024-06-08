import axios from 'axios';
import store from './redux/store';
import { RootState } from './redux/store';
import { refreshAuthToken } from './services/auth';
import { updateToken } from './redux/userSlice';

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
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshedTokenData = await refreshAuthToken();
                const { token } = refreshedTokenData.authorization;
                store.dispatch(updateToken(token));
                const newToken = getToken();
                if (newToken) {
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                }
                return axiosClient(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);


export default axiosClient;