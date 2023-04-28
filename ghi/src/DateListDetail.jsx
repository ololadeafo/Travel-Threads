import { React } from "react";
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

    const parent = e.target.parentNode;
    const container = parent.parentNode;
    var input = container.children[0].children[0].value;

    if (input === "") {
      input = "New Item";
    }

    var data = {
      name: input,
      quantity: fields.quantity,
      is_packed: fields.is_packed,
    };

    var dateListID = e.target.value;
    if (dateListID === "") {
      dateListID = null;
    }

    var body = { packing_list_id: packingListID, date_list_id: dateListID };

    createItem({ data, body });
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
    width: "12em",
    height: "27em",
    margin: ".5em",
    padding: "1em",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s linear",
    backgroundColor: "#FFA69E",
  };

  const dateListWindow = {
    overflowX: "scroll",
    flexWrap: "nowrap",
    margin: "1em",
    backgroundColor: "#5E6472",
    borderRadius: "10px",
  };

  const miscItemsStyle = {
    height: "auto",
    margin: "1em",
    padding: "1em",
    backgroundColor: "#FFA69E",
  };

  const cardBodyStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  };

  const editDelete = {
    border: "none",
    backgroundColor: "inherit",
    padding: "0px",
    fontSize: ".85em",
    whiteSpace: "nowrap",
  };

  const itemTableCard = {
    height: "100%",
    width: "100%",
    overflow: "auto",
  };

  const itemTable = {
    width: "100%",
    height: "auto",
  };

  return (
    <div
      className="container"
      style={{
        minWidth: "100%",
        minHeight: "100vh",
        height: "auto",
        backgroundImage: "linear-gradient(to bottom right, #AED9E0, #FFA69E)",
      }}
    >
      <Link
        to={`/packinglist/${packingListID}`}
        className="header"
        style={{
          display: "flex",
          justifyContent: "center",
          padddingTop: "1em",
          textDecoration: "none",
          color: "black",
        }}
      >
        <h1>{packingListDetail?.name}</h1>
      </Link>
      <div className="row" style={dateListWindow}>
        {allDateLists?.map((dateList) => {
          let weatherCard = (
            <div
              style={{
                paddingLeft: "1em",
                paddingTop: ".25em",
                paddingBottom: ".25em",
              }}
            >
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
                className="col card"
                style={{ width: "10em", border: "solid 1px" }}
              >
                <div
                  style={{
                    paddingLeft: "1em",
                    paddingTop: ".25em",
                    paddingBottom: ".25em",
                    backgroundColor: "",
                  }}
                >
                  High: {allInfo.daily.temperature_2m_max[index]}°F
                  <br />
                  Low: {allInfo.daily.temperature_2m_min[index]}°F
                  <br />
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
                <tr key={item.id} style={{ borderBottom: "solid 1px" }}>
                  <td style={{ textAlign: "left" }}>{item.name}</td>
                  <td style={{ textAlign: "center" }}>{item.quantity}</td>
                  <td className="buttons">
                    <Link
                      to={`/packinglist/${packingListID}/items/${item.id}`}
                      state={item}
                    >
                      <button style={editDelete}>&#9998;</button>
                    </Link>
                    <button
                      value={item.id}
                      onClick={handleDelete}
                      style={editDelete}
                    >
                      &#x2715;
                    </button>
                  </td>
                </tr>
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
                <h3 style={{ marginBottom: "15px" }}>
                  {changeDateFormat(dateList.date)}
                </h3>
                {dateList.description !== "" ? (
                  <div style={{ textAlign: "center", marginBottom: ".25em" }}>
                    <Link
                      to={`/packinglist/${packingListID}/datelists/${dateList.id}`}
                      state={dateList}
                      style={{
                        textDecoration: "none",
                        color: "black",
                        fontSize: ".8em",
                      }}
                    >
                      {dateList.description}
                    </Link>
                  </div>
                ) : (
                  <div style={{ textAlign: "center", marginBottom: ".25em" }}>
                    <Link
                      to={`/packinglist/${packingListID}/datelists/${dateList.id}`}
                      state={dateList}
                      style={{
                        textDecoration: "none",
                        color: "black",
                        fontSize: ".8em",
                      }}
                    >
                      Add Description
                    </Link>
                  </div>
                )}
                <div>{weatherCard}</div>
                <div style={itemTableCard}>
                  <table style={itemTable}>
                    <thead>
                      <tr style={{ borderBottom: "solid 1px" }}>
                        <th style={{ width: "60%" }}>Item</th>
                        <th>Qty</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>{items}</tbody>
                  </table>
                </div>
                <div className="input-div" style={{ display: "flex" }}>
                  <div>
                    <input
                      style={{
                        height: "1.25em",
                        width: "7em",
                        borderRadius: "4px",
                      }}
                    ></input>
                  </div>
                  <div>
                    <button
                      value={dateList.id}
                      onClick={handleSubmit}
                      style={{
                        fontSize: ".75em",
                        height: "1.65em",
                        borderRadius: "3px",
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className="card"
        style={{
          ...miscItemsStyle,
          marginBottom: "150px",
          display: "inline-block",
        }}
      >
        <h3 style={{ marginBottom: "15px" }}>Other Items</h3>
        {misc_items?.map((item) => {
          return (
            <div
              key={item.id}
              style={{
                backgroundColor: "white",
                border: "solid 1px",
                borderRadius: "5px",
                display: "inline-block",
                whiteSpace: "nowrap",
                marginRight: ".5em",
                marginBottom: ".5em",
                padding: ".5em",
              }}
            >
              {item.name}: {item.quantity}
              <Link
                to={`/packinglist/${packingListID}/items/${item.id}`}
                state={item}
              >
                <button style={{ ...editDelete, marginLeft: "1em" }}>
                  {" "}
                  &#9998;{" "}
                </button>
              </Link>
              <button value={item.id} onClick={handleDelete} style={editDelete}>
                &#x2715;
              </button>
            </div>
          );
        })}
        <div className="input-div" style={{ display: "flex" }}>
          <div>
            <input
              style={{ height: "1.25em", width: "20em", borderRadius: "4px" }}
            ></input>
          </div>
          <div>
            <button
              value={null}
              onClick={handleSubmit}
              style={{
                fontSize: ".75em",
                height: "1.65em",
                borderRadius: "3px",
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateDetail;
