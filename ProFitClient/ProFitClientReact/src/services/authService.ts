import axios from 'axios';
import User from '../models/userTypes';
import { LoginRequest, RegisterRequest, AuthResponse } from '../models/authTypes';

// const API_URL = 'https://localhost:7131/api/auth'; 
const API_URL = 'https://pro-fit-g87u.onrender.com/api/auth'; 


export const login = async (credentials: LoginRequest): Promise<User> => {
    try {
        const response = await axios.post<AuthResponse>(`${API_URL}/login`, credentials);
        if (!response.data) {
            throw "Invalid response data";
        }
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        return user;
    }
    catch (error: unknown) {
        throw error;
    }
};

export const register = async (userData: RegisterRequest): Promise<User | undefined> => {
    try {
        const response = await axios.post<AuthResponse>(`${API_URL}/register`, userData);
        if (!response.data) {
            throw "Invalid response data";
        }
        const { token, user } = response.data;

        localStorage.setItem('token', token);
        return user;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.log("error registration", error);
        }
        throw error;
    }
};

export const logout = async () => {
    localStorage.removeItem('token');
    return Promise.resolve();
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const getUserFromToken = async (): Promise<User | null> => {
    const token = getToken();
    if (!token) {
        return null;
    }

    try {
        const response = await axios.get<User>(`${API_URL}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.log("Error fetching user from token:", error.response.data);
        }
        localStorage.removeItem('token');
        throw error;
    }
};
