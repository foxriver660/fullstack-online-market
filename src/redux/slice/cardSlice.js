import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cardItems: localStorage.getItem("cardItems") ? JSON.parse(localStorage.getItem("cardItems")) : [],
  cardTotalQuantity: 0,
  cardTotalAmount: 0,
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    ADD_TO_CARD(state, action) {
      //   console.log(action.payload);
      const productIndex = state.cardItems.findIndex((item) => item.id === action.payload.id);

      if (productIndex >= 0) {
        // Item already exists in the card
        // Increase the cardQuantity
        state.cardItems[productIndex].cardQuantity += 1;
        toast.info(`${action.payload.name} increased by one`, {
          position: "top-left",
        });
      } else {
        // Item doesn't exists in the card
        // Add item to the card
        const tempProduct = { ...action.payload, cardQuantity: 1 };
        state.cardItems.push(tempProduct);
        toast.success(`${action.payload.name} added to card`, {
          position: "top-left",
        });
      }
      // save card to LS
      localStorage.setItem("cardItems", JSON.stringify(state.cardItems));
    },
    DECREASE_CARD(state, action) {
      console.log(action.payload);
      const productIndex = state.cardItems.findIndex((item) => item.id === action.payload.id);

      if (state.cardItems[productIndex].cardQuantity > 1) {
        state.cardItems[productIndex].cardQuantity -= 1;
        toast.info(`${action.payload.name} decreased by one`, {
          position: "top-left",
        });
      } else if (state.cardItems[productIndex].cardQuantity === 1) {
        const newcardItem = state.cardItems.filter((item) => item.id !== action.payload.id);
        state.cardItems = newcardItem;
        toast.success(`${action.payload.name} removed from card`, {
          position: "top-left",
        });
      }
      localStorage.setItem("cardItems", JSON.stringify(state.cardItems));
    },
    REMOVE_FROM_CARD(state, action) {
      const newcardItem = state.cardItems.filter((item) => item.id !== action.payload.id);

      state.cardItems = newcardItem;
      toast.success(`${action.payload.name} removed from card`, {
        position: "top-left",
      });

      localStorage.setItem("cardItems", JSON.stringify(state.cardItems));
    },
    CLEAR_CARD(state, action) {
      state.cardItems = [];
      toast.info(`card cleared`, {
        position: "top-left",
      });

      localStorage.setItem("cardItems", JSON.stringify(state.cardItems));
    },
    CALCULATE_SUBTOTAL(state, action) {
      const array = [];
      state.cardItems.map((item) => {
        const { price, cardQuantity } = item;
        const cardItemAmount = price * cardQuantity;
        return array.push(cardItemAmount);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cardTotalAmount = totalAmount;
    },
    CALCULATE_TOTAL_QUANTITY(state, action) {
      const array = [];
      state.cardItems.map((item) => {
        const { cardQuantity } = item;
        const quantity = cardQuantity;
        return array.push(quantity);
      });
      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cardTotalQuantity = totalQuantity;
    },
    SAVE_URL(state, action) {
      console.log(action.payload);
      state.previousURL = action.payload;
    },
  },
});

export const {
  ADD_TO_CARD,
  DECREASE_CARD,
  REMOVE_FROM_CARD,
  CLEAR_CARD,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  SAVE_URL,
} = cardSlice.actions;

export const selectCardItems = (state) => state.card.cardItems;
export const selectCardTotalQuantity = (state) => state.card.cardTotalQuantity;
export const selectCardTotalAmount = (state) => state.card.cardTotalAmount;
export const selectPreviousURL = (state) => state.card.previousURL;

export default cardSlice.reducer;
