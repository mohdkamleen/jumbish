import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from '../../apis/axios';



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
    user: {
        cart: []
    }
};

export const authSlice = createSlice({
    name: 'Authentication',
    initialState,
    reducers: {
        addCart(state, action) {
            state.user?.cart?.push(action.payload)
        },
        removeCart(state, action) {
            state.user?.cart.splice(action.payload, 1)
        },
        clearUser(state, action) {
            state.user = {
                cart: []
            }
        }
    },
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
                state.user = action.payload || null;
            });
    },
});



export const LoginUser = (data) => authenticateUser({ method: 'post', endpoint: 'register', data });
export const PatchData = (data) => authenticateUser({ method: 'patch', endpoint: 'update', data });
export const AddCart = (data) => authenticateUser({ method: 'patch', endpoint: 'cart', data });

export default authSlice.reducer;
export const { addCart, removeCart, clearUser } = authSlice.actions