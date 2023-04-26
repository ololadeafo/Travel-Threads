import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  handlePasswordChange,
  handlePasswordConfirmationChange,
  handleEmailChange,
  reset,
  error,
} from "./features/auth/signupSlice";
import ErrorNotification from "./ErrorNotification";
import { useSignupMutation } from "./services/Travelthreads";
import { useNavigate } from "react-router-dom";
import { useGetAccountQuery } from "./services/Travelthreads";
import travelThreads from "./images/Logo/travel_Threads.png";

const Signup = () => {
  const dispatch = useDispatch();
  const [signup] = useSignupMutation();
  const { errorNotification, fields } = useSelector((state) => state.signup);
  const navigate = useNavigate();
  const account = useGetAccountQuery();
  const { data } = account;

  useEffect(() => {
    if (data !== undefined) {
      navigate("/packinglists");
    }
  }, [account]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fields.password !== fields.passwordConfirmation) {
      dispatch(error("Password does not match confirmation"));
      return;
    }
    const { email, password } = fields;
    signup({
      email,
      password,
    });
    dispatch(reset());
  };

  return (
    <div
      className="container"
      style={{ backgroundColor: "#AED9E0", minHeight: "100vh", minWidth:"100%", marginTop: "0%" }}
    >
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <img
            src={travelThreads}
            alt="Travel Threads"
            style={{ width: "200px", marginBottom: "1rem" }}
          />
          <h2 className="mb-3">Signup</h2>
          <form onSubmit={handleSubmit}>
            {errorNotification && (
              <ErrorNotification>{errorNotification}</ErrorNotification>
            )}
            <div className="mb-3">
              <label htmlFor="Signup__email" className="form-label">
                Email:
              </label>
              <input
                className="form-control form-control-sm"
                type={`text`}
                id="Signup__email"
                value={fields.email}
                onChange={(e) => dispatch(handleEmailChange(e.target.value))}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Signup__password" className="form-label">
                Password:
              </label>
              <input
                className="form-control form-control-sm"
                type={`password`}
                id="Signup__password"
                value={fields.password}
                onChange={(e) => dispatch(handlePasswordChange(e.target.value))}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="Signup__password_confirmation"
                className="form-label"
              >
                Confirm Password:
              </label>
              <input
                className="form-control form-control-sm"
                type={`password`}
                id="Signup__password_confirmation"
                value={fields.passwordConfirmation}
                onChange={(e) =>
                  dispatch(handlePasswordConfirmationChange(e.target.value))
                }
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
