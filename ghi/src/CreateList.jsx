import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  handleNameChange,
  handleCountryChange,
  handleStateChange,
  handleCityChange,
  handleStartDateChange,
  handleEndDateChange,
  reset,
} from "./features/auth/createList";
import {
  useCreateListMutation,
  useGetCountryQuery,
} from "./services/Travelthreads";

const CreateList = () => {
  const dispatch = useDispatch();
  const [createList] = useCreateListMutation();
  const { fields } = useSelector((state) => state.createList);

  const handleSubmit = (e) => {
    e.preventDefault();
    createList(fields);
    dispatch(reset());
  };

  const countryData = useGetCountryQuery();
  const countries = countryData["data"];

  // const stateData = useGetStateQuery();
  // console.log(stateData);

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
            <label htmlFor="CreateList__country">Country</label>
            <select
              id="CreateList__country"
              value={fields.country}
              onChange={(e) => dispatch(handleCountryChange(e.target.value))}
            >
              <option value="">Choose a country</option>
              {countries.map((country) => {
                return (
                  <option value={country.id} key={country.id}>
                    {country.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor="CreateList__state">State</label>
            <input
              type={"select"}
              id="CreateList__state"
              value={fields.state}
              onChange={(e) => dispatch(handleStateChange(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="CreateList__city">City</label>
            <input
              type={"select"}
              id="CreateList__city"
              value={fields.city}
              onChange={(e) => dispatch(handleCityChange(e.target.value))}
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
