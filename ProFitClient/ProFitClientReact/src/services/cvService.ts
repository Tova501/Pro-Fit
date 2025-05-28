import axiosHttp from './axiosHttp';
import store from '../redux/store';
import { Application } from '../models/applicationType';
import { fetchJobs } from '../redux/slices/jobSlice';
import axios from 'axios';

export const getCV = async (id: number) => {
    try {
        const response = await axiosHttp.get(`/cv/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching CV:', error);
        throw error;
    }
};

const generateUploadUrl = async (contentType: string) => {
    const response = await axiosHttp.post(
        `/cv/generate-upload-url`,
        { contentType },
        {
            headers: {
                'Content-Type': 'application/json'
            },
        }
    );
    console.log(response.data);
    return response.data.presignedUrl || response.data;
};

export const generateViewUrl = async (cvId: number) => {
    const response = await axiosHttp.post(
        `/cv/generate-view-url/${cvId}`
    );
    console.log("generateViewUrl", response.data);
    return response.data.presignedUrl || response.data;
};

const uploadFileToPresignedUrl = async (presignedUrl: string, file: File) => {
    console.log(presignedUrl)
    await axios.put(presignedUrl, file, {
        headers: {
            'Content-Type': file.type,
        },
    });
};

const confirmUpload = async (contentType: string) => {
    console.log("confirmUpload");
    const response = await axiosHttp.post(
        `/cv/confirm-upload`,
        { contentType }
    );
    return response.data;
};

export const getUpdateUrl = async (id: number) => {
    try {
        const response = await axios.put(`/cv/${id}`);
        return response.data.presignedUrl || response.data;
    } catch (error) {
        console.error('Error updating CV:', error);
        throw error;
    }
};

export const deleteCV = async (id: string) => {
    try {
        const response = await axiosHttp.delete(`/cv/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting CV:', error);
        throw error;
    }
};

export const getGeneralCV = async () => {
    try {
        const userId = store.getState().user.currentUser?.id;
        const response = await axiosHttp.get(`/cv/general/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching general CV:', error);
        throw error;
    }
}

export const getAIAnalisis = async (application: Application) => {
    try {
        const cvUrl = await generateViewUrl(application.cv.id);
        await store.dispatch(fetchJobs());
        console.log("cvUrl", cvUrl);
        const response = await axios.post(
            `https://profit-ai-agent.onrender.com/ai-analyzer`,
            {
                pdf_url: cvUrl,
                job: JSON.stringify(store.getState().job.jobs.find(job => job.id == application.jobId)),
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return JSON.parse(response.data.response);
    } catch (error) {
        console.error('Error fetching AI analysis:', error);
        throw error;
    }
};

export const uploadGeneralCVtoS3 = async (file: File) => {
    const presignedUrl = await generateUploadUrl('application/pdf');
    await uploadFileToPresignedUrl(presignedUrl, file);
    const result = await confirmUpload(file.type);
    return result;
}

const generateUpdateUrl = async () => {
    const response = await axios.post(
        `/cv/generate-update-url`
    );
    return response.data.presignedUrl || response.data;
}

export const updateGeneralCV = async (file: File) => {
    const presignedUrl = await generateUpdateUrl();
    await uploadFileToPresignedUrl(presignedUrl, file);
    const result = await confirmUpload(file.type);
    return result;
}