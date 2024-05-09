import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import { Socios } from "./components/Socios";




export const App=() => {
return (
  <div className="App">
    
    <BrowserRouter>
     <header>
      <Link to="/">
      <h1 className="inicio">Inicio</h1>
      </Link>
      <Link to="/ingresar">
      <h1 className="ingresar">Ingresar</h1>
      </Link>
      <Link to="/reservas">
      <h1 className="reservas">Reservas</h1>
      </Link>
      <Link to="/socios">
      <h1 className="socios">Socios</h1>
      </Link>

    </header>
    
    <Routes>
      <Route path="/" element="Pagina de Login"/>
      <Route path="/socios" element={<Socios/>}/>
      <Route path="/socios/create" element="aca se Crean los registros"/>
      <Route path="/socios/edit/:id" element="aca se EDITAN los registros"/>
    </Routes>
    </BrowserRouter>
  </div>
)

}
