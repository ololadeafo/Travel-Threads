import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleNameChange, handleIsPackedChange, handleQuantityChange, reset } from "./features/auth/updateItem";
import { useGetItemsByIDQuery, useUpdateItemMutation } from "./services/Travelthreads";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdateItem = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [updateItem] = useUpdateItemMutation();
    const { fields } = useSelector((state => state.updateItem));

    const params = useParams()
    const itemID = params.item_id

    const {data: itemInfo, isLoading } = useGetItemsByIDQuery(itemID)
    if(isLoading) return <div>Loading...</div>
    const dateListID = itemInfo.date_list_id
    params["date_list_id"] = dateListID

    const handleSubmit = async (e) => {
        e.preventDefault();
        updateItem({params, fields});
        dispatch(reset);
        navigate(`/packinglist/${params.packing_list_id}/datelists`);
    };

    console.log(fields)

    return (
        <div className="container">
            <h1>Update Item</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="CreateItem__name">Name</label>
                    <input
                        type={"text"}
                        id="CreateItem__name"
                        value={fields.name}
                        onChange={(e) => dispatch(handleNameChange(e.target.value))}
                    />
                </div>
                <div>
                    <label htmlFor="CreateItem__quantity">Quantity</label>
                    <input
                        type={"number"}
                        id="CreateItem__quantity"
                        value={fields.quantity}
                        onChange={(e) => dispatch(handleQuantityChange(e.target.value))}
                    />
                </div>
                <div>
                    <label htmlFor="CreateItem__is_packed">Packed?</label>
                    <input
                        type={"checkbox"}
                        id="CreateItem__is_packed"
                        onChange={(e) => dispatch(handleIsPackedChange(e.target.value))}
                    />
                </div>
                <button type="submit">Update Item</button>
            </form>

        </div>

    )

}

export default UpdateItem
