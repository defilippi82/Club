import { useContext, useEffect, useState} from 'react';
import { HashRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Reservas } from "./components/Reservas";
import { Socios } from "./components/Socios";
import { Login } from "./components/Login";
import { RegistrarReserva } from "./components/RegistrarReserva";
import { RegistrarSocio } from "./components/RegistrarSocio";
import { EditarReserva } from "./components/EditarReserva";
import { EditarSocio } from "./components/EditarSocio";

import { UserContext } from './components/UserContext';
import { UserProvider } from './components/UserContext';


export const App = () => {
  
  const [userData, setUserData]  = useState(null);
  
  

  useEffect(() => {
    const userDataFromStorage = localStorage.getItem('userData');
    if (userDataFromStorage) {
      setUserData(JSON.parse(userDataFromStorage));
    }
  }, [userData]);
  
  const handleLogout = () => {
    // Limpiar los datos de usuario al cerrar sesión
    localStorage.removeItem('userData');
    setUserData(null);
   
  };
           
  return (
    
    <div className="App container ">
      <Router>
      <UserProvider>
        <header>
        <Navbar expand="lg" className="navbar-collapse ">
            <Container>
            <Navbar.Brand className="navbarbrand" href="/">Club Social{userData && userData.nombre && (<>
            <>¡Hola {userData.nombre}!</></>)}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            
            {userData && userData.nombre && userData.administrador && (
            <>

            <Nav.Link className='navlinks' href="/">Inicio</Nav.Link>
            <Nav.Link className='navlinks' href="/reservas">Reservas</Nav.Link>
            <Nav.Link className='navlinks' href="/socios">Socios</Nav.Link>
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
        </header>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="#/socios" element={<Socios />} />
          <Route path="#/socios/create" element={<RegistrarSocio />} />
          <Route path="#/socios/edit/:id" element={<EditarSocio />} />
          <Route path="#/reservas" element={<Reservas />} />
          <Route path="#/reservas/create" element={<RegistrarReserva />} />
          <Route path="#/reservas/edit/:id" element={<EditarReserva />} />
          {userData ? null : <Route path="*" element={<Navigate to="/" />} />}
      </Routes>
    </UserProvider>
      </Router>
    </div>
    
  );
};
