import React, { useState } from "react";
import { useGetItemsByIDQuery, useUpdateItemMutation } from "./services/Travelthreads";
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdateItem = () => {
    const navigate = useNavigate();

    let { state } = useLocation();
    const [formData, setFormData] = useState({
        name: state.name,
        quantity: state.quantity,
    })

    const [checked, setChecked] = useState(state.is_packed)


    const handleFieldChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    const handleCheckedChange = (e) => {
        let value = e.target.value
        if (value === 'true') {
            value = false
        } else {
            value = true
        }
        setChecked(value)
    }

    const [updateItem] = useUpdateItemMutation();

    const params = useParams()
    const itemID = params.item_id

    const {data: itemInfo, isLoading } = useGetItemsByIDQuery(itemID)
    if(isLoading) return <div>Loading...</div>
    const dateListID = itemInfo.date_list_id
    const packingListID = parseInt(params.packing_list_id)


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(state.id)
        const body = {
            name: formData.name,
            quantity: formData.quantity,
            "is_packed": checked,
            "packing_list_id": packingListID,
            "date_list_id": dateListID,
            "id": state.id
        }

        updateItem(body)

        navigate(`/packinglist/${params.packing_list_id}/datelists`);
    };


    return (
        <div className="container">
            <h1>Update Item</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="CreateItem__name">Name</label>
                    <input
                        type={"text"}
                        id="UpdateItem__name"
                        value={formData.name}
                        name="name"
                        onChange={handleFieldChange}
                    />
                </div>
                <div>
                    <label htmlFor="CreateItem__quantity">Quantity</label>
                    <input
                        type={"number"}
                        id="UpdateItem__quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleFieldChange}
                    />
                </div>
                <div>
                    <label htmlFor="CreateItem__is_packed">Packed?</label>
                    <input
                        type={"checkbox"}
                        id="UpdateItem__is_packed"
                        name="is_packed"
                        value={checked}
                        checked={checked}
                        onChange={handleCheckedChange}
                    />
                </div>
                <button type="submit">Update Item</button>
            </form>

        </div>

    )

}

export default UpdateItem
