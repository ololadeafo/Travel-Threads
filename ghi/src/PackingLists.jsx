import React from "react";
import {
  useGetListsQuery,
  useDeleteListMutation,
} from "./services/Travelthreads";
import { Link } from "react-router-dom";
import styles from "./font.css";

const PackingLists = () => {
  const packingLists = useGetListsQuery();
  const packingListData = packingLists["data"];
  console.log(packingListData);
  const [deleteList] = useDeleteListMutation();

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    var id = e.target.parentNode.getAttribute("id");
    deleteList(id);
  };


  const changeDateFormat = (date) => {
    var newDate = date.split("-");
    return `${newDate[1]}/${newDate[2]}/${newDate[0]}`
  };


  return (
    <div className="container">
      {packingListData?.length !== 0 ? (
        <div className="row">
          {packingListData?.map((packinglist) => {
            return (
              <div
                key={packinglist.id}
                id={packinglist.id}
                className="col-md-4 mb-4"
              >
                <Link
                  to={`/packinglist/${packinglist.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div
                    className={`card ${styles.righteous_cursive}`}
                    style={{ backgroundColor: "#FAF3DD" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{packinglist.name}</h5>
                      <p className="card-text">
                        {changeDateFormat(packinglist.start_date)} - {changeDateFormat(packinglist.end_date)}
                        <br />
                        {packinglist.cityInfo.name}, {packinglist.cityInfo.state},{" "}
                        {packinglist.cityInfo.country}
                      </p>
                      <button className="btn btn-danger" onClick={handleDelete}>
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
        <div>No packing lists.</div>
      )}
    </div>
  );
};

export default PackingLists;
