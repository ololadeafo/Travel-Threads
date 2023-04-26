import { NavLink } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";
import travel_Threads from "./images/Logo/travel_Threads.png";
import { useGetAccountQuery } from "./services/Travelthreads";
import { useLogoutMutation } from "./services/Travelthreads";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import Navbar from "react-bootstrap/Navbar";

function Nav({ handleShow }) {
  const account = useGetAccountQuery();
  const [logout] = useLogoutMutation();

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        <NavLink className="navbar-brand" to="/">
          <img className="logo" src={travel_Threads} alt="" width={"60px"} />
        </NavLink>
      </Navbar.Brand>
      <div className="justified-content-end">
        {account.data === undefined ? (
          <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-button-dark-example1">
              Options
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleShow()}>Login</Dropdown.Item>
              <Dropdown.Item>
                <Link to="/signup" className="nav-link">
                  Sign Up
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              Account
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to="/" className="nav-link" onClick={logout}>
                  Logout
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/packinglists" className="nav-link">
                  My Packing Lists
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/createlist" className="nav-link">
                  Create Packing List
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </Navbar>
  );
}

export default Nav;
