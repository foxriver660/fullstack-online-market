import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    STORE_PRODUCTS: (state, action) => {
      state.products = action.payload;
    },
    GET_PRICE_RANGE: (state, action) => {
      console.log(action)
    },
  },
});

export const { STORE_PRODUCTS, GET_PRICE_RANGE  } = productSlice.actions;

export const selectProduct = (state) => state.product.products;

export default productSlice.reducer;
