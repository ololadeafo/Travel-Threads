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

    const misc_items = packListItems?.filter(item => {
        return item.date_list_id === null
    })







    return (
        <div className="container">
            {allDateLists?.map((dateList) => {
                let weatherCard = <div>Weather information not available</div>
                let items = <div key=""></div>
                if (allInfo !== undefined && allInfo.daily.time.indexOf(dateList.date) !== -1) {
                    const index = allInfo.daily.time.indexOf(dateList.date)
                    weatherCard = <div key={dateList.date}>High: {allInfo.daily.temperature_2m_max
                    [index]} Low: {allInfo.daily.temperature_2m_max
                    [index]} Precipitation: {allInfo.daily.temperature_2m_max
                    [index]}</div>
                }

                if (packListItems !== undefined) {
                    const filteredItems = packListItems.filter(item => {
                        return item.date_list_id === dateList.id
                    })
                    items = filteredItems.map(item => {
                        return (
                            <div key={item.id}>{item.name} - {item.quantity}</div>
                        )
                    })
                }

                return (
                    <table key={dateList.id}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Weather Information</th>
                                <th>Items</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{dateList.date}</td>
                                <td>{dateList.description}</td>
                                <td>{weatherCard}</td>
                                <td>{items}</td>
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {misc_items?.map(item => {
                                    return (
                                        <div key={item.id}>{item.name} - {item.quantity}</div>
                                    )
                                })}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DateDetail
