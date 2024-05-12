import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <Link className="navbar-brand" href="/">
                Club Social
              </Link>
              
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarText"
                aria-controls="navbarText"
                aria-expanded="false"
                aria-label="Toggle navigation" >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link to="/" className="nav-link"><strong>Inicio</strong></Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link reservas" to="/reservas">
                      <strong>Reservas</strong>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link socios" to="/socios">
                      <strong>Socios</strong>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
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
