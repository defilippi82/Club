import { useState, useEffect } from 'react';
import {Link} from "react-router-dom";


/* SWEET ALERT*/
import Swal from "sweetalert2";
import whitReactContent from "sweetalert2-react-content";

import {collection,getDocs,deleteDoc,doc,query,where} from "firebase/firestore";
import {db} from "../firebaseConfig/firebase";


const mySwal = whitReactContent(Swal)

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  
  const login = async (e) => {
    e.preventDefault();
  
    try {
      // Query Firestore for the user's credentials
      const q = query(collection(db, "socios"), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          console.log(userData)
          if (userData.contrasena === password) {
            // Passwords match, login successful
            mySwal
              .fire({
                title: 'Ingreso exitoso',
                text: `Bienvenido ${email} realice su reserva`,
                icon: 'success',
                showConfirmButton: true,
                timer: 3000,
              })
              .then(() => {
                // Redirigir al usuario a otra página después de la alerta
                window.location = '/reservas/create';
              });
          } else {
            // Passwords don't match
            mySwal.fire({
              title: 'Error',
              text: 'Contraseña incorrecta',
              icon: 'error',
              showConfirmButton: true,
            });
          }
        });
      } else {
        // User not found
        mySwal.fire({
          title: 'Error',
          text: 'Usuario no encontrado',
          icon: 'error',
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };
  
    return (
      <div className="container">
        <div>
          <h1>Ingreso de Usuario</h1>
        </div>
        <form onSubmit={login}>
          <div className="input-group mb-3">
            <label className='input-group-text' htmlFor="email">Correo electrónico</label>
            <input className='form-control'
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
            <label className='input-group-text' htmlFor="password">Contraseña</label>
            <input className='form-control' type="password"
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
        <Link to ="/socios/create" className="btn btn-primary"> Registrarse </Link>
       
      </div>
    );


}