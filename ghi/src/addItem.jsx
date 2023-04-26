import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  handleNameChange,
  handleQuantityChange,
  handleIsPackedChange,
  reset,
} from "./features/createSlices/createItem";
import { useCreateItemMutation } from "./services/Travelthreads";
import { useParams } from "react-router-dom";

const CreateItem = () => {
  const dispatch = useDispatch();
  const [createItem] = useCreateItemMutation();
  const { fields } = useSelector((state) => state.createItem);
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = await createItem({ params, fields });
    dispatch(reset());
  };

  return (
    <div className="container">
      <h1>Add Item</h1>
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
            value={fields.is_packed}
            onChange={(e) => dispatch(handleIsPackedChange(e.target.value))}
          />
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default CreateItem;
