import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  handleNameChange,
  handleLocationChange,
  handleStartDateChange,
  handleEndDateChange,
  reset,
} from "./features/auth/createList";
import { useCreateListMutation } from "./services/Travelthreads";

const CreateList = () => {
  const dispatch = useDispatch();
  const { fields } = useSelector((state) => state.CreateList);
  const [createList] = useCreateListMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    createList(fields);
    dispatch(reset());
  };

  return (
    <>
      <div>
        <h1>Create a Packing List</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="CreateList__name">Name</label>
            <input
              type={"text"}
              id="CreateList__name"
              value={fields.name}
              onChange={(e) => dispatch(handleNameChange(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="CreateList__location">Location</label>
            <input
              type={"text"}
              id="CreateList__location"
              value={fields.location}
              onChange={(e) => dispatch(handleLocationChange(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="CreateList__startDate">Start Date</label>
            <input
              type={"date"}
              id="CreateList__startDate"
              value={fields.startDate}
              onChange={(e) => dispatch(handleStartDateChange(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="CreateList__endDate">End Date</label>
            <input
              type={"date"}
              id="CreateList__endDate"
              value={fields.endDate}
              onChange={(e) => dispatch(handleEndDateChange(e.target.value))}
            />
          </div>
          <button type="submit">Start List</button>
        </form>
      </div>
    </>
  );
};

export default CreateList;
