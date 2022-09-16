import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../apis/axios';
import { toast } from 'react-toastify';

export const authenticateUser = createAsyncThunk(
    'auth/authenticateUser',
    async (payload, { rejectWithValue }) => {
        const { method, endpoint, data } = payload;
        try {
            const res = await axios[method](`/${endpoint}`, data && { ...data });
            res.data?.message && toast.success(res.data?.message);
            return res.data;
        } catch (error) {
            if (!error.response) throw error;
            toast.error(error.response.data.message);
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    loading: false,
    user: null
};

export const authSlice = createSlice({
    name: 'Authentication',
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder
            .addCase(authenticateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(authenticateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload || null;

            })
            .addCase(authenticateUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
            });
    },
});

export const LoginUser = (data) => authenticateUser({ method: 'post', endpoint: 'register', data }); 

export default authSlice.reducer;
