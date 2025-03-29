import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { generateUploadUrl, uploadFileToPresignedUrl, confirmUpload } from '../../services/cvService';

export const uploadGeneralCV = createAsyncThunk(
    'cv/uploadGeneralCV',
    async ({ file }: { file: File }, { rejectWithValue }) => {
        try {
            const presignedUrl = await generateUploadUrl(file.type);
            await uploadFileToPresignedUrl(presignedUrl, file);
            const result = await confirmUpload(file.type);
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