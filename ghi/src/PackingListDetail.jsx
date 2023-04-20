import React from "react";
import { useParams } from 'react-router-dom';
import { useGetOneListQuery, useGetItemsByPacklistQuery, useGetLatLonQuery, useGetWeatherDataQuery } from "./services/Travelthreads";



const ListDetail = () => {
    const params = useParams();
    var packingListID = params["id"]

    const packingList = useGetOneListQuery(packingListID)["data"]
    console.log(packingList)

    const allPackingListItems = useGetItemsByPacklistQuery(packingListID)["data"]
    console.log(allPackingListItems)

    const getLatLon = useGetLatLonQuery(packingList?.city)["data"]
    console.log(getLatLon)

    const weatherData = useGetWeatherDataQuery({"latitude": getLatLon?.latitude, "longitude": getLatLon?.longitude})["data"]
    console.log(weatherData)



    return (
        <div className="container">
            <div>

            </div>
            <h1>{packingList?.name}</h1>
            <table>
                <thead>
                    <tr>
                        <th>Packed</th>
                        <th>Item Name</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {allPackingListItems?.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td><input type="checkbox" value={item.is_packed}></input></td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ListDetail
