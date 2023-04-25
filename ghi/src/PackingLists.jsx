import React from "react";
import {
  useGetListsQuery,
  useDeleteListMutation,
} from "./services/Travelthreads";
import { Link } from "react-router-dom";

const PackingLists = () => {
  const packingLists = useGetListsQuery();
  const test = packingLists["data"];
  console.log(test);
  const [deleteList] = useDeleteListMutation();

  const handleDelete = (e, id) => {
    e.preventDefault();
    deleteList(id);
  };

  const cardStyle = {
    width: "300px",
    height: "300px",
    margin: "0 auto",
    padding: "1rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s linear",
    backgroundColor: "#FFA69E"

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
    minHeight: "60vh",
    paddingTop: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };
  const titleStyle = {
    textAlign: "center",
    marginBottom: "2rem",
  };
  const addButtonStyle = {
    textAlign: "center",
    marginBottom: "2rem",
  };

  return (
    <div className="container" style={wrapperStyle}>
      <h1 style={titleStyle}>Your packing lists</h1>
      <div style={addButtonStyle}>
        <Link to="/createlist" className="btn btn-primary">
          Add a Packing List
        </Link>
      </div>
      {test?.length !== 0 ? (
        <div className="row justify-content-center align-items-center mt-5">
          {packingLists["data"]?.map((packinglist) => {
            return (
              <div
                key={packinglist.id}
                id={packinglist.id}
                className="col-lg-4 mb-4" // Updated Bootstrap grid class to col-lg-4
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
                    <div
                      className="card-body"
                      id={packinglist.id}
                      style={cardBodyStyle}
                    >
                      <div>
                        <h5 className="card-title text-dark">
                          {packinglist.name}
                        </h5>
                        <p className="card-text text-dark">
                          {packinglist.start_date} - {packinglist.end_date}
                          <br />
                          {packinglist.city}, {packinglist.state},{" "}
                          {packinglist.country}
                        </p>
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
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div>No packing lists.</div>
      )}
    </div>
  );
};

export default PackingLists;
