import { NavLink } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";
import travel_Threads from "./images/Logo/travel_Threads.png";
import { useGetAccountQuery } from "./services/Travelthreads";
import "./Nav.css";
import { useLogoutMutation } from "./services/Travelthreads";

function Nav() {
  const account = useGetAccountQuery();
  const [logout] = useLogoutMutation();

  return (
    <div className="Navbar">
      <div className="left-nav-bar">
        <NavLink to="/">
          <img className="logo" src={travel_Threads} alt="" />
        </NavLink>
      </div>
      <div className="right-nav-bar">
        {account.data === undefined ? (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/signup" className="nav-link">
              Sign Up
            </Link>
          </>
        ) : (
          <Link to="/" className="nav-link" onClick={logout}>
            Logout
          </Link>
        )}
      </div>
    </div>
  );
}

export default Nav;
