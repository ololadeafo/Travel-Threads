import { configureStore } from '@reduxjs/toolkit'
import signupReducer from '../features/auth/signupSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { travelThreadsApi } from '../services/Travelthreads'

export const store = configureStore({
    reducer: {
        signup: signupReducer,
        [travelThreadsApi.reducerPath]: travelThreadsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([travelThreadsApi.middleware])
})

setupListeners(store.dispatch)