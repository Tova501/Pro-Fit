import axios from "axios";
import User, { emptyUserModel, UserPutModel } from "../models/userTypes";
import { getToken } from "./authService";
import store from "../redux/store";

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL!;
const API_URL = `${BASE_URL}/api/user`; 

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

