import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import WithoutHeader from "./WithoutHeader";
import WithHeader from "./WithHeader";
import Homepage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import TournamentCreation from "./pages/TournamentCreation/TournamentCreation";

function App() {
  const [role, setRole] = useState("GUEST");
  console.log(role);
  useEffect(() => {
    console.log(localStorage);
    const token = localStorage.usertoken;
    if (token) {
      console.log(token);
      const decoded = jwt_decode(token);
      setRole(decoded.role);
    }
  }, []);

  return (
    <div className="main-container">
      <Routes>
        <Route element={<WithoutHeader />}>
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/sign-up" element={<RegisterPage />} />
        </Route>

        <Route element={<WithHeader role={role} />}>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/create-tournament"
            element={<TournamentCreation role={role} />}
          />
          <Route
            path="/UserLandingPage"
            element={
              <>
                <ReactNotifications /> <LandingPage />
              </>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
