import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const travelThreadsApi = createApi({
  reducerPath: "travelThreadsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}`,
    credentials: "include",
  }),
  tagTypes: ["Account"],
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
      invalidatesTags: ["Account"],
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
      invalidatesTags: ["Account"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/token",
        method: "DELETE",
      }),
      invalidatesTags: ["Account"],
    }),
    createList: builder.mutation({
      query: (body) => {
        const formData = new FormData();
        formData.append("name", body.name);
        formData.append("location", body.location);
        formData.append("startDate", body.startDate);
        formData.append("endDate", body.endDate);
        return {
          url: "/api/packlist",
          method: "POST",
          body: formData,
        };
      },
    }),
    getCity: builder.query({
      query: (params) => `/api/location/${params.province_type}/${params.province_id}/cities`,
      provideTags: ["City"],
    }),
    getState: builder.query({
      query: (country_id) => `/api/location/${country_id}/states`,
      provideTags: ["State"],
      invalidatesTags: ["City"]
    }),
    getCountry: builder.query({
      query: () => "/api/location/countries",
      provideTags: ["Country"],
      invalidatesTags: ["State", "City"]
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
  useGetCityQuery
} = travelThreadsApi;
