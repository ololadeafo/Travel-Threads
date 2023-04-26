import React, { useState } from "react";
import {
  useGetItemsByIDQuery,
  useUpdateItemMutation,
} from "../services/Travelthreads";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateItem = () => {
  const navigate = useNavigate();

  let { state } = useLocation();
  const [formData, setFormData] = useState({
    name: state.name,
    quantity: state.quantity,
  });

  const [checked, setChecked] = useState(state.is_packed);

  const handleFieldChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckedChange = (e) => {
    let value = e.target.value;
    if (value === "true") {
      value = false;
    } else {
      value = true;
    }
    setChecked(value);
  };

  const [updateItem] = useUpdateItemMutation();

  const params = useParams();
  const itemID = params.item_id;

  const { data: itemInfo, isLoading } = useGetItemsByIDQuery(itemID);
  if (isLoading) return <div>Loading...</div>;
  const dateListID = itemInfo.date_list_id;
  const packingListID = parseInt(params.packing_list_id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      name: formData.name,
      quantity: formData.quantity,
      is_packed: checked,
      packing_list_id: packingListID,
      date_list_id: dateListID,
      id: state.id,
    };

    updateItem(body);

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
        <h1>Update Item</h1>
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
              htmlFor="CreateItem__name"
              style={{ fontWeight: "bold", margin: "7px" }}
            >
              Name
            </label>
            <input
              type={"text"}
              id="UpdateItem__name"
              value={formData.name}
              name="name"
              onChange={handleFieldChange}
            />
          </div>
          <div style={{ margin: "15px 0px 15px" }}>
            <label
              htmlFor="CreateItem__quantity"
              style={{ fontWeight: "bold", margin: "7px" }}
            >
              Quantity
            </label>
            <input
              type={"number"}
              id="UpdateItem__quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleFieldChange}
            />
          </div>
          <div style={{ margin: "15px 0px 15px" }}>
            <label
              htmlFor="CreateItem__is_packed"
              style={{ fontWeight: "bold", margin: "7px" }}
            >
              Packed?
            </label>
            <input
              type={"checkbox"}
              id="UpdateItem__is_packed"
              name="is_packed"
              value={checked}
              checked={checked}
              onChange={handleCheckedChange}
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

export default UpdateItem;
