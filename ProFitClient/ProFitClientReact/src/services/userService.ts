import axios from "axios";
import User, { emptyUserModel, UserPutModel } from "../models/userTypes";
import { getToken } from "./authService";
import store from "../redux/store";

//const API_URL = 'https://localhost:7131/api/user'; 
const API_URL = "https://pro-fit-g87u.onrender.com/api/user";
export const updateUserDetails = async (userData:UserPutModel) => {
    try {
        const currentUser:User = store.getState().user.currentUser || emptyUserModel;
        console.log("update user details in service", currentUser.id, userData)
        const response = await axios.put<User>(`${API_URL}/${currentUser.id}/personal-details`, userData, {
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

