import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fields: {
    name: "New Item",
    quantity: 0,
    is_packed: false,
    packing_list_id: 0,
    date_list_id: 0,
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
    handlePacklistIDChange: (state, action) => {
      state.fields.packing_list_id = action.payload;
    },
    handleDatelistIDChange: (state, action) => {
      state.fields.date_list_id = action.payload;
    },

    reset: () => initialState,
  },
});

export const {
    handleNameChange,
    handleQuantityChange,
    handleIsPackedChange,
    handlePacklistIDChange,
    handleDatelistIDChange,
    reset
} = createItemSlice.actions;

export default createItemSlice.reducer
