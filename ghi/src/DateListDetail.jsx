import React from "react";
import { useParams } from 'react-router-dom';
import { useGetDateListDetailInfoQuery } from "./services/Travelthreads";


const DateDetail = () => {
    const params = useParams();
    var packingListID = params["id"]

    const {data: allInfo} = useGetDateListDetailInfoQuery(packingListID)
    console.log(allInfo)








    return (
        <div className="container">
           {allInfo?.map((date) => {
            return (
            <div className="info-container" key={date.item_data.date_list_id}>
                <div>Date: {date.weather_time}</div>
                <div>Max: {date.weather_max}</div>
                <div>Min: {date.weather_min}</div>
                <div>Chance of Rain: {date.weather_precipitation}%</div>
                {console.log("Date Items", date.item_data)}

                {date.item_data?.map((item) => {
                    return (
                        <div className="item-container" key={item.id}>
                            <div>{item.name}: {item.quantity}</div>
                        </div>
                    )
                })}
            </div>)
           })}
        </div>
    )
}

export default DateDetail
