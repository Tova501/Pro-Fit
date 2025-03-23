// userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register, logout } from '../../services/authService';
import { LoginRequest, RegisterRequest } from '../../models/authTypes';
import User from '../../models/userType';

// Async thunk for login
export const loginUser = createAsyncThunk('user/login', async (credentials: LoginRequest):Promise<User> => {
    const user = await login(credentials);
    if (!user) {
        throw new Error('Login failed');
    }
    return user;
});

// Async thunk for registration
export const registerUser = createAsyncThunk('user/register', async (userData: RegisterRequest):Promise<User> => {
    const user = await register(userData);
    if (!user) {
        throw new Error('Registration failed');
    }
    return user;
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
                state.error = action.error.message; // עדכון שגיאה במקרה של כישלון
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.currentUser = null; // אפס את המידע על המשתמש
                state.isLoggedIn = false; // עדכון מצב הכניסה
                state.error = null; // אפס שגיאות
            });
    },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
