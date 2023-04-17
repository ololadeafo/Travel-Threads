import { NavLink } from 'react-router-dom';
import React from "react";
// import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { useGetAccountQuery } from "./services/Travelthreads";
import  travel_Threads from "./images/Logo/travel_Threads.png"
import { useGetAccountQuery } from './services/Travelthreads';
import "./Nav.css"

function Nav() {
    const { data } = useGetAccountQuery()
    return(
        <div className="Navbar">
            <NavLink to="/"><img className="logo" src={ travel_Threads } alt=""/></NavLink>
            <div>
                {data === null ? (
                    <><Link to="/login">
                    <button type="button">
                        Login
                    </button>
                </Link><Link to="/signup">
                        <button type="button">
                            Sign Up
                        </button>
                    </Link></>
                ) : (
                    <Link to="/logout">
                        <button type="button">
                            Logout
                        </button>
                    </Link>
                )}
            </div>
        </div>
    )}

export default Nav
