import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const travelThreadsApi = createApi({
    reducerPath: 'travelThreadsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}`,
        credentials: "include"
    }),
    tagTypes: ['Account'],
    endpoints: (builder) => ({
        getAccount: builder.query({
            query: () => '/token',
            transformResponse: (response) => response?.account,
            providesTags: ['Account']
        }),
        signup: builder.mutation({
            query: (body) => {
                return {
                    url: '/api/accounts',
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: ['Account']
        })
    })
})

export const {
    useSignupMutation,
} = travelThreadsApi;