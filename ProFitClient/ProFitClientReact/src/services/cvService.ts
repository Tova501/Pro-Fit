import axios from 'axios';

const API_URL = 'http://localhost:7131/api';

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

export const uploadCV = async (cvData: any, jobId: number) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/job/${jobId}/apply`, cvData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating CV:', error);
        throw error;
    }
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
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${API_URL}/cv/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting CV:', error);
        throw error;
    }
};
