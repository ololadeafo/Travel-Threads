import React from "react";
import { useParams } from 'react-router-dom';
import { useGetOneListQuery, useGetDatesQuery, useGetLatLonQuery, useGetItemsByPacklistQuery} from "./services/Travelthreads";


const DateDetail = () => {
    const params = useParams();
    var packingListID = params["id"]

    const {data: allDateLists} = useGetDatesQuery(params?.id, { skip: !params?.id })

    // const {data: dateList} = useGetOneListQuery(params?.id, { skip: !params?.id })

    const {data: allInfo} = useGetLatLonQuery(params?.id, { skip: !params?.id })

    const {data: packListItems} = useGetItemsByPacklistQuery(params.id)
    console.log(packListItems)





    return (
        <div className="container">
            {allDateLists?.map((dateList) => {
                let weatherCard = <td>Weather information not available</td>
                let items = <td></td>
                if (allInfo !== undefined && allInfo.daily.time.indexOf(dateList.date) !== -1) {
                    const index = allInfo.daily.time.indexOf(dateList.date)
                    weatherCard = <td key={dateList.date}>High: {allInfo.daily.temperature_2m_max
                    [index]} Low: {allInfo.daily.temperature_2m_max
                    [index]} Precipitation: {allInfo.daily.temperature_2m_max
                    [index]}</td>
                }

                if (packListItems !== undefined) {
                    const filteredItems = packListItems.filter(item => {
                        return item.date_list_id === dateList.id
                    })
                    items = filteredItems.map(item => {
                        return (
                            <td key={item.id}>{item.name} - {item.quantity}</td>
                        )
                    })
                }

                return (
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
                            <tr key={dateList.id}>
                                <td>{dateList.date}</td>
                                <td>{dateList.description}</td>
                                {weatherCard}
                                {items}
                            </tr>
                        </tbody>
                    </table>
                )
            })}
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
