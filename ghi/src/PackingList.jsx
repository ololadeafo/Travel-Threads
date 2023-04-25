import React from "react";
import { useParams } from 'react-router-dom';
import { useGetItemsByPacklistQuery, useGetLatLonQuery } from "./services/Travelthreads";
import { useGetOneListQuery } from "./services/Travelthreads";



const ListDetail = () => {
    const params = useParams();
    var packingListID = params["id"]

    const {data: allPackingListItems} = useGetItemsByPacklistQuery(packingListID)
    console.log(allPackingListItems)

    const {data: packingList} = useGetOneListQuery(packingListID)
    console.log(packingList)

    const {data: allInfo} = useGetLatLonQuery(packingListID)
    console.log(allInfo)



    return (
        <div className="container">
            <div>
                {/* {allInfo["daily"]?.map()} */}
            </div>
            {/* <h1>{packingList?.name}</h1> */}
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
