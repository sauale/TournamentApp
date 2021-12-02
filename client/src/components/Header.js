//import { Navbar } from "react-bootstrap";
import { Navbar, Button, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import { useState } from "react";
const Header = (props) => {
  return (
    <div>
      <Navbar bg="light" expand="lg" className="Nav">
        <Navbar.Brand href="/" class="brand_name">
          Tournament App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#home">Kontaktai</Nav.Link>
            <Nav.Link href="#link">DUK</Nav.Link>
          </Nav>
          <Nav className="ms-auto btn-space">
            <Button
              className="btn-space"
              variant="primary"
              size="md"
              onClick={props.onShowLoginHandler}
            >
              Sign in
            </Button>
            <Button
              className="btn-space"
              variant="primary"
              size="md"
              onClick={props.onShowRegisterHandler}
            >
              Sign up
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
