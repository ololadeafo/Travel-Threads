import { configureStore } from '@reduxjs/toolkit'
import signupReducer from '../features/auth/signupSlice'
import loginReducer from '../features/auth/loginSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { travelThreadsApi } from '../services/Travelthreads'

export const store = configureStore({
    reducer: {
        login: loginReducer,
        signup: signupReducer,
        [travelThreadsApi.reducerPath]: travelThreadsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([travelThreadsApi.middleware])
})

setupListeners(store.dispatch)
