import axios from "axios";
import User from "../models/userType";
import { getToken } from "./authService";

const API_URL = 'https://localhost:7131/api/user'; 

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

