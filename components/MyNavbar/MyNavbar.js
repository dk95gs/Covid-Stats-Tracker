import React from 'react';
import {
    Navbar,
    Nav
} from 'react-bootstrap'
const MyNavbar = () =>{
    return(
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Covid Stats</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/">Compare By Country</Nav.Link>
                <Nav.Link href="/graphs">Covid Timeline</Nav.Link>
                </Nav>
        </Navbar.Collapse>
</Navbar>
    )
}
export default MyNavbar;