import { Form, Button } from "react-bootstrap";

import { useState } from "react";

import "./Login.css";
import { useNavigate } from "react-router-dom";
import Modal from "../UI/Modal";
import { register } from "./UsersFuctions";

const RegisterForm = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      username: username,
      password: password,
      email: email,
    };

    register(newUser).then((res) => {
      alert("registered!");
      navigate("/");
    });
  };

  return (
    <div>
      <div className="container">
        <Form onSubmit={onSubmit}>
          <h1>Sign up</h1>
          <Form.Group controlId="formBasicUser">
            <Form.Control
              className="w-25 input "
              type="username"
              placeholder="username"
              name="username"
              value={username}
              onChange={onChangeUsername}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Control
              className="w-25 input "
              type="email"
              placeholder="Email"
              name="username"
              value={email}
              onChange={onChangeEmail}
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
            />
          </Form.Group>
          <Button className="button" variant="primary" type="submit">
            Sign up
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
