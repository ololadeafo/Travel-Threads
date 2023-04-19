import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const travelThreadsApi = createApi({
  reducerPath: "travelThreadsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}`,
    credentials: "include",
  }),
  tagTypes: ["Account", "Lists", "City", "State", "Country"],
  endpoints: (builder) => ({
    getAccount: builder.query({
      query: () => "/token",
      transformResponse: (response) => response?.account,
      providesTags: ["Account"],
    }),
    signup: builder.mutation({
      query: (body) => {
        return {
          url: "/api/accounts",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ['Account', 'Lists'],
    }),
    login: builder.mutation({
      query: (body) => {
        const formData = new FormData();
        formData.append("username", body.email);
        formData.append("password", body.password);
        return {
          url: "/token",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ['Account', 'Lists'],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/token",
        method: "DELETE",
      }),
      invalidatesTags: ['Account', 'Lists'],
    }),
    createList: builder.mutation({
      query: (body) => {
        return {
          url: "/api/packlist",
          method: "POST",
          body: body,
        };
      }, invalidatesTags: ['Lists'],
    }),
    getCity: builder.query({
      query: (params) => `/api/location/${params.province_type}/${params.province_id}/cities`,
      provideTags: ['City'],
    }),
    getState: builder.query({
      query: (country_id) => `/api/location/${country_id}/states`,
      provideTags: ['State'],
      invalidatesTags: ['City']
    }),
    getCountry: builder.query({
      query: () => "/api/location/countries",
      provideTags: ['Country'],
      invalidatesTags: ['State', 'City']
    }),
    getLists: builder.query({
      query: () => {
        console.log("get list query is running")
        return ("/api/packlist")
      },
      provideTags: ['Lists'],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetAccountQuery,
  useCreateListMutation,
  useGetCountryQuery,
  useGetStateQuery,
  useGetCityQuery,
  useGetListsQuery
} = travelThreadsApi;
