import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_API_HOST}`,
        credentials: "include" // sends cookie to FastAPI
    }),
    endpoints: (builder) => ({
        getAccount: builder.query({
            query: () => '/token',
            transformResponse: (response) => response?.account,
            providesTags: ['Account']
        }),
        login: builder.mutation({
            query: (body) => {
                const formData = new FormData()
                formData.append('email', body.email)
                formData.append('password', body.password)
                return {
                    url: '/token',
                    method: 'POST',
                    body: formData,
                    credentials: "include"
                }
            },
            invalidatesTags: ['Account', { type: 'Things', id: 'LIST' }]
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/token',
                method: 'DELETE'
            }),
            invalidatesTags: ['Account', { type: 'Things', id: 'LIST' }]
        })
    })
})

export const { useGetAccountQuery, useLogoutMutation, useLoginMutation } = authApi;
