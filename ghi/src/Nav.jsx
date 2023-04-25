import { NavLink } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";
import travel_Threads from "./images/Logo/travel_Threads.png";
import { useGetAccountQuery } from "./services/Travelthreads";
import { useLogoutMutation } from "./services/Travelthreads";
import "bootstrap/dist/css/bootstrap.min.css";

function Nav() {
  const account = useGetAccountQuery();
  const [logout] = useLogoutMutation();

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={{ height: "5em" }}
    >
      <NavLink className="navbar-brand" to="/" style={{ height: "100%" }}>
        <img
          className="logo"
          src={travel_Threads}
          alt=""
          style={{ height: "100%" }}
        />
      </NavLink>
      <div
        className="navbar-nav ml-auto right-nav-bar"
        style={{ alignItems: "center" }}
      >
        {account.data === undefined ? (
          <>
            <Link
              to="/login"
              className="nav-link"
              style={{
                color: "white",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="nav-link"
              style={{
                color: "white",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              Sign Up
            </Link>
          </>
        ) : (
          <Link
            to="/"
            className="nav-link"
            onClick={logout}
            style={{
              color: "white",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            Logout
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Nav;
