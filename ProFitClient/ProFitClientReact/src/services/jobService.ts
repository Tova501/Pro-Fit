import axios from 'axios';
import { JobPostModel } from '../models/jobTypes';
import axiosHttp from './axiosHttp';

// קבלת כל המשרות
export const getAllJobs = async () => {
    try {
        const response = await axiosHttp.get('job')
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
        const response = await axiosHttp.post('job', jobData);
        return response.data;
    } catch (error) {
        console.error('Error adding job:', error);
        throw error;
    }
};

// עדכון משרה קיימת
export const updateJob = async (jobId: number, jobData: JobPostModel) => {
    try {
        const response = await axiosHttp.put(`job/${jobId}`, jobData);
        return response.data;
    } catch (error) {
        console.error('Error updating job:', error);
        throw error;
    }
};

// מחיקת משרה
export const deleteJob = async (jobId: number) => {
    try {
        const response = await axiosHttp.delete(`job/${jobId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting job:', error);
        throw error;
    }
};

// Apply to a job without a CV
export const applyToJob = async (jobId: number) => {
    try {
        const response = await axiosHttp.post(
            `job/${jobId}/Apply`, {});
        return response.data;
    } catch (error) {
        console.error('Error applying to job:', error);
        throw error;
    }
};

// Get Presigned URL for uploading a CV
const getPresignedUrlForCV = async (jobId: number, contentType: string) => {
    try {
        const response = await axiosHttp.post(
            `job/${jobId}/CreatePresignedUrlForCV`,
            { contentType },
            {
                headers: {
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
export const applyToJobWithCV = async (jobId: number, file: File) => {
    try {
        const contentType:string = file.type;

        const presignedUrl = await getPresignedUrlForCV(jobId, contentType);
        if (!presignedUrl) {
            throw new Error('Failed to get presigned URL for CV upload');
        }
        await axios.post(presignedUrl, file)
        const response = await axiosHttp.post(
            `job/${jobId}/ConfirmCVUploadAndApply`,
            { contentType },
            {
                headers: {
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


export const getJobApplications = async (jobId: number) => {
    try {
        const response = await axiosHttp.get(`job/${jobId}/applications`);
        return response.data;
    } catch (error) {
        console.error('Error fetching job applications:', error);
        throw error;
    }
};

export const changeJobStatus = async (jobId: number) =>
{
    try {
        const response = await axiosHttp.put(`job/${jobId}/change-status`,{});
        return response.data;
    } catch (error) {
        console.error('Error changing job status:', error);
        throw error;
    }
}