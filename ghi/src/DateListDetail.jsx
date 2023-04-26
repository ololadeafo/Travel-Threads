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
} from "./services/Travelthreads";
import { handleNameChange } from "./features/auth/createItem";

const DateDetail = () => {
  const params = useParams();
  var packingListID = params["id"];

  const { data: allDateLists } = useGetDatesQuery(params?.id, {
    skip: !params?.id,
  });
  console.log(allDateLists);

  const { data: allInfo } = useGetWeatherInfoQuery(params?.id, {
    skip: !params?.id,
  });

  const { data: packListItems } = useGetItemsByPacklistQuery(params.id);

  const misc_items = packListItems?.filter((item) => {
    return item.date_list_id === null;
  });

  const dispatch = useDispatch();
  const [createItem] = useCreateItemMutation();
  const [deleteItem] = useDeleteItemMutation();
  const { fields } = useSelector((state) => state.createItem);

  const handleSubmit = (e) => {
    e.preventDefault();

    var dateListID = e.target.value;
    if (dateListID === "") {
      dateListID = null;
    }

    var body = { packing_list_id: packingListID, date_list_id: dateListID };

    const item = createItem({ fields, body });
    console.log(item);
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
    <div className="container">
      {allDateLists?.map((dateList) => {
        let weatherCard = <div>Weather information not available</div>;
        let items = <div key=""></div>;
        if (
          allInfo !== undefined &&
          allInfo.daily.time.indexOf(dateList.date) !== -1
        ) {
          const index = allInfo.daily.time.indexOf(dateList.date);
          weatherCard = (
            <div key={dateList.date}>
              High: {allInfo.daily.temperature_2m_max[index]} Low:{" "}
              {allInfo.daily.temperature_2m_max[index]} Precipitation:{" "}
              {allInfo.daily.temperature_2m_max[index]}
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
                  {item.name} - {item.quantity}
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
          <table key={dateList.id} id={dateList.id}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Weather Information</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{changeDateFormat(dateList.date)}</td>
                {dateList.description !== "" ? (
                  <td>
                    <Link
                      to={`/packinglist/${packingListID}/datelists/${dateList.id}`}
                      state={dateList}
                    >
                      {dateList.description}
                    </Link>
                  </td>
                ) : (
                  <td>
                    <Link
                      to={`/packinglist/${packingListID}/datelists/${dateList.id}`}
                      state={dateList}
                    >
                      Add Description
                    </Link>
                  </td>
                )}
                <td>{weatherCard}</td>
                <td>{items}</td>
                <td>
                  <input
                    onChange={(e) => dispatch(handleNameChange(e.target.value))}
                  ></input>
                </td>
                <td>
                  <button value={dateList.id} onClick={handleSubmit}>
                    Add Item
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        );
      })}
      <div>
        <table>
          <thead>
            <tr>
              <th>Other Items</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
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
              </td>
              <td>
                <input
                  onChange={(e) => dispatch(handleNameChange(e.target.value))}
                ></input>
              </td>
              <td>
                <button value={null} onClick={handleSubmit}>
                  Add Item
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DateDetail;
