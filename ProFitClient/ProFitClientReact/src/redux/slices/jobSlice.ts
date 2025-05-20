import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllJobs, addJob, updateJob, deleteJob, changeJobStatus } from '../../services/jobService';
import { Job, JobPostModel } from '../../models/jobTypes';

interface JobState {
    jobs: Job[];
    loading: boolean;
    error: string | null;
}

const initialState: JobState = {
    jobs: [],
    loading: false,
    error: null,
};

// Async thunks
export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
    const response = await getAllJobs();
    return response;
});

export const createJob = createAsyncThunk('jobs/createJob', async (jobData: JobPostModel) => {
    const response = await addJob(jobData);
    return response;
});

export const editJob = createAsyncThunk('jobs/editJob', async ({ jobId, jobData }: { jobId: number, jobData: any }) => {
    try {
        const response = await updateJob(jobId, jobData);
        return response;
    }
    catch (error) {
        throw error;
    }
});

export const removeJob = createAsyncThunk('jobs/removeJob', async (jobId: number) => {
    const response = await deleteJob(jobId);
    return response;
});

export const toggleJobStatus = createAsyncThunk(
    'job/toggleJobStatus',
    async ({ jobId }: { jobId: number; isActive: boolean }) => {
        const response = await changeJobStatus(jobId)
        if (!response.ok) {
            throw new Error('Failed to update job status');
        }
        return response.data;
    }
);


// Slice
const jobSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch jobs';
            })
            .addCase(createJob.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createJob.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs.push(action.payload);
            })
            .addCase(createJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create job';
            })
            .addCase(editJob.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editJob.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.jobs.findIndex(job => job.id === action.payload.id);
                if (index !== -1) {
                    state.jobs[index] = action.payload;
                }
            })
            .addCase(editJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to edit job';
            })
            .addCase(removeJob.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeJob.fulfilled, (state, action) => {
                console.log('Job removed:', action.payload);
                state.loading = false;
                state.jobs = state.jobs.filter(job => job.id !== action.payload.id);
            })
            .addCase(removeJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to remove job';
            })
            .addCase(toggleJobStatus.fulfilled, (state, action) => {
                const index = state.jobs.findIndex(job => job.id === action.payload.id);
                if (index !== -1) {
                    state.jobs[index].isActive = action.payload.isActive;
                }
                action.payload.isActive = action.payload.job.isActive;
            });
    },
});

export default jobSlice.reducer;