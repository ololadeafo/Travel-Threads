import {React, useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import { useGetItemsByPacklistQuery, useUpdateItemMutation } from "./services/Travelthreads";
import { useGetOneListQuery } from "./services/Travelthreads";
import { Link } from "react-router-dom";
import { handleIsPackedChange, reset } from "./features/auth/createItem";
import { useSelector, useDispatch } from "react-redux";



const ListDetail = () => {
    const params = useParams();
    var packingListID = params["id"]
    const [updateItem] = useUpdateItemMutation()

    const [items, setItems] = useState([])
    const dispatch = useDispatch()
    const {data: allPackingListItems} = useGetItemsByPacklistQuery(packingListID)

    const {data: packingList} = useGetOneListQuery(packingListID)

    const getData = async () => {
        await setItems(allPackingListItems)
    }
    // const {data: allInfo} = useGetLatLonQuery(packingListID)
    // console.log(allInfo)
    const handleChange = async (e, object) => {
        console.log(e)
        console.log(object)
        let is_packed = object.is_packed ? false : true
        console.log(is_packed)
        const body = {
            "name": object.name,
            "quantity": object.quantity,
            "is_packed": is_packed,
            "packing_list_id": object.packing_list_id,
            "date_list_id": object.date_list_id,
            "id": object.id
        }
        const updatedItem = await updateItem(body);
        console.log(updatedItem)
    };



    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="container">
            <div className="row p-3" style={{height: "7em"}}>
                <div className="col-4">
                    <h1>{packingList?.name}</h1>
                </div>
                <div className="col-6 card" style={{backgroundColor: "#AED9E0"}}>

                </div>
            </div>
            <div style={{width: "54em", fontSize: "1.25em", padding: "1em"}}>
                <table className="card table" >
                    <thead>
                        <tr>
                            <th style={{width:"5em", textAlign: "center"}}>Packed</th>
                            <th style={{width:"44em", paddingLeft: "1em"}}>Item Name</th>
                            <th style={{width:"5em", textAlign: "center"}}>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allPackingListItems?.map((item) => {

                            return (
                                <tr key={item.id}>
                                    <td className="position-relative" style={{width:"5em"}}>
                                        <input
                                            className="position-absolute top-50 start-50 translate-middle form-check-input"
                                            type="checkbox"
                                            checked={item.is_packed}
                                            value={item.is_packed}
                                            onChange={() => dispatch(handleIsPackedChange())}
                                            onClick={(e) => handleChange(e, item)}>
                                        </input>
                                    </td>
                                    <td th style={{width:"44em", paddingLeft: "1em"}}>{item.name}</td>
                                    <td style={{width: "5em", textAlign: "center"}}>{item.quantity}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div style={{padding: "1em"}}>
                <button className="btn btn-secondary" >
                    <Link to={`/packinglist/${packingListID}/datelists`} style={{color: "white", textDecoration: "none"}}>Edit List</Link>
                </button>
            </div>
        </div>
    )
}

export default ListDetail
