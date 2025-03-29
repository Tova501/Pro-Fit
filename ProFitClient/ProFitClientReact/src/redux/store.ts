import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import jobReducer from './slices/jobSlice';
import cvReducer from './slices/cvSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        job: jobReducer,
        cv: cvReducer
    }, 
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


export default store;