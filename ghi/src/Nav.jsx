import { NavLink } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";
import travel_Threads from "./images/Logo/travel_Threads.png";
import { useGetAccountQuery } from "./services/Travelthreads";
import { useLogoutMutation } from "./services/Travelthreads";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

function Nav({ handleShowLoginModal, handleShowSignUpModal }) {
  const account = useGetAccountQuery();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

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
              <Dropdown.Item onClick={() => handleShowLoginModal()}>
                Login
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleShowSignUpModal()}>
                Sign Up
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              Account
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/" onClick={handleLogout}>
                Logout
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/packinglists">
                My Packing Lists
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/createlist">
                Create Packing List
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </Navbar>
  );
}

export default Nav;
