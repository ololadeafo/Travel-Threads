import React from "react";
import { Link } from "react-router-dom";
import { useGetAccountQuery } from "./services/Travelthreads";
import "./Main.css";

const Main = () => {
  const { data } = useGetAccountQuery();

  return (
    <div>
      {data === undefined ? (
        <Link to="/login">
          <button type="button" class="btn btn-outline-dark">
            Get Packin!
          </button>
        </Link>
      ) : (
        <Link to="/packinglists">
          <button type="button">Get Packin!</button>
        </Link>
      )}
    </div>
  );
};
export default Main;
