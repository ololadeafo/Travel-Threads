import { createSlice } from "@reduxjs/toolkit";
import { useParams } from 'react-router-dom';


const initialState = {
  fields: {
    name: "",
    quantity: 0,
    is_packed: false,
  },
};


const updateItemSlice = createSlice({
  name: "updateItem",
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
} = updateItemSlice.actions;

export default updateItemSlice.reducer
