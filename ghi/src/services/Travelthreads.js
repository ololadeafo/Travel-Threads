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
    createDateLists: builder.mutation({
      query: (params) => {
        return {
          url: `/api/packlist/${params.packing_list_id}/datelist/start/${params.start_date}/end/${params.end_date}`,
          method: "POST"
        };
      }, invalidatesTags: ['Datelist', 'Lists']
    }),
    createItem: builder.mutation({
      query: ({fields, body}) => {
        return {
          url: `/api/packlist/items`,
          method: "POST",
          body: {
            "packing_list_id": body.packing_list_id,
            "date_list_id": body.date_list_id,
            "name": fields.name,
            "quantity":fields.quantity,
            "is_packed":fields.is_packed
          }
        };
      }, invalidatesTags: ["List of Dates", "All Items From Packlist"]
    }),
    updateItem: builder.mutation({
      query: ({...body}) => {
        return {
          url: `/api/packlist/items/${body.id}`,
          method: "PUT",
          body: {
            "date_list_id": body.date_list_id,
            "packing_list_id": body.packing_list_id,
            "name": body.name,
            "quantity": body.quantity,
            "is_packed": body.is_packed,
          }
        };
      }, invalidatesTags: ["Get One Item", "All Items From Packlist"]
    }),
    updateDescription: builder.mutation({
      query: ({params, body}) => {
        return {
          url: `/api/packlist/${params.packing_list_id}/datelist/${params.date_list_id}`,
          method: "PUT",
          body: {
            "date":body.date,
            "description":body.description
          }
        };
      }, invalidatesTags: ["Get One Item", "List of Dates"]
    }),
    getCity: builder.query({
      query: (params) => `/api/location/${params.province_type}/${params.province_id}/cities`,
      providesTags: ['City'],
    }),
    getState: builder.query({
      query: (country_id) => `/api/location/${country_id}/states`,
      providesTags: ['State'],
      invalidatesTags: ['City']
    }),
    getCountry: builder.query({
      query: () => "/api/location/countries",
      providesTags: ['Country'],
      invalidatesTags: ['State', 'City']
    }),
    deleteList: builder.mutation({
      query: (id) => ({
        url: `/api/packlist/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Lists']
    }),
    getOneList: builder.query({
      query: (id) => `/api/packlist/${id}`,
      providesTags: ['List'],
    }),
    getDates: builder.query({
      query: (id) => `/api/packlist/${id}/datelist`,
      providesTags: ['List of Dates'],
    }),
    getOneDate: builder.query({
      query: (params) => `/api/packlist/${params.packing_list_id}/datelist/${params.date_list_id}/`,
      providesTags: ['Datelist'],
    }),
    getItemsByPacklist: builder.query({
      query: (packlist_id) => `/api/packlist/${packlist_id}/items`,
      providesTags: ['All Items From Packlist'],
    }),
    getItemsByDatelist: builder.query({
      query: (params) => `/api/packlist/${params.packing_list_id}/datelist/${params.date_list_id}/items`,
      providesTags: ['Datelist Items'],
    }),
    getItemsByID: builder.query({
      query: (item_id) => `/api/items/${item_id}`,
      providesTags: ['Get One Item'],
    }),
    deleteItem: builder.mutation({
      query: (item_id) => ({
        url: `/api/items/${item_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['All Items From Packlist', "List of Dates"]
    }),
    getWeatherInfo: builder.query({
      async queryFn(packing_list_id, _queryApi, _extraOptions, fetchWithBQ) {
        const packingListData = await fetchWithBQ(`/api/packlist/${packing_list_id}`)
        if (packingListData.error) {
          return { error: packingListData.error }
        }

        const packingList = packingListData.data
        console.log(packingList)

        const packingListCityData = await fetchWithBQ(`/api/location/city/${packingList.city}`)

        if (packingListCityData.error) {
          return { error: packingListCityData.error }
        }

        const packingListCity = packingListCityData.data

        console.log(packingListCity)

        const weatherData = await fetchWithBQ(`/api/weather/${packingListCity.latitude}/${packingListCity.longitude}`)
        if (weatherData.error) {
          return { error: weatherData.error }
        }

        return weatherData
      }
    }),
    getLists: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const packingListsData = await fetchWithBQ("/api/packlist");

        if (packingListsData.error) {
          return { error: packingListsData.error }
        }

        for (let i = 0; i < packingListsData.data.length; i++) {
          var packingListCityID = packingListsData.data[i].city
          var packingListCityData = await fetchWithBQ(`/api/location/city/details/${packingListCityID}`)
          packingListsData.data[i]["cityInfo"] = packingListCityData.data
        }

        return packingListsData
      },
      providesTags: ['List of PackingLists'],
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
  useGetListsQuery,
  useDeleteListMutation,
  useGetOneListQuery,
  useGetDatesQuery,
  useGetOneDateQuery,
  useGetItemsByPacklistQuery,
  useDeleteItemMutation,
  useCreateDateListsMutation,
  useGetWeatherInfoQuery,
  useCreateItemMutation,
  useGetItemsByIDQuery,
  useUpdateItemMutation,
  useUpdateDescriptionMutation,
} = travelThreadsApi;
