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
} from "../services/Travelthreads";
import { handleNameChange } from "../features/createSlices/createItem";

const DateDetail = () => {
  const dispatch = useDispatch();
  const [createItem] = useCreateItemMutation();
  const [deleteItem] = useDeleteItemMutation();
  const { fields } = useSelector((state) => state.createItem);
  const params = useParams();
  var packingListID = params["id"];

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

  return (
    <div
      className="container"
      style={{ display: "flex", justifyContent: "center" }}
    >
      {allDateLists?.map((dateList) => {
        let weatherCard = <div>Weather information not available</div>;
        let items = <div key=""></div>;
        if (
          allInfo !== undefined &&
          allInfo.daily.time.indexOf(dateList.date) !== -1
        ) {
          const index = allInfo.daily.time.indexOf(dateList.date);
          weatherCard = (
            <div
              key={dateList.date}
              style={{ display: "flex", alignItems: "center" }}
            >
              High: {allInfo.daily.temperature_2m_max[index]}
              Low: {allInfo.daily.temperature_2m_min[index]}
              Precipitation:{" "}
              {allInfo.daily.precipitation_probability_max[index]}
            </div>
          );
        }

        if (packListItems !== undefined) {
          const filteredItems = packListItems.filter((item) => {
            return item.date_list_id === dateList.id;
          });
          items = filteredItems.map((item) => {
            return (
              <div key={item.id}>
                <div>
                  {item.name}: {item.quantity}
                </div>
                <Link
                  to={`/packinglist/${packingListID}/items/${item.id}`}
                  state={item}
                >
                  <button>Edit</button>
                </Link>
                <button value={item.id} onClick={handleDelete}>
                  Delete
                </button>
              </div>
            );
          });
        }

        return (
          <div
            key={dateList.id}
            id={dateList.id}
            className="card"
            style={{
              width: "25rem",
              height: "25rem",
              padding: "2rem",
              margin: "1rem",
              alignItems: "center",
            }}
          >
            <h1>{changeDateFormat(dateList.date)}</h1>
            {dateList.description !== "" ? (
              <div>
                <Link
                  to={`/packinglist/${packingListID}/datelists/${dateList.id}`}
                  state={dateList}
                >
                  {dateList.description}
                </Link>
              </div>
            ) : (
              <div>
                <Link
                  to={`/packinglist/${packingListID}/datelists/${dateList.id}`}
                  state={dateList}
                >
                  Add Description
                </Link>
              </div>
            )}
            <div>{weatherCard}</div>
            <div>{items}</div>
            <div>
              <input
                onChange={(e) => dispatch(handleNameChange(e.target.value))}
              ></input>
            </div>
            <div>
              <button value={dateList.id} onClick={handleSubmit}>
                Add Item
              </button>
            </div>
          </div>
        );
      })}
      <div
        className="card"
        style={{
          width: "25rem",
          height: "25rem",
          padding: "2rem",
          margin: "1rem",
          alignItems: "center",
        }}
      >
        <h1>Other Items</h1>
        {misc_items?.map((item) => {
          return (
            <div key={item.id}>
              <div key={item.id}>
                {item.name}: {item.quantity}
              </div>
              <Link
                to={`/packinglist/${packingListID}/items/${item.id}`}
                state={item}
              >
                <button>Edit</button>
              </Link>
              <button value={item.id} onClick={handleDelete}>
                Delete
              </button>
            </div>
          );
        })}
        <div>
          <input
            onChange={(e) => dispatch(handleNameChange(e.target.value))}
          ></input>
        </div>
        <div>
          <button value={null} onClick={handleSubmit}>
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateDetail;
