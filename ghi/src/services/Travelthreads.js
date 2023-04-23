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
          url: `/api/packlist/${params.packing_list_id}/datelist/${params.start_date}/${params.end_date}`,
          method: "POST"
        };
      }, invalidatesTags: ['Datelist', 'Lists']
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
    getLists: builder.query({
      query: () => {
        console.log("get list query is running")
        return ("/api/packlist")
      },
      providesTags: ['Lists'],
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
      providesTags: ['Datelist'],
    }),
    getOneDate: builder.query({
      query: (IDs) => `/api/packlist/${IDs.packinglistID}/datelist/${IDs.datelistID}/`,
      providesTags: ['Datelist'],
    }),
    getItemsByPacklist: builder.query({
      query: (packlist_id) => `/api/packlist/${packlist_id}/items`,
      providesTags: ['All Items'],
    }),
    getItemsByDatelist: builder.query({
      query: (params) => `/api/packlist/${params.packing_list_id}/datelist/${params.date_list_id}/items`,
      providesTags: ['Datelist Items'],
    }),
    deleteItem: builder.mutation({
      query: (params) => `/api/items/${params.itemId}`,
      invalidatesTags: ['All Items']
    }),
    getWeatherData: builder.query({
      query: (params) => `/api/weather/${params.latitude}/${params.longitude}`,
      providesTags: ['Weather']
    }),
    getDateListDetailInfo: builder.query({
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


        const weather_time = weatherData.data.daily.time
        const weather_precipitation = weatherData.data.daily.precipitation_probability_max
        const weather_min_temp = weatherData.data.daily.temperature_2m_min
        const weather_max_temp = weatherData.data.daily.temperature_2m_max


        var startingIndex = weather_time.indexOf(packingList.start_date)
        var endingIndex = weather_time.indexOf(packingList.end_date)
        if (endingIndex === -1) {
          endingIndex = weather_time.length
        }

        var final_data = {}
        for (let i=startingIndex; i <= endingIndex; i++) {
            final_data[i]= {
                "weather_time":weather_time[i],
                "weather_precipitation":weather_precipitation[i],
                "weather_max": weather_max_temp[i],
                "weather_min": weather_min_temp[i]
            }
        }

        const allDateLists = await fetchWithBQ(`/api/packlist/${packing_list_id}/datelist`)
        if (allDateLists.error) {
          return { error: allDateLists.error }
        }

        const allDates = allDateLists.data

        const params = {}

        for (let i = 0; i < allDates.length; i++) {
          var dateID = allDates[i].id
          var packingListID = allDates[i].packing_list_id
          params["packing_list_id"] = packingListID
          params["date_list_id"] = dateID

          var itemData = await fetchWithBQ(`/api/packlist/${params.packing_list_id}/datelist/${params.date_list_id}/items`)

          console.log(itemData)

          if (itemData.data.length !== 0) {
            final_data[i+1]["item_data"] = itemData.data
          } else {
            final_data[i+1]["item_data"] = [{"date_list_id": params.date_list_id, "name": "No items"}]
          }
        }

        return {data : Object.values(final_data)}
      }
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
  useGetDateListDetailInfoQuery,
  useGetWeatherDataQuery,
} = travelThreadsApi;
