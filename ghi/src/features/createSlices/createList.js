import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fields: {
    name: "",
    start_date: "",
    end_date: "",
    country: "",
    state: "",
    city: "",
  },
};

const createListSlice = createSlice({
  name: "createList",
  initialState,
  reducers: {
    handleNameChange: (state, action) => {
      state.fields.name = action.payload;
    },
    handleCountryChange: (state, action) => {
      state.fields.country = action.payload;
    },
    handleStateChange: (state, action) => {
      state.fields.state = action.payload;
    },
    handleCityChange: (state, action) => {
      state.fields.city = action.payload;
    },
    handleStartDateChange: (state, action) => {
      state.fields.start_date = action.payload;
    },
    handleEndDateChange: (state, action) => {
      state.fields.end_date = action.payload;
    },
    reset: () => initialState,
  },
});

export const {
  handleNameChange,
  handleCountryChange,
  handleStateChange,
  handleCityChange,
  handleStartDateChange,
  handleEndDateChange,
  reset,
} = createListSlice.actions;

export default createListSlice.reducer;
