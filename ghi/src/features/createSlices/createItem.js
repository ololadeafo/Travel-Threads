import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fields: {
    name: "New Item",
    quantity: 0,
    is_packed: false,
  },
};


const createItemSlice = createSlice({
  name: "createItem",
  initialState,
  reducers: {
    handleNameChange: (state, action) => {
      state.fields.name = action.payload;
    },
    handleQuantityChange: (state, action) => {
      state.fields.quantity = action.payload;
    },
    handleIsPackedChange: (state) => {
      state.fields.is_packed = !state.fields.is_packed;
    },

    reset: () => initialState,
  },
});

export const {
    handleNameChange,
    handleQuantityChange,
    handleIsPackedChange,
    reset
} = createItemSlice.actions;

export default createItemSlice.reducer
