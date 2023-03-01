import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH: (state, action) => {
      const tempProducts = action.payload.products.filter((product) => {
        return product.name
          .toLowerCase()
          .includes(action.payload.search.toLowerCase());
      });
      state.filterProducts = tempProducts;
    },
    SORT_PRODUCTS: (state, action) => {
      console.log(action.payload);

    }
  },
});

export const { FILTER_BY_SEARCH, SORT_PRODUCTS } = filterSlice.actions;

export const selectFilterProducts = (state) => state.filter.filterProducts;

export default filterSlice.reducer;
