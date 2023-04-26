import { React, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {
  handlePasswordChange,
  handleEmailChange,
  reset,
} from "../features/auth/loginSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useGetAccountQuery,
  useLoginMutation,
} from "../services/Travelthreads";

function LoginModal({ show, handleClose }) {
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
  }, [account]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(fields);
    dispatch(reset());
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              value={fields.email}
              onChange={(e) => dispatch(handleEmailChange(e.target.value))}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              className="form-control"
              id="password"
              value={fields.password}
              onChange={(e) => dispatch(handlePasswordChange(e.target.value))}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleClose}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
