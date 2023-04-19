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
  useGetStateQuery,
  useGetCityQuery,
} from "./services/Travelthreads";


const CreateList = () => {
  const dispatch = useDispatch();


  const [createList] = useCreateListMutation();
  const { fields } = useSelector((state) => state.createList);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(fields)
    console.log(fields)
    createList(fields);
    dispatch(reset());
  };

  const countryData = useGetCountryQuery();
  const countries = countryData["data"];

  const stateData = useGetStateQuery(fields.country);
  const states = stateData["data"]


  var province_type = "country"
  var province_id = fields.country


  if (fields.state !== "") {
    var province_type = "state"
    var province_id = fields.state
  }

  console.log(fields.state)


  var params = {"province_type": province_type, "province_id": province_id}
  const cityData = useGetCityQuery(params);
  const cities = cityData["data"]


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
              onChange={(e) => {dispatch(handleCountryChange(e.target.value)); dispatch(handleStateChange("")); dispatch(handleCityChange(""))}}
            >
              <option value="">Choose a country</option>
              {countries?.map((country) => {
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
            <select
              id="CreateList__state"
              value={fields.state}
              onChange={(e) => {dispatch(handleStateChange(e.target.value)); dispatch(handleCityChange(""))}}
            >
            <option value="">Choose a State</option>
              {states?.map((state) => {
                return (
                  <option value={state.id} key={state.id}>
                    {state.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor="CreateList__city">City</label>
            <select
              id="CreateList__city"
              value={fields.city}
              onChange={(e) => dispatch(handleCityChange(e.target.value))}
            >
            <option value="">Choose a City</option>
              {cities?.map((city) => {
                return (
                  <option value={city.id} key={city.id}>
                    {city.name}
                  </option>
                );
              })}
            </select>
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
