import React, { useState } from "react";
import "../../components/Login/LoginForm.css";
import { register } from "../../requests/UserRequests";
import { useNavigate } from "react-router-dom";
import { Store } from "react-notifications-component";
const RegisterForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [isValid, setIsValid] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      username: username,
      password: password,
      email: email,
    };

    register(newUser).then((res) => {
      if (res) {
        navigate("/sign-in");
        Store.addNotification({
          title: "Succes!",
          message: "Successfully registered!",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true,
          },
        });
      } else {
        Store.addNotification({
          title: "Error!",
          message: "The Username or/and Email already exists",
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
            <h1 className="title-header">SIGN UP</h1>

            <div className="email-input">
              <h6>Username</h6>
              <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </div>

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

            {!isValid && (
              <h6 className="error-message">
                The Email or/and Password is incorrect
              </h6>
            )}

            <button className="submit-button"> Sign Up</button>
            <h6>
              Already have an account?{" "}
              <a className="sign-up-link" href="/sign-in">
                Sign in
              </a>
            </h6>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};
export default RegisterForm;
