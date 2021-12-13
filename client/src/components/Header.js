//import { Navbar } from "react-bootstrap";
import { Navbar, Button, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import axios from "axios";
import { useState } from "react";
const Header = (props) => {
  const logOut = (e) => {
    // const token = localStorage.usertoken;
    // axios
    //   .get("/api/Auth/logout")
    //   .then((response) => {
    //     console.log("logged out");
    //   })
    //   .catch(() => {
    //     alert("ERROR");
    //   });

    e.preventDefault();
    localStorage.removeItem("usertoken");
    window.location.href = "/";
  };
  return (
    <div>
      <Navbar bg="light" expand="lg" className="Nav">
        <Navbar.Brand href="/" class="brand_name brand">
          Tournament App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/Tournaments">Tournaments</Nav.Link>
            <Nav.Link href="/Teams">Teams</Nav.Link>
            {props.role == "ADMIN" && <Nav.Link href="/Users">Users</Nav.Link>}
            {props.role == "USER" && <Nav.Link href="/MyTeam">MyTeam</Nav.Link>}
          </Nav>
          <Nav className="ms-auto btn-space">
            {props.role == "GUEST" && (
              <Button
                className="btn-space"
                variant="primary"
                size="md"
                onClick={props.onShowLoginHandler}
              >
                Sign in
              </Button>
            )}
            {props.role == "GUEST" && (
              <Button
                className="btn-space"
                variant="primary"
                size="md"
                onClick={props.onShowRegisterHandler}
              >
                Sign up
              </Button>
            )}

            {props.role !== "GUEST" && (
              <Button
                className="btn-space"
                variant="primary"
                size="md"
                onClick={logOut}
              >
                Log out
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
