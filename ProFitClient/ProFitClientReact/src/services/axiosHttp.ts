import axios from "axios"
import { getToken } from "./authService";

const axiosHttp = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_URL,
})

axiosHttp.interceptors.request.use(
    (config)=>{
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
)
export default axiosHttp;