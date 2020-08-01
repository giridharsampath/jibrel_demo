import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Styles = styled.div`
  .navbar {
    background: #222;
  }
  .navbar-brand,
  .navbar-nav a {
    padding-left: 10px;
    color: #bbb;
    text-decoration: none;
    &:hover {
      color: #fff;
      text-decoration: none;
    }
  }
`;

export const NavigationBar = () => (
  <Styles>
    <Navbar expand="sm" bg="dark">
      <Navbar.Brand href="/">Skeleton App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item>
            <Link to="/">Home</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/about">About</Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
);
