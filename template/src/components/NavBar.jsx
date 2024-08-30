import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';

function NavBar() {
    return (
        <Navbar className='bg-success' expand="lg" sticky="top">
            <Container >
                <Navbar.Brand as={NavLink} to="/"  className="text-white">Patrimoine économique</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto w-50 d-flex flex-row justify-content-around" >
                        <Nav.Link as={NavLink} to="/" end className=' text-white'>Accueil</Nav.Link>
                        <Nav.Link as={NavLink} to="/possesseurs" className=' text-white'>Possesseurs</Nav.Link>
                    </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;