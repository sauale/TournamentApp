import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";

const Header = (props) => {
  const [show, setShow] = useState(false);

  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    window.location.href = "/";
  };
  return (
    <div className="header">
      <div className="header-brand">
        <a href="/">
          <h2>Logo</h2>
        </a>
      </div>

      {props.role !== "USER" && (
        <a href="/sign-up">
          <button className="header-sign-up">Sign up</button>
        </a>
      )}
      {props.role !== "USER" && (
        <a href="/sign-in">
          <button className="header-sign-in">Sign In</button>
        </a>
      )}
      {props.role === "USER" && (
        <button className="header-sign-up" onClick={logOut}>
          Log Out
        </button>
      )}

      <Dropdown
        show={show}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="tournament-dropdown"
      >
        <Dropdown.Toggle className="tournament-dropdown-toggle">
          Tournaments
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ backgroundColor: "#353535" }}>
          <Dropdown.Item className="tournament-dropdown-item" href="#/action-1">
            View Tournaments
          </Dropdown.Item>
          <Dropdown.Item
            className="tournament-dropdown-item"
            href="/create-tournament"
          >
            Create Tournament
          </Dropdown.Item>
          <Dropdown.Item className="tournament-dropdown-item" href="#/action-3">
            Something else
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Header;
