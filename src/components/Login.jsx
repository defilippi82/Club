import { useState, useEffect } from 'react';


/* SWEET ALERT*/
import Swal from "sweetalert2";
import whitReactContent from "sweetalert2-react-content";
import { get } from "firebase/database";
const mySwal = whitReactContent(Swal)

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 

  const login = (e) => {
      e.preventDefault();

      // Ejemplo de alerta con SweetAlert2
      mySwal.fire({
        title: 'Ingreso exitoso',
        text: 'Bienvenido realice su reserva',
        icon: 'success',
        showConfirmButton: true,
        timer: 3000,
      }).then(() => {
        // Redirigir al usuario a otra página después de la alerta
        window.location = '/reservas/create';
      });
    };
  
    return (
      <div className="container">
        <div>
          <h1>Ingreso de Usuario</h1>
        </div>
        <form onSubmit={login}>
          <div className="elem-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="user"
              placeholder="ejemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="pass"
              id="pass"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Ingresar
          </button>
        </form>
        <h3>¿No tienes cuenta?</h3>
        <a href="/socios/create" className="btn btn-primary">
          Registrarse
        </a>
      </div>
    );


}