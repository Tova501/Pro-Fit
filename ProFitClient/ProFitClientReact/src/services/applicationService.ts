import axiosHttp from './axiosHttp';

export const getJobApplications = async (jobId: number | undefined) => {
    try {
        console.log("jobId in service", jobId);
        const response = await axiosHttp.get(`application`, 
        {
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
        const response = await axiosHttp.post(`application/${applicationId}/favorite`, );
        console.log('Application added to favorites:', response.data);
    } catch (error) {
        console.error('Error adding application to favorites:', error);
        throw error;
    }
};

export const removeApplicationFromFavorites = async (applicationId: number): Promise<void> => {
    try {
        const response = await axiosHttp.delete(`application/${applicationId}/favorite`);
        console.log('Application removed from favorites:', response.data);
    } catch (error) {
        console.error('Error removing application from favorites:', error);
        throw error;
    }
};