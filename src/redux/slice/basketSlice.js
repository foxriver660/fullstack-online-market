import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  basketItems: localStorage.getItem("basketItems") ? JSON.parse(localStorage.getItem("basketItems")) : [],
  basketTotalQuantity: 0,
  basketTotalAmount: 0,
  previousURL: "",
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    ADD_TO_BASKET(state, action) {
      const productIndex = state.basketItems.findIndex((item) => item.id === action.payload.id);

      if (productIndex >= 0) {
        state.basketItems[productIndex].basketQuantity += 1;
        toast.info(`${action.payload.name} увеличено на 1`, {
          position: "top-left",
        });
      } else {
        const tempProduct = { ...action.payload, basketQuantity: 1 };
        state.basketItems.push(tempProduct);
        toast.success(`${action.payload.name} добавлено в корзину`, {
          position: "top-left",
        });
      }

      localStorage.setItem("basketItems", JSON.stringify(state.basketItems));
    },
    DECREASE_BASKET(state, action) {
      const productIndex = state.basketItems.findIndex((item) => item.id === action.payload.id);

      if (state.basketItems[productIndex].basketQuantity > 1) {
        state.basketItems[productIndex].basketQuantity -= 1;
        toast.info(`${action.payload.name} уменьшено на 1`, {
          position: "top-left",
        });
      } else if (state.basketItems[productIndex].basketQuantity === 1) {
        const newbasketItem = state.basketItems.filter((item) => item.id !== action.payload.id);
        state.basketItems = newbasketItem;
        toast.success(`${action.payload.name} удалено из корзины`, {
          position: "top-left",
        });
      }
      localStorage.setItem("basketItems", JSON.stringify(state.basketItems));
    },
    REMOVE_FROM_BASKET(state, action) {
      const newBasketItem = state.basketItems.filter((item) => item.id !== action.payload.id);

      state.basketItems = newBasketItem;
      toast.success(`${action.payload.name} удалено из корзины`, {
        position: "top-left",
      });

      localStorage.setItem("basketItems", JSON.stringify(state.basketItems));
    },
    CLEAR_BASKET(state, action) {
      state.basketItems = [];
      toast.info(`корзина очищена`, {
        position: "top-left",
      });

      localStorage.setItem("basketItems", JSON.stringify(state.basketItems));
    },
    CALCULATE_SUBTOTAL(state, action) {
      const array = [];
      state.basketItems.map((item) => {
        const { price, basketQuantity } = item;
        const basketItemAmount = price * basketQuantity;
        return array.push(basketItemAmount);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.basketTotalAmount = totalAmount;
    },
    CALCULATE_TOTAL_QUANTITY(state, action) {
      const array = [];
      state.basketItems.map((item) => {
        const { basketQuantity } = item;
        const quantity = basketQuantity;
        return array.push(quantity);
      });
      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.basketTotalQuantity = totalQuantity;
    },
    SAVE_URL(state, action) {
      state.previousURL = action.payload;
    },
  },
});

export const {
  ADD_TO_BASKET,
  DECREASE_BASKET,
  REMOVE_FROM_BASKET,
  CLEAR_BASKET,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  SAVE_URL,
} = basketSlice.actions;

export const selectBasketItems = (state) => state.basket.basketItems;
export const selectBasketTotalQuantity = (state) => state.basket.basketTotalQuantity;
export const selectBasketTotalAmount = (state) => state.basket.basketTotalAmount;
export const selectPreviousURL = (state) => state.basket.previousURL;

export default basketSlice.reducer;
