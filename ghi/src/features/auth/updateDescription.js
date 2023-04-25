import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  fields: {
    description: ""
  },
};


const updateDescriptionSlice = createSlice({
  name: "updateDescription",
  initialState,
  reducers: {
    handleDescriptionChange: (state, action) => {
      state.fields.description = action.payload;
    },
    reset: () => initialState,
  },
});

export const {
    handleDescriptionChange,
    reset
} = updateDescriptionSlice.actions;

export default updateDescriptionSlice.reducer
