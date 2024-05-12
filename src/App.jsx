import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Reservas } from "./components/Reservas";
import { Socios } from "./components/Socios";
import { Login } from "./components/Login";
import { RegistrarReserva } from "./components/RegistrarReserva";
import { RegistrarSocio } from "./components/RegistrarSocio";
import { EditarReserva } from "./components/EditarReserva";
import { EditarSocio } from "./components/EditarSocio";

export const App = () => {
  return (
    <div className="App container ">
      <BrowserRouter>
        <header>

          <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
            <Navbar.Brand href="#home">Club Social</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/reservas">Reservas</Nav.Link>
            <Nav.Link href="/socios">Socios</Nav.Link>
            </Nav>
            </Navbar.Collapse>

</Container>
          </Navbar>
        </header>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/socios" element={<Socios />} />
          <Route path="/socios/create" element={<RegistrarSocio />} />
          <Route path="/socios/edit/:id" element={<EditarSocio />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/reservas/create" element={<RegistrarReserva />} />
          <Route path="/reservas/edit/:id" element={<EditarReserva />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
