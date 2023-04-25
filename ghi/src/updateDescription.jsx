import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleDescriptionChange, reset } from "./features/auth/updateDescription";
import { useUpdateDescriptionMutation, useGetOneDateQuery } from "./services/Travelthreads";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdateDescription = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const [updateDescription] = useUpdateDescriptionMutation();
    const { fields } = useSelector((state => state.updateDescription));
    const {data: dateInfo, isLoading} = useGetOneDateQuery(params)
    if (isLoading) return <div>Loading...</div>

    const date = dateInfo.date


    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {date}
        const updatedDescription = await updateDescription({params, fields, body})
        navigate(`/packinglist/${params.packing_list_id}/datelists`)
        dispatch(reset)
    };




    return (
        <div className="container">
            <h1>Update Description</h1>
            <h2>{date}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="UpdateDescription__name">Description</label>
                    <input
                        type={"text"}
                        id="UpdateDescription__name"
                        value={fields.description}
                        onChange={(e) => dispatch(handleDescriptionChange(e.target.value))}
                    />
                </div>
                <button type="submit">Update Description</button>
            </form>
        </div>
    )
}

export default UpdateDescription
