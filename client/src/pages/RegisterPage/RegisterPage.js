import React from "react";
import RegisterForm from "./RegisterForm";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
const RegisterPage = () => {
  return (
    <React.Fragment>
      <ReactNotifications />
      <RegisterForm />
    </React.Fragment>
  );
};

export default RegisterPage;
