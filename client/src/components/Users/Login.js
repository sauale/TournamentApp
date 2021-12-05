import { Form, Button } from "react-bootstrap";

import { useState } from "react";

import "./Login.css";

import Modal from "../UI/Modal";

import { login } from "./UsersFuctions";

import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    login(user).then((res) => {
      if (res) {
        navigate("/UserLandingPage");
        window.location.reload();
      }
    });
  };

  return (
    <div>
      <div className="container">
        <Form onSubmit={onSubmit}>
          <h1>Sign in</h1>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              className="w-25 input "
              type="email"
              placeholder="Email"
              name="username"
              value={email}
              onChange={onChangeEmail}
              //onChange={this.onChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              className="w-25 input"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChangePassword}
              //onChange={this.onChange}
            />
          </Form.Group>

          <Button
            className="btn btn-primary btn-sm"
            variant="primary"
            type="submit"
          >
            Sign in
          </Button>
        </Form>{" "}
      </div>
    </div>
  );
};

export default Login;
