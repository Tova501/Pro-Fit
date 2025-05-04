import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import jobReducer from './slices/jobSlice';
import cvReducer from './slices/cvSlice';
import applicationReducer from './slices/applicationSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        job: jobReducer,
        cv: cvReducer,
        application: applicationReducer
    }, 
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


export default store;