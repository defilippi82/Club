import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import { Reservas} from "./components/Reservas";
import { Socios } from "./components/Socios";
import { Login  } from "./components/Login";
import {RegistrarReserva} from "./components/RegistrarReserva";
import {RegistrarSocio} from "./components/RegistrarSocio";



export const App = () => {
 
  return (
    <div className="App">
    
    <BrowserRouter>
     <header>
      <Link to="/">
      <h1 className="inicio">Inicio</h1>
      </Link>
      <Link to="/reservas">
      <h1 className="reservas">Reservas</h1>
      </Link>
      <Link to="/socios">
      <h1 className="socios">Socios</h1>
      </Link>


    </header>
    
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/socios" element={<Socios/>}/>
      <Route path="/socios/create" element={<RegistrarSocio/>}/>
      <Route path="/socios/edit/:id" element="aca se EDITAN los registros"/>
      <Route path="/reservas" element={<Reservas/>}/>
      <Route path="/reservas/create" element={<RegistrarReserva/>}/>
      <Route path="/reservas/edit/:id" element="aca se EDITAN los registros"/>
    </Routes>
    </BrowserRouter>
  </div>
)

}
