import { React, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import {
  handlePasswordChange,
  handlePasswordConfirmationChange,
  handleEmailChange,
  reset,
  error,
} from "../features/auth/signupSlice";
import {
  useSignupMutation,
  useGetAccountQuery,
} from "../services/Travelthreads";
import { useNavigate } from "react-router-dom";

function SignUpModal({ showSignUpModal, handleCloseSignUpModal }) {
  const dispatch = useDispatch();
  const [signup] = useSignupMutation();
  const { fields: signUpFields } = useSelector((state) => state.signup);
  const navigate = useNavigate();
  const account = useGetAccountQuery();
  const { data } = account;


  useEffect(() => {
    if (data !== undefined) {
      navigate("/packinglists");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signUpFields.password !== signUpFields.passwordConfirmation) {
      dispatch(error("Password does not match confirmation"));
      return;
    }
    const { email, password } = signUpFields;
    signup({
      email,
      password,
    });
    dispatch(reset());
  };

  return (
    <Modal show={showSignUpModal} onHide={handleCloseSignUpModal}>
      <Modal.Header closeButton>
        <Modal.Title>Signup</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <input
              className="form-control form-control-sm"
              type={`text`}
              id="Signup__email"
              value={signUpFields.email}
              onChange={(e) => dispatch(handleEmailChange(e.target.value))}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <input
              className="form-control form-control-sm"
              type={`password`}
              id="Signup__password"
              value={signUpFields.password}
              onChange={(e) => dispatch(handlePasswordChange(e.target.value))}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <input
              className="form-control form-control-sm"
              type={`password`}
              id="Signup__password_confirmation"
              value={signUpFields.passwordConfirmation}
              onChange={(e) =>
                dispatch(handlePasswordConfirmationChange(e.target.value))
              }
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={handleCloseSignUpModal}
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SignUpModal;
