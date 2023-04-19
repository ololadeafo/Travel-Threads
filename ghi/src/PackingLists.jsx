import {React} from "react";
import {
  useGetListsQuery,
  useDeleteListMutation,
} from "./services/Travelthreads";

import { Link } from "react-router-dom";

const PackingLists = () => {
    const packingLists = useGetListsQuery()
    const test = packingLists["data"]
    console.log(test)
    const [deleteList] = useDeleteListMutation()

    const handleDelete = (e) => {
        var id = e.target.parentNode.getAttribute("id")
        deleteList(id)
    }




    return (
        <div className="container">
        {test?.length !== 0 ?
            (packingLists["data"]?.map(packinglist => {
                return (
                    <div key={packinglist.id} id={packinglist.id}>
                        <Link to={`/packinglist/${packinglist.id}`}>{packinglist.name}</Link>
                        {packinglist.start_date} - {packinglist.end_date}
                        {packinglist.city},{packinglist.state},{packinglist.country}
                        <button onClick={handleDelete}>Delete</button>
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
