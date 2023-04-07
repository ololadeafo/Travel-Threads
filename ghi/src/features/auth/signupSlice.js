import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fields: {
        email: '',
        password: '',
        passwordConfirmation: ''
    },
    errorMessage: null
}

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        handleEmailChange: (state, action) => {
            state.fields.email = action.payload
        },
        handlePasswordChange: (state, action) => {
            state.fields.password = action.payload
        },
        handlePasswordConfirmationChange: (state, action) => {
            state.fields.passwordConfirmation = action.payload
        },
        error: (state, action) => {
            state.errorMessage = action.payload
        },
        reset: () => initialState
    }
})

export const {
    handlePasswordChange,
    handlePasswordConfirmationChange,
    handleEmailChange,
    reset,
    error
} = signupSlice.actions;

export default signupSlice.reducer;


