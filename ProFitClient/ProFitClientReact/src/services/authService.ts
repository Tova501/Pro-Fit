import axiosHttp from './axioshttp';
import User from '../models/userTypes';
import { LoginRequest, RegisterRequest, AuthResponse } from '../models/authTypes';
import axios from 'axios';

export const login = async (credentials: LoginRequest): Promise<User> => {
    try {
        const response = await axiosHttp.post<AuthResponse>(`auth/login`, credentials);
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
        const response = await axiosHttp.post<AuthResponse>(`auth/register`, userData);
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
        const response = await axiosHttp.get<User>(`auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        localStorage.removeItem('token');
        throw error;
    }
};
