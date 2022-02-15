import React from "react";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  console.log(props.role);
  return (
    <React.Fragment>
      <Header role={props.role} />
      <Outlet />
    </React.Fragment>
  );
};
