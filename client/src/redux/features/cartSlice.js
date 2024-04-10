import { createSlice } from '@reduxjs/toolkit';

// Define the initial state of your cart
const initialState = {
    cartItems: [],
    totalPrice: 0,
    tax: 0,
    shipping: 0,
};

// Define a slice for the cart
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cartItems = action.payload.cartItems;
            state.totalPrice = action.payload.totalPrice;
            state.tax = action.payload.tax;
            state.shipping = action.payload.shipping;
        },
    },
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;