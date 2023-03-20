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

      let tempProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(search.toLowerCase());
      });
      state.filterProducts = tempProducts;
    },
    SORT_PRODUCTS: (state, action) => {
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
    FILTER_BY_CATEGORY: (state, action) => {
      const { products, cat } = action.payload;
      let tempProducts = [];
      if (cat === "Все категории") {
        tempProducts = products;
      } else {
        tempProducts = products.filter((product) => product.category === cat);
      }
      state.filterProducts = tempProducts;
    },
    FILTER_BY_BRAND: (state, action) => {
      const { products, brand } = action.payload;
      let tempProducts = [];
      if (brand === "Все брэнды") {
        tempProducts = products;
      } else {
        tempProducts = products.filter((product) => product.brand === brand);
      }
      state.filterProducts = tempProducts;
    },
  },
});

export const { FILTER_BY_SEARCH, SORT_PRODUCTS, FILTER_BY_CATEGORY, FILTER_BY_BRAND } =
  filterSlice.actions;

export const selectFilterProducts = (state) => state.filter.filterProducts;

export default filterSlice.reducer;
