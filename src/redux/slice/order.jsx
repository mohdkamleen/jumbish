import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    cart: []
};

export const authSlice = createSlice({
    name: 'Authentication',
    initialState,
    reducers: {
        addCart(state, action) {
            state.cart.push(action.payload)
        },
        removeCart(state, action) {
            state.cart.splice(action.payload, 1)
        },
        clearCart(state, action) {
            state.cart = []
        }
    }
});

export default authSlice.reducer;
export const { addCart,removeCart,clearCart } = authSlice.actions
