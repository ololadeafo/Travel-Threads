import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  handlePasswordChange,
  handleEmailChange,
  reset,
} from "./features/auth/loginSlice";
import { useLoginMutation } from "./services/Travelthreads";

const Login = () => {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const { fields } = useSelector((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(fields);
    dispatch(reset());
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-3">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
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
                Password:
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
        </div>
      </div>
    </div>
  );
};

export default Login;
