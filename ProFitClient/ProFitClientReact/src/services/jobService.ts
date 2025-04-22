import axios from 'axios';
import { getToken } from './authService';
import { JobPostModel } from '../models/jobTypes';

const API_URL = 'https://pro-fit-g87u.onrender.com/api/job'; 

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

// Apply to a job without a CV
export const applyToJob = async (jobId: number) => {
    try {
        const response = await axios.post(
            `${API_URL}/${jobId}/Apply`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error applying to job:', error);
        throw error;
    }
};

// Get Presigned URL for uploading a CV
export const getPresignedUrlForCV = async (jobId: number, contentType: string) => {
    try {
        const response = await axios.post(
            `${API_URL}/${jobId}/CreatePresignedUrlForCV`,
            { contentType },
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error getting presigned URL:', error);
        throw error;
    }
};

// Apply to a job with a CV
export const applyToJobWithCV = async (jobId: number, contentType: string) => {
    try {
        const response = await axios.post(
            `${API_URL}/${jobId}/ConfirmCVUploadAndApply`,
            { contentType },
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error applying to job with CV:', error);
        throw error;
    }
};