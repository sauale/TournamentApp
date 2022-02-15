import React from "react";
import LoginForm from "../components/Login/LoginForm";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const LoginPage = () => {
  return (
    <React.Fragment>
      <ReactNotifications />
      <LoginForm />
    </React.Fragment>
  );
};

export default LoginPage;
