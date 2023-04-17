import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import {  useGetAccountQuery }from './services/Travelthreads'


const Main = () => {
    const { data } = useGetAccountQuery()
    console.log(data)
    return(
        <div>
            {data === null ? (
                    <Link to="/login">
                        <button type="button">
                            Get Packin!
                        </button>
                    </Link>

        ) : (
                <Link to="/lists">
                    <button type="button">
                        Get Packin!
                    </button>
                </Link>
        )}
        </div>
    )
    }
export default Main;
