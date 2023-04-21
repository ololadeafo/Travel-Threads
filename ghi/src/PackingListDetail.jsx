import React from "react";
import { useParams } from 'react-router-dom';
import { useGetItemsByPacklistQuery, useGetLatLonQuery } from "./services/Travelthreads";



const ListDetail = () => {
    const params = useParams();
    var packingListID = params["id"]

    const allPackingListItems = useGetItemsByPacklistQuery(packingListID)


    const allInfo = useGetLatLonQuery(packingListID)
    console.log(allInfo)



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
