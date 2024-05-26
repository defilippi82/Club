import React,{ useEffect, useState} from 'react';
import { HashRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { Reservas } from "./components/Reservas";
import { Socios } from "./components/Socios";
import { Login } from "./components/Login";
import { RegistrarReserva } from "./components/RegistrarReserva";
import { RegistrarSocio } from "./components/RegistrarSocio";
import { EditarReserva } from "./components/EditarReserva";
import { EditarSocio } from "./components/EditarSocio";
import { NavbarComponent } from './components/Navbar.jsx';
import { UserProvider } from './components/UserContext';


export const App = () => {
  
  const [userData, setUserData]  = useState(null);
  
  

  useEffect(() => {
    const userDataFromStorage = localStorage.getItem('userData');
    if (userDataFromStorage) {
      setUserData(JSON.parse(userDataFromStorage));
    }
  }, []);
  
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
        <NavbarComponent handleLogout={handleLogout}/>
        </header>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/socios" element={<Socios />} />
          <Route path="/socios/create" element={<RegistrarSocio />} />
          <Route path="/socios/edit/:id" element={<EditarSocio />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/reservas/create" element={<RegistrarReserva />} />
          <Route path="/reservas/edit/:id" element={<EditarReserva />} />
          {userData ? null : <Route path="*" element={<Navigate to="/" />} />}
      </Routes>
    </UserProvider>
      </Router>
    </div>
    
  );
};
