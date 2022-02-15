import React, { useEffect } from "react";
import { Store } from "react-notifications-component";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
const LandingPage = () => {
  return (
    <React.Fragment>
      <ReactNotifications />
      <h1>LandingPage</h1>
    </React.Fragment>
  );
};
export default LandingPage;
