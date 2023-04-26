import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetAccountQuery } from "./services/Travelthreads";
import suitcase from "./images/mainPage/suitcase.png";
import airplane from "./images/mainPage/airplane.png";
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Righteous&display=swap"
/>;
const Main = () => {
  const { data } = useGetAccountQuery();
  const isLoggedIn = !!data;

  const actionButton = {
    fontFamily: "Righteous, cursive",
    fontSize: "24px",
    borderRadius: "30px",
    boxShadow: "5px 5px 5px rgba(0,0,0,0.2)",
    backgroundColor: "#FFA69E",
    color: "white",
  }

  const heading = {
    fontFamily: "Righteous, cursive",
    fontSize: "36px",
    fontWeight: "bold",
    color: "white",
    marginBottom: "-20px",
  }
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center vh-100"
      style={{ backgroundColor: "#AED9E0" }}
    >
      <h1
        className="mb-5"
        style={{heading}}
      >
        Welcome to Travel Threads!
      </h1>
      <div className="d-flex justify-content-center align-items-center">
        <img src={suitcase} alt="Suitcase" style={{ width: "20%" }} />
        <img src={airplane} alt="Airplane" style={{ width: "20%" }} />
      </div>
      <Link to={isLoggedIn ? "/packinglists" : "/login"}>
        <button
          type="button"
          className="btn btn-primary btn-lg mt-5"
          style={{actionButton}}
        >
          Get Packin!
        </button>
      </Link>
    </div>
  );
};

export default Main;
