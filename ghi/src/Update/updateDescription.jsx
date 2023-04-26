import React, { useState } from "react";
import {
  useUpdateDescriptionMutation,
  useGetOneDateQuery,
} from "../services/Travelthreads";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateDescription = () => {
  const navigate = useNavigate();

  let { state } = useLocation();
  const [description, setDescription] = useState(state.description);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const params = useParams();
  const [updateDescription] = useUpdateDescriptionMutation();

  const { data: dateInfo, isLoading } = useGetOneDateQuery(params);
  if (isLoading) return <div>Loading...</div>;

  const date = dateInfo.date;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      date: date,
      description: description,
    };
    updateDescription({ params, body });
    navigate(`/packinglist/${params.packing_list_id}/datelists`);
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#AED9E0",
        minWidth: "100%",
        height: "100vh",
      }}
    >
      <div
        className="card"
        style={{
          width: "50rem",
          height: "20rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <h1>Update Description</h1>
        <h2>{date}</h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ margin: "15px 0px 15px" }}>
            <label
              htmlFor="UpdateDescription__name"
              style={{ fontWeight: "bold", margin: "7px" }}
            >
              Description:
            </label>
            <textarea
              type={"textarea"}
              id="UpdateDescription__name"
              value={description}
              onChange={handleDescriptionChange}
              style={{ height: "7.5rem", width: "15rem", resize: "none" }}
            />
          </div>
          <button
            type="submit"
            style={{ backgroundColor: "#FFA69E", width: "100px" }}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateDescription;
