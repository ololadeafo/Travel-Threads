import React, { useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import { handlePasswordChange, handleEmailChange, reset } from "./features/auth/loginSlice";
import { useLoginMutation } from "./services/Travelthreads";

const Login = () => {
    const dispatch = useDispatch()
    const [login] = useLoginMutation()
    const { fields } = useSelector(state => state.login)
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault()
        login(fields)
        dispatch(reset());
        setShowModal(false);
    };

    return (
        <>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Login
        </button>
        {showModal && (
            <div className="modal" onClick={() => setShowModal(false)}>
                <div className="model-content" onClick={(e) => e.stopPropagation()}>
                    <h5 className="card-title">Login</h5>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="Login__email" className="form-label">
                                Emial:
                            </label>
                            <input
                                className="form-control form-control-sm"
                                type={`text`}
                                id="Login__email"
                                value={fields.email}
                                onChange={(e) => dispatch(handleEmailChange(e.target.value))}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Login__password" className="form-label">
                                Password:
                            </label>
                            <input
                                className="form-control form-control-sm"
                                type={`password`}
                                id="Login__password"
                                value={fields.password}
                                onChange={(e) => dispatch(handlePasswordChange(e.target.value))}
                            />
                        </div>
                        <button type="submit" className="btn btn-success">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        )}
        </>
    );
    };


export default Login;
