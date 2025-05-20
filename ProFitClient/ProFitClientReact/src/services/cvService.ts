import axios from 'axios';
import { getToken } from './authService';
import store from '../redux/store';

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
const API_URL = `${BASE_URL}/api`; 

export const getCV = async (id: number) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/cv/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching CV:', error);
        throw error;
    }
};

export const generateUploadUrl = async (contentType: string) => {
    const response = await axios.post(
        `${API_URL}/cv/generate-upload-url`,
        { contentType }, 
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
        }
    );
    console.log(response.data);
    return response.data.presignedUrl || response.data;
};

export const generateViewUrl = async (cvId:number) => {
    const response = await axios.post(
        `${API_URL}/cv/generate-view-url/${cvId}`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );
    console.log("generateViewUrl", response.data);
    return response.data.presignedUrl || response.data;
};

export const uploadFileToPresignedUrl = async (presignedUrl: string, file: File) => {
    console.log(presignedUrl)
    await axios.put(presignedUrl, file, {
        headers: {
            'Content-Type': file.type,
        },
    });
};

export const confirmUpload = async (contentType: string) => {
    console.log("confirmUpload");
    const response = await axios.post(
        `${API_URL}/cv/confirm-upload`,
        {  contentType},
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );
    return response.data;
};

export const updateCV = async (id: string, cvData: any) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`${API_URL}/cv/${id}`, cvData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating CV:', error);
        throw error;
    }
};

export const deleteCV = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/cv/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting CV:', error);
        throw error;
    }
};

export const getGeneralCV = async () => {
    try {
        const userId = store.getState().user.currentUser?.id;
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/cv/general/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching general CV:', error);
        throw error;
    }
}