import User, { emptyUserModel, UserPutModel } from "../models/userTypes";
import { getToken } from "./authService";
import store from "../redux/store";
import axiosHttp from "./axiosHttp";

export const updateUserDetails = async (userData:UserPutModel) => {
    try {
        const currentUser:User = store.getState().user.currentUser || emptyUserModel;
        console.log("update user details in service", currentUser.id, userData)
        const response = await axiosHttp.put<User>(`user/${currentUser.id}/personal-details`, userData, {
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

