import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { checkAuth } from './userSlice';
import { uploadGeneralCVtoS3 } from '../../services/cvService';


export const uploadGeneralCV = createAsyncThunk(
    'cv/uploadGeneralCV',
    async ({ file }: { file: File }, { rejectWithValue, dispatch }) => {
        try {
            const result = await uploadGeneralCVtoS3(file);
            console.log('Upload result:', result);
            dispatch(checkAuth()); 
            return result;
        } catch (error) {
            if (error instanceof Error && 'response' in error) {
                return rejectWithValue((error as any).response?.data || 'Upload failed');
            }
            return rejectWithValue('Upload failed');
        }
        
    }
);

const cvSlice = createSlice({
    name: 'cv',
    initialState: {
        uploadStatus: 'idle',
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadGeneralCV.pending, (state) => {
                state.uploadStatus = 'loading';
                state.error = null;
            })
            .addCase(uploadGeneralCV.fulfilled, (state) => {
                state.uploadStatus = 'succeeded';
            })
            .addCase(uploadGeneralCV.rejected, (state, action) => {
                state.uploadStatus = 'failed';
                state.error = action.payload as string;
            });
    },
});

export default cvSlice.reducer;