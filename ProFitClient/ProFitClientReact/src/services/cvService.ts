import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'https://pro-fit-g87u.onrender.com/api';

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
    return response.data.presignedUrl.result;
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
