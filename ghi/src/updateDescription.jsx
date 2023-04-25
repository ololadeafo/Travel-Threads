import React, { useState } from "react";
import { useUpdateDescriptionMutation, useGetOneDateQuery } from "./services/Travelthreads";
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdateDescription = () => {
    const navigate = useNavigate();

    let { state } = useLocation();
    const [description, setDescription] = useState(state.description)

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const params = useParams();
    const [updateDescription] = useUpdateDescriptionMutation();

    const {data: dateInfo, isLoading} = useGetOneDateQuery(params)
    if (isLoading) return <div>Loading...</div>

    const date = dateInfo.date


    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            "date": date,
            "description":description
        }
        updateDescription({params, body})
        navigate(`/packinglist/${params.packing_list_id}/datelists`)
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
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </div>
                <button type="submit">Update Description</button>
            </form>
        </div>
    )
}

export default UpdateDescription
