import React, { Component } from "react";
import { Navbar, Form, Nav, Button } from "react-bootstrap";

class NavBar extends Component {
  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Assignment </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Form inline>
            <Button variant="outline-info">Login</Button>
          </Form>
        </Navbar>
      </>
    );
  }
}

export default NavBar;
