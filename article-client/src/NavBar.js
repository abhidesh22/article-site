import React from 'react';
import {Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
// @desc    Navigation module to show all options for users

const NavBar = ({user}) => (
    <Navbar bg="primary" expand="lg" variant="dark">
    <Container>
        <Navbar.Brand href="/">Article App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href="/articlelist">Articles</Nav.Link>
            </Nav>
            <NavDropdown className = "mr-auto " title={user} id="collasible-nav-dropdown">
                <NavDropdown.Item href = "/" onClick = {() => {
                    localStorage.removeItem("loggedUser");
                }}>Logout</NavDropdown.Item>
            </NavDropdown>
        </Navbar.Collapse>
    </Container>
    </Navbar>
);

export default NavBar;