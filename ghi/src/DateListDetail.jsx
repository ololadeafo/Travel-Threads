import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useGetDatesQuery,
  useGetWeatherInfoQuery,
  useGetItemsByPacklistQuery,
  useCreateItemMutation,
  useDeleteItemMutation,
  useGetOneListQuery,
} from "./services/Travelthreads";
import { handleNameChange } from "./features/createSlices/createItem";

const DateDetail = () => {
  const dispatch = useDispatch();
  const [createItem] = useCreateItemMutation();
  const [deleteItem] = useDeleteItemMutation();
  const { fields } = useSelector((state) => state.createItem);
  const params = useParams();
  var packingListID = params["id"];

  const { data: packingListDetail } = useGetOneListQuery(params?.id);

  const { data: allDateLists } = useGetDatesQuery(params?.id, {
    skip: !params?.id,
  });

  const { data: packListItems } = useGetItemsByPacklistQuery(params.id);

  const { data: allInfo } = useGetWeatherInfoQuery(params?.id, {
    skip: !params?.id,
  });

  const misc_items = packListItems?.filter((item) => {
    return item.date_list_id === null;
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    var dateListID = e.target.value;
    if (dateListID === "") {
      dateListID = null;
    }

    var body = { packing_list_id: packingListID, date_list_id: dateListID };

    const item = createItem({ fields, body });
  };

  const handleDelete = (e) => {
    const item_id = e.target.value;
    deleteItem(item_id);
  };

  const changeDateFormat = (date) => {
    var newDate = date.split("-");
    return `${newDate[1]}/${newDate[2]}/${newDate[0]}`;
  };

  const cardStyle = {
    width: "300px",
    height: "auto",
    margin: "0 auto",
    padding: "1rem",
    marginBottom: "100px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s linear",
    backgroundColor: "#FFA69E",
  };

  const cardBodyStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  };

  return (
    <div
      className="container"
      style={{
        minWidth: "100%",
        height: "100vh",
        position: "fixed",
        overflow: "scroll",
        backgroundColor: "#AED9E0",
      }}
    >
      <Link
        to={`/packinglist/${packingListID}`}
        className="header"
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "50px 0px 50px 0px",
          textDecoration: "none",
          color: "black",
        }}
      >
        <h1 style={{ fontSize: "50px" }}>{packingListDetail?.name}</h1>
      </Link>
      <div
        className="info"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr" }}
      >
        {allDateLists?.map((dateList) => {
          let weatherCard = (
            <div style={{ marginBottom: "25px" }}>
              Weather information not available
            </div>
          );
          let items = <div key="" style={cardBodyStyle}></div>;
          if (
            allInfo !== undefined &&
            allInfo.daily.time.indexOf(dateList.date) !== -1
          ) {
            const index = allInfo.daily.time.indexOf(dateList.date);
            weatherCard = (
              <div
                key={dateList.date}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  width: "266px",
                  marginBottom: "25px",
                }}
              >
                <div>High: {allInfo.daily.temperature_2m_max[index]}°F</div>
                <div>Low: {allInfo.daily.temperature_2m_min[index]}°F</div>
                <div>
                  Precipitation:{" "}
                  {allInfo.daily.precipitation_probability_max[index]}%
                </div>
              </div>
            );
          }

          if (packListItems !== undefined) {
            const filteredItems = packListItems.filter((item) => {
              return item.date_list_id === dateList.id;
            });
            items = filteredItems.map((item) => {
              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "266px",
                  }}
                >
                  <div style={{ margin: "0px 0px 15px 0px" }}>
                    {item.name}: {item.quantity}
                  </div>
                  <div className="buttons">
                    <Link
                      to={`/packinglist/${packingListID}/items/${item.id}`}
                      state={item}
                    >
                      <button
                        style={{
                          height: "26px",
                          fontSize: "12px",
                          backgroundColor: "#6c757d",
                          color: "white",
                        }}
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      value={item.id}
                      onClick={handleDelete}
                      style={{
                        height: "26px",
                        fontSize: "12px",
                        backgroundColor: "#6c757d",
                        color: "white",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            });
          }

          return (
            <div
              key={dateList.id}
              id={dateList.id}
              className="card"
              style={cardStyle}
            >
              <div style={cardBodyStyle}>
                <h1 style={{ marginBottom: "15px" }}>
                  {changeDateFormat(dateList.date)}
                </h1>
                {dateList.description !== "" ? (
                  <div style={{ textAlign: "center", marginBottom: "15px" }}>
                    <Link
                      to={`/packinglist/${packingListID}/datelists/${dateList.id}`}
                      state={dateList}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {dateList.description}
                    </Link>
                  </div>
                ) : (
                  <div style={{ textAlign: "center", marginBottom: "15px" }}>
                    <Link
                      to={`/packinglist/${packingListID}/datelists/${dateList.id}`}
                      state={dateList}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Add Description
                    </Link>
                  </div>
                )}
                <div>{weatherCard}</div>
                <div>{items}</div>
                <div className="input-div" style={{ display: "flex" }}>
                  <div>
                    <input
                      onChange={(e) =>
                        dispatch(handleNameChange(e.target.value))
                      }
                      style={{ height: "26px" }}
                    ></input>
                  </div>
                  <div>
                    <button
                      value={dateList.id}
                      onClick={handleSubmit}
                      style={{
                        height: "26px",
                        fontSize: "12px",
                        backgroundColor: "#6c757d",
                        color: "white",
                      }}
                    >
                      Add Item
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="card" style={{ ...cardStyle, marginBottom: "150px" }}>
          <h1 style={{ marginBottom: "15px" }}>Other Items</h1>
          {misc_items?.map((item) => {
            return (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "266px",
                }}
              >
                <div key={item.id} style={{ marginBottom: "15px" }}>
                  {item.name}: {item.quantity}
                </div>
                <div className="buttons">
                  <Link
                    to={`/packinglist/${packingListID}/items/${item.id}`}
                    state={item}
                  >
                    <button
                      style={{
                        height: "26px",
                        fontSize: "12px",
                        backgroundColor: "#6c757d",
                        color: "white",
                      }}
                    >
                      Edit
                    </button>
                  </Link>
                  <button
                    value={item.id}
                    onClick={handleDelete}
                    style={{
                      height: "26px",
                      fontSize: "12px",
                      backgroundColor: "#6c757d",
                      color: "white",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
          <div className="input-div" style={{ display: "flex" }}>
            <div>
              <input
                onChange={(e) => dispatch(handleNameChange(e.target.value))}
                style={{ height: "26px" }}
              ></input>
            </div>
            <div>
              <button
                value={null}
                onClick={handleSubmit}
                style={{
                  height: "26px",
                  fontSize: "12px",
                  backgroundColor: "#6c757d",
                  color: "white",
                }}
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateDetail;
