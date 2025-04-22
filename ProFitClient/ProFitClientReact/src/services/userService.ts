import axios from "axios";
import User from "../models/userType";
import { getToken } from "./authService";

const API_URL = 'https://pro-fit-g87u.onrender.com/api/user'; 

export const updateUser = async (user:User) => {
    try {
        const response = await axios.put<User>(`${API_URL}/${user.id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

