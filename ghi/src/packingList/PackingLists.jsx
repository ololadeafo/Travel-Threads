import React from "react";
import {
  useGetListsQuery,
  useDeleteListMutation,
} from "../services/Travelthreads";
import { Link } from "react-router-dom";

const PackingLists = () => {
  const [deleteList] = useDeleteListMutation();
  const {data: packingLists, isLoading} = useGetListsQuery();
  if (isLoading) return <div>Loading...</div>


  const checkLocationInfo = (input) => {
    if (input.city === "" && input.state === "") {
      return (
        <p>
          {input.location_info.name}
        </p>
      )
    } else if (input.city === "" && input.state !== ""){
      return (
        <p>
          {input.location_info.name},{" "}
          {input.location_info.country}
        </p>
      )
    } else {
      return(
        <p>
          {input.location_info.name},{" "}
          {input.location_info.state},{" "}
          {input.location_info.country}
        </p>
      )
    }
  }

  const handleDelete = (e, id) => {
    e.preventDefault();
    deleteList(id);
  };

  const changeDateFormat = (date) => {
    var newDate = date.split("-");
    return `${newDate[1]}/${newDate[2]}/${newDate[0]}`;
  };

  const cardStyle = {
    width: "300px",
    height: "300px",
    margin: "0 auto",
    padding: "1rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s linear",
    backgroundColor: "#FFA69E",
  };

  const cardHoverStyle = {
    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.1)",
  };

  const cardBodyStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  };

  const deleteButtonContainerStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "auto",
  };

  const wrapperStyle = {
    minHeight: "100vh",
    paddingTop: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#AED9E0",
    backgroundSize: "cover",
    minWidth: "100%",
  };

  const titleStyle = {
    textAlign: "center",
    marginBottom: "2rem",
  };

  const addButtonStyle = {
    textAlign: "center",
    marginBottom: "2rem",
  };

  const noPackingListsStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50vh",
  };

  return (
    <div className="container" style={wrapperStyle}>
      <h1 style={titleStyle}>Your packing lists</h1>
      <div style={addButtonStyle}>
        <Link to="/createlist" className="btn btn-primary">
          Add a Packing List
        </Link>
      </div>
      <div className="container">
        {packingLists?.length !== 0 ? (
          <div className="row justify-content-center align-items-center mt-5">
            {packingLists?.map((packinglist) => {
              return (
                <div
                  key={packinglist.id}
                  id={packinglist.id}
                  className="col-lg-4 mb-4"
                >
                  <Link
                    to={`/packinglist/${packinglist.id}`}
                    className="card-link text-decoration-none"
                  >
                    <div
                      className="card h-100"
                      style={cardStyle}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.boxShadow =
                          cardHoverStyle.boxShadow)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.boxShadow = cardStyle.boxShadow)
                      }
                    >
                      <div className="card-body" style={cardBodyStyle}>
                        <h5 className="card-title text-dark">
                          {packinglist.name}
                        </h5>
                        <p className="card-text text-dark">
                          {changeDateFormat(packinglist.start_date)} -{" "}
                          {changeDateFormat(packinglist.end_date)}
                        </p>
                          <br />
                          {checkLocationInfo(packinglist)}
                      </div>
                      <div style={deleteButtonContainerStyle}>
                        <button
                          className="btn btn-secondary"
                          onClick={(e) => handleDelete(e, packinglist.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={noPackingListsStyle}>No packing lists.</div>
        )}
      </div>
    </div>
  );
};

export default PackingLists;
