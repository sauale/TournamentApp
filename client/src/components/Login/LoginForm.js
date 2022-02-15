import React, { useState } from "react";
import "./LoginForm.css";
import { login } from "../../requests/UserRequests";
import { Store } from "react-notifications-component";
import { useNavigate } from "react-router-dom";
const LoginForm = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

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
      } else {
        Store.addNotification({
          title: "Error!",
          message: "The Email or/and Password is incorrect",
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true,
          },
        });
      }
    });
  };

  return (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        <div className="login-page">
          <div className="login-container">
            <h1 className="title-header">SIGN IN</h1>

            <div className="email-input">
              <h6>Email</h6>
              <input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>

            <div className="password-input">
              <h6>Password</h6>
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>

            <button className="submit-button"> Sign In</button>
            <h6>
              Don't have an account yet?{" "}
              <a className="sign-up-link" href="/sign-up">
                Sign Up
              </a>
            </h6>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default LoginForm;
