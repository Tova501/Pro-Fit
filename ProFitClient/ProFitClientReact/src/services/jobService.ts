import axios from 'axios';
import { getToken } from './authService';
import { JobPostModel } from '../models/jobTypes';

const API_URL = 'https://localhost:7131/api/Job'; // עדכן את ה-URL לפי השרת שלך

// קבלת כל המשרות
export const getAllJobs = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: { 
                Authorization: `Bearer ${getToken()}` 
            },
        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
}; 

// הוספת משרה חדשה
export const addJob = async (jobData: JobPostModel) => {
    try {
        const response = await axios.post(API_URL, jobData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding job:', error);
        throw error;
    }
};

// עדכון משרה קיימת
export const updateJob = async (jobId: number, jobData: JobPostModel) => {
    try {
        const response = await axios.put(`${API_URL}/${jobId}`, jobData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating job:', error);
        throw error;
    }
};

// מחיקת משרה
export const deleteJob = async (jobId: number) => {
    try {
        const response = await axios.delete(`${API_URL}/${jobId}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting job:', error);
        throw error;
    }
};