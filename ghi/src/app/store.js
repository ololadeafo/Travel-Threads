import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "../features/auth/signupSlice";
import loginReducer from "../features/auth/loginSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { travelThreadsApi } from "../services/Travelthreads";
import createListReducer from "../features/createSlices/createList";
import createItemReducer from "../features/createSlices/createItem";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,
    createList: createListReducer,
    createItem: createItemReducer,
    [travelThreadsApi.reducerPath]: travelThreadsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([travelThreadsApi.middleware]),
});

setupListeners(store.dispatch);
