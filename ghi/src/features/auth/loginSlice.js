import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    fields: {
        email: '',
        password: '',
    },
    errorMessage: null
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        handleEmailChange: (state, action) => {
            state.fields.email = action.payload
        },
        handlePasswordChange: (state, action) => {
            state.fields.password = action.payload
        },
        reset: () => initialState
    }
})

export const { handlePasswordChange, handleEmailChange, reset } = loginSlice.actions;

export default loginSlice.reducer;
