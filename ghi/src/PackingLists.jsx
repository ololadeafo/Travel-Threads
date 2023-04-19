import React from "react";
import {
  useGetListsQuery,
  useGetAccountQuery
} from "./services/Travelthreads";

const PackingLists = () => {
    const account = useGetAccountQuery()
    console.log(account["data"])
    const packingLists = useGetListsQuery()
    // console.log(packingLists)
    const test = packingLists["data"]
    // console.log(test)

    return (
        <div className="container">
        {test?.length !== 0 ?
            (packingLists["data"]?.map(packinglist => {
                return (
                    <div key={packinglist.id}>
                        {packinglist.name}
                        {packinglist.start_date} - {packinglist.end_date}
                        {packinglist.city},{packinglist.state},{packinglist.country}
                    </div>
                )
                })) : (
            <div>
                No packing lists.
            </div>
            )
        }
        </div>
    )
}

export default PackingLists
