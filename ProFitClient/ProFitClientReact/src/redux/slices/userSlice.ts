// userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register, logout, getUserFromToken } from '../../services/authService';
import { LoginRequest, RegisterRequest } from '../../models/authTypes';
import User from '../../models/userType';

// Async thunk for login
export const loginUser = createAsyncThunk('user/login', async (credentials: LoginRequest): Promise<User> => {
    const user = await login(credentials);
    if (!user) {
        throw new Error('Login failed');
    }
    return user;
});

// Async thunk for registration
export const registerUser = createAsyncThunk(
    'user/register',
    async (userData: RegisterRequest, { rejectWithValue }) => {
        try {
            const user = await register(userData);
            if (!user) {
                throw new Error('Registration failed');
            }
            return user;
        } catch (error: any) {
            if (error.response && error.response.status) {
                // העברת מספר השגיאה באמצעות rejectWithValue
                return rejectWithValue({
                    statusCode: error.response.status,
                    message: error.response.data?.message || 'An error occurred',
                });
            }
            throw error; // זריקת שגיאה כללית אם אין response
        }
    }
);

export const checkAuth = createAsyncThunk('user/checkAuth', async (): Promise<User | null> => {
    try {
        const user = await getUserFromToken();
        return user;
    } catch (error) {
        return null;
    }
});

// Async thunk for logout
export const logoutUser = createAsyncThunk('user/logout', async () => {
    await logout();
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null as User | null,
        isLoggedIn: false,
        error: undefined as string | undefined | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.currentUser = action.payload; // עדכון מידע על המשתמש
                state.isLoggedIn = true; // עדכון מצב הכניסה
                state.error = null; // אפס שגיאות
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.error.message; // עדכון שגיאה במקרה של כישלון
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.currentUser = action.payload; // עדכון מידע על המשתמש שנרשם
                state.isLoggedIn = true; // עדכון מצב הכניסה
                state.error = null; // אפס שגיאות
            })
            .addCase(registerUser.rejected, (state, action) => {
                if (action.payload && (action.payload as any).message) {
                    state.error = (action.payload as any).message;
                } else {
                    state.error = 'An unknown error occurred';
                }
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.currentUser = null; // אפס את המידע על המשתמש
                state.isLoggedIn = false; // עדכון מצב הכניסה
                state.error = null; // אפס שגיאות
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                if (action.payload) {
                    state.currentUser = action.payload;
                    state.isLoggedIn = true;
                } else {
                    state.currentUser = null;
                    state.isLoggedIn = false;
                }
                state.error = null;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.currentUser = null;
                state.isLoggedIn = false;
            });
    },
});

export const { } = userSlice.actions;
export default userSlice.reducer;
