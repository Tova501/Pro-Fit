import axios from 'axios';
import { getToken } from './authService';

const API_URL = `${import.meta.env.VITE_REACT_APP_API_URL}/api/application`;

export const getJobApplications = async (jobId: number | undefined) => {
    try {
        console.log("jobId in service", jobId);
        const response = await axios.get(`${API_URL}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
            params: jobId !== undefined ? { jobId } : {},
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching job applications:', error);
        throw error;
    }
};

export const addApplicationToFavorites = async (applicationId: number): Promise<void> => {
    try {
        const response = await axios.post(`${API_URL}/${applicationId}/favorite`, );
        console.log('Application added to favorites:', response.data);
    } catch (error) {
        console.error('Error adding application to favorites:', error);
        throw error;
    }
};

export const removeApplicationFromFavorites = async (applicationId: number): Promise<void> => {
    try {
        const response = await axios.delete(`${API_URL}/${applicationId}/favorite`);
        console.log('Application removed from favorites:', response.data);
    } catch (error) {
        console.error('Error removing application from favorites:', error);
        throw error;
    }
};