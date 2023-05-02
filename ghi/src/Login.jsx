import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  handlePasswordChange,
  handleEmailChange,
  reset,
} from "./features/auth/loginSlice";
import { useLoginMutation } from "./services/Travelthreads";
import { useGetAccountQuery } from "./services/Travelthreads";
import { useNavigate } from "react-router-dom";
import travelThreads from "./images/Logo/travel_Threads.png";

const Login = () => {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const { fields } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const account = useGetAccountQuery();
  const { data } = account;

  useEffect(() => {
    if (data !== undefined) {
      navigate("/packinglists");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(fields);
    dispatch(reset());
  };

  return (
    <div
      className="container"
      style={{
        backgroundColor: "#AED9E0",
        minHeight: "100vh",
        minWidth: "100%",
        marginTop: "0px",
      }}
    >
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <img
            src={travelThreads}
            alt="Travel Threads"
            style={{ width: "200px", marginBottom: "1rem", marginTop: "1em" }}
          />
          <h2 className="mb-3">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                value={fields.email}
                onChange={(e) => dispatch(handleEmailChange(e.target.value))}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={fields.password}
                onChange={(e) => dispatch(handlePasswordChange(e.target.value))}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
          <p className="mt-3">
            Don't have an account?{" "}
            <Link to="/signup" className="text-decoration-none">
              Click here to signup!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
