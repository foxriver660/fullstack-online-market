import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH: (state, action) => {
      const { products, search } = action.payload;

      const tempProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(search.toLowerCase());
      });
      state.filterProducts = tempProducts;
    },
    SORT_PRODUCTS: (state, action) => {
      console.log(action.payload);
      const { products, sort } = action.payload;
      let tempProducts = [];
      if (sort === "latest") {
        tempProducts = [...products].sort((a, b) => {
          return a.createdAt - b.createdAt;
          
        });
      }
      if (sort === "lowest-price") {
        tempProducts = [...products].sort((a, b) => {
          return a.price - b.price;
          
        });
      }
      if (sort === "highest-price") {
        tempProducts = [...products].sort((a, b) => {
          return b.price - a.price;
          
        });
      }
      state.filterProducts = tempProducts;
    },
  },
});

export const { FILTER_BY_SEARCH, SORT_PRODUCTS } = filterSlice.actions;

export const selectFilterProducts = (state) => state.filter.filterProducts;

export default filterSlice.reducer;
