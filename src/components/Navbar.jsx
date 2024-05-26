import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { UserContext } from './UserContext';

export const NavbarComponent = ({handleLogout}) => {
    const { userData } = useContext(UserContext);
    return(
        <Navbar expand="lg" className="navbar-collapse ">
            <Container>
            <Navbar.Brand className="navbarbrand" href="/">Club Social{userData && userData.nombre && (<>
            <>¡Hola {userData.nombre}!</></>)}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            
            {userData && userData.nombre && userData.administrador && (
            <>

            <Nav.Link className='navlinks' href="#/">Inicio</Nav.Link>
            <Nav.Link className='navlinks' href="#/reservas">Reservas</Nav.Link>
            <Nav.Link className='navlinks' href="#/socios">Socios</Nav.Link>
            </>
            )}
            {userData && userData.nombre && (
              <>
            <Button variant="outline-danger" href="/" onClick={ handleLogout}>Salir</Button>
            </>

              )}
            
            </Nav>
            </Navbar.Collapse>
            </Container>
          </Navbar>
    )

}