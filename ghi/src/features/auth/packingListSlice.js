import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fields: {
    name: "",
    location: "",
    startDate: "",
    endDate: "",
  },
};

const packingListSlice = createSlice({
  name: "packing list",
  initialState,
  reducers: {
    handleNameChange: (state, action) => {
      state.fields.name = action.payload;
    },
    handleLocationChange: (state, action) => {
      state.fields.location = action.payload;
    },
    handleStartDateChange: (state, action) => {
      state.fields.startDate = action.payload;
    },
    handleEndDateChange: (state, action) => {
      state.fields.endDate = action.payload;
    },
    reset: () => initialState,
  },
});

export const {
  handleNameChange,
  handleLocationChange,
  handleStartDateChange,
  handleEndDateChange,
  reset,
} = packingListSlice.actions;

export default packingListSlice.reducer;
