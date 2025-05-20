import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getJobApplications } from '../../services/applicationService';
import { addApplicationToFavorites, removeApplicationFromFavorites } from '../../services/applicationService';

interface ApplicationState {
    applications: any[];
    loading: boolean;
    error: string | null;
}

const initialState: ApplicationState = {
    applications: [],
    loading: false,
    error: null,
};

export const fetchApplications = createAsyncThunk(
    'applications/fetchApplications',
    async (jobId:number, { rejectWithValue }) => {
        try {
            return await getJobApplications(jobId);
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch applications');
        }
    }
);

export const markAsFavorite = createAsyncThunk(
    'applications/markAsFavorite',
    async (applicationId: number, { rejectWithValue }) => {
        try {
            return await addApplicationToFavorites(applicationId);
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to mark as favorite');
        }
    }
);

export const unmarkAsFavorite = createAsyncThunk(
    'applications/unmarkAsFavorite',
    async (applicationId: number, { rejectWithValue }) => {
        try {
            return await removeApplicationFromFavorites(applicationId);
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to unmark as favorite');
        }
    }
);

const applicationSlice = createSlice({
    name: 'applications',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchApplications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchApplications.fulfilled, (state, action) => {
                state.loading = false;
                state.applications = action.payload;
            })
            .addCase(fetchApplications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(markAsFavorite.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(markAsFavorite.fulfilled, (state, action) => {
                state.loading = false;
                const application = state.applications.find(app => app.id === action.meta.arg);
                if (application) {
                    application.isFavorite = true;
                }
            })
            .addCase(markAsFavorite.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(unmarkAsFavorite.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(unmarkAsFavorite.fulfilled, (state, action) => {
                state.loading = false;
                const application = state.applications.find(app => app.id === action.meta.arg);
                if (application) {
                    application.isFavorite = false;
                }
            })
            .addCase(unmarkAsFavorite.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default applicationSlice.reducer;