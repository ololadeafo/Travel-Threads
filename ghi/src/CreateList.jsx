// import { listenerCancelled } from "@reduxjs/toolkit/dist/listenerMiddleware/exceptions";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import createlistimage from "./images/Logo/createlist.png";
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
  useCreateDateListsMutation,
} from "./services/Travelthreads";
import { useNavigate } from "react-router-dom";

const CreateList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createList] = useCreateListMutation();
  const { fields } = useSelector((state) => state.createList);
  const [createDateList] = useCreateDateListsMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const new_list = await createList(fields);
    console.log(new_list["data"]);
    await createDateList({
      packing_list_id: new_list.data.id,
      start_date: fields.start_date,
      end_date: fields.end_date,
    });
    dispatch(reset());

    navigate("/packinglists"); 
  };

  const countryData = useGetCountryQuery();
  const countries = countryData["data"];

  var country_id = fields.country;
  if (country_id === "") {
    country_id = 0;
  }
  const stateData = useGetStateQuery(country_id);
  const states = stateData["data"];

  var province_type = "country";
  var province_id = fields.country;
  if (province_id === "") {
    province_id = 0;
  }

  if (fields.state !== "") {
    var province_type = "state";
    var province_id = fields.state;
  }

  var params = { province_type: province_type, province_id: province_id };
  const cityData = useGetCityQuery(params);
  const cities = cityData["data"];

  return (
      <div className="container" style={{ backgroundColor: "#AED9E0", minWidth: "100%", height: "100vh"}}>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <h2 className="mb-3">Create a Packing List<img src={createlistimage} alt="Createlist"></img></h2>
            <div>
              <h5>Tell us about your trip!</h5>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="CreateList__name" className="form-group">Name</label>
                <input
                  type={"text"}
                  className="form-control w-75"
                  id="CreateList__name"
                  value={fields.name}
                  onChange={(e) => dispatch(handleNameChange(e.target.value))}
                />
              </div>
              <div class="row g-3">
                <div class="col-md-6">
                <label htmlFor="CreateList__country" className="form-group">Country</label>
                <select
                  className="form-control w-100"
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
                  <div class="col-md-4">
                    <label htmlFor="CreateList__state" className="form-group">State</label>
                    <select
                      className="form-control w-75"
                      id="CreateList__state"
                      value={fields.state}
                      onChange={(e) => {dispatch(handleStateChange(e.target.value)); dispatch(handleCityChange(""))}}
                    >
                      <option select="">Choose a State</option>
                      {states?.map((state) => {
                        return (
                         <option value={state.id} key={state.id}>
                          {state.name}
                        </option>
                      );
                    })}
                    </select>
                  </div>
                  <div class="col-md-2">
                    <label htmlFor="CreateList__city" className="form-group">City</label>
                    <select
                      className="form-control w-75"
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
              </div>
              <div class="row g-3">
                <div class="col-sm">
                  <label htmlFor="CreateList__startDate" className="form-group">Start Date</label>
                  <input
                    type={"date"}
                    className="form-control w-75"
                    id="CreateList__startDate"
                    value={fields.start_date}
                    onChange={(e) => dispatch(handleStartDateChange(e.target.value))}
                  />
                </div>
                <div class="col-sm">
                  <label htmlFor="CreateList__endDate" className="form-label">End Date</label>
                  <input
                    type={"date"}
                    className="form-control w-75"
                    id="CreateList__endDate"
                    value={fields.end_date}
                    onChange={(e) => dispatch(handleEndDateChange(e.target.value))}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-secondary btn-customized">
                Create List
              </button>
            </form>
          </div>
        </div>
          <div>
            <label htmlFor="CreateList__country">Country</label>
            <select
              id="CreateList__country"
              value={fields.country}
              onChange={(e) => {
                dispatch(handleCountryChange(e.target.value));
                dispatch(handleStateChange(""));
                dispatch(handleCityChange(""));
              }}
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
              onChange={(e) => {
                dispatch(handleStateChange(e.target.value));
                dispatch(handleCityChange(""));
              }}
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
              value={fields.start_date}
              onChange={(e) => dispatch(handleStartDateChange(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="CreateList__endDate">End Date</label>
            <input
              type={"date"}
              id="CreateList__endDate"
              value={fields.end_date}
              onChange={(e) => dispatch(handleEndDateChange(e.target.value))}
            />
          </div>
          <button type="submit">Start List</button>
        </div>
  );
};

export default CreateList;
