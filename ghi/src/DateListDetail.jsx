import React from "react";
import { useParams } from 'react-router-dom';
import { weather, useGetOneListQuery, useGetDatesQuery, useGetLatLonQuery, useGetWeatherDataQuery} from "./services/Travelthreads";


const DateDetail = () => {
    const params = useParams();
    var packingListID = params["id"]

    const {data: allDateListItems} = useGetDatesQuery(packingListID)
    console.log(allDateListItems)

    const {data: dateList} = useGetOneListQuery(packingListID)
    console.log(dateList)

    const {data: allInfo} = useGetLatLonQuery(packingListID)
    console.log(allInfo)



    return (
        <div className="container">
            <div>
                {/* {allInfo["daily"]?.map()} */}
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Weather Information</th>
                        <th>Add Item</th>
                    </tr>
                </thead>
                <tbody>
                    {allDateListItems?.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                            </tr>
                        )
                    }

                    )}
                </tbody>
                <tbody>
                    {allInfo?.map((weatherData) => {
                        return (
                            <tr key={weatherData.data.daily}>
                                <td>{weatherData.precipitation_probability_max}</td>
                                <td>{weatherData.temperature_2m_min}</td>
                                <td>{weatherData.temperature_2m_max}</td>
                            </tr>
                        )
                    }

                    )}
                </tbody>
            </table>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Other Items</th>
                            <th>Add Item</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}

export default DateDetail