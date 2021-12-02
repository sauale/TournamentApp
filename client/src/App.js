// client/src/App.js

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Users/Login";
import RegisterForm from "./components/Users/RegisterForm";
import { useState } from "react";
import Modal from "./components/UI/Modal";
import UsersLandingPage from "./pages/UserLandingPage";
import { Route, Routes, Navigate } from "react-router-dom";
function App() {
  const [data, setData] = React.useState(null);

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
      />
      {/* <Login onCloseLoginHandler={closeLoginHandler} /> */}

      {showRegister && <RegisterForm />}

      <Routes>
        <Route path="/" element={showLogin && <Login />}></Route>
        <Route path="/" element={showRegister && <RegisterForm />}></Route>
        <Route path="/UserLandingPage" element={<UsersLandingPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
