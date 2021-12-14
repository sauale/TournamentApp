// client/src/App.js
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Users/Login";
import RegisterForm from "./components/Users/RegisterForm";
import { useState, useEffect } from "react";
import Modal from "./components/UI/Modal";
import UsersLandingPage from "./pages/UserLandingPage";
import { Route, Routes, Navigate } from "react-router-dom";
import TournamentsPage from "./pages/Tournament/TournamentsPage";
import TournamentDetails from "./pages/Tournament/TournamentsDetails";
import TeamsPage from "./pages/Team/TeamsPage";
import TeamDetails from "./pages/Team/TeamDetails";
import MyTeamPage from "./pages/Team/MyTeamPage";
import jwt_decode from "jwt-decode";
import UsersList from "./pages/Users/UsersList";
import UserEditPage from "./pages/Users/UserEditPage";
import Example from "./components/Users/pvz";
import MatchesPage from "./pages/Matches/MatchesPage";

function App() {
  const [data, setData] = React.useState(null);
  const [role, setRole] = React.useState("GUEST");

  useEffect(() => {
    const token = localStorage.usertoken;
    if (token) {
      console.log(token);
      const decoded = jwt_decode(token);
      setRole(decoded.role);
      console.log(role);
    }
    console.log(role);
  }, []);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    console.log("click");
  };

  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    console.log("clickk");
  };

  return (
    <div>
      <Header
        onShowLoginHandler={showLoginHandler}
        onShowRegisterHandler={showRegisterHandler}
        role={role}
      />
      {/* <Login onCloseLoginHandler={closeLoginHandler} /> */}

      {showRegister && <RegisterForm />}

      <Routes>
        <Route path="/" element={showLogin && <Login />}></Route>
        <Route path="/" element={showRegister && <RegisterForm />}></Route>
        <Route path="/UserLandingPage" element={<UsersLandingPage />}></Route>
        <Route
          path="/Tournaments"
          element={<TournamentsPage role={role} />}
        ></Route>
        <Route path="/Tournaments/:id" element={<TournamentDetails />}></Route>
        <Route path="/Teams" element={<TeamsPage />}></Route>
        <Route path="/Teams/:id" element={<TeamDetails />}></Route>
        <Route path="/MyTeam" element={<MyTeamPage />}></Route>
        <Route path="/Users" element={<UsersList />}></Route>
        <Route path="/UserEditPage" element={<UserEditPage />}></Route>
        <Route path="/Matches" element={<MatchesPage role={role} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
