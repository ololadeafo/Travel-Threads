import React from "react";
import { useParams } from 'react-router-dom';
import { useGetOneListQuery, useGetDatesQuery, useGetLatLonQuery} from "./services/Travelthreads";


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
                    {allDateListItems?.map((dates) => {
                        let index = -1
                        const weatherInfo = <td></td>
                        if (allInfo.weather_time.indexOf(dates.date)!== -1) {
                            index = allInfo.weather_time.indexOf(dates.date)

                        }
                        
                        return (
                            <tr key={dates.id}>
                                <td>{dates.date}</td>
                                <td>{dates.description}</td>
                                <td>
                                    {allInfo.weather_time.indexOf(dates.date)!== -1}
                                </td>
                            </tr>
                        )
                    }

                    )}
                </tbody>
                <tbody>
                    {/* <tr key={weatherData.data}>
                        <td>{weatherData}</td>
                        <td>{weatherData.data.temperature_2m_min}</td>
                        <td>{weatherData.data.temperature_2m_max}</td>
                        <td>{weatherData.data.time}</td>
                    </tr> */}
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