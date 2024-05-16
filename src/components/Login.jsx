import { useState,  useContext } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {collection,getDocs,deleteDoc,doc,query,where} from "firebase/firestore";
import {db} from "../firebaseConfig/firebase";
import { UserContext } from './UserContext';

/* SWEET ALERT*/
import Swal from "sweetalert2";
import whitReactContent from "sweetalert2-react-content";

const MySwal = whitReactContent(Swal)

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const login = async (e) => {
      e.preventDefault();

      const q = query(collection(db, "socios"), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
    try {
      // Query Firestore para credenciales del usuario
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          console.log(userData)
          if (userData.contrasena === password) {
            setUserData(userData); // Actualizar userData en el contexto
            localStorage.setItem('userData', JSON.stringify(userData));
            setUserData(userData);// Esperar a que setUserData se complete
              MySwal.fire({
                title: 'Ingreso exitoso',
                text: `¡Bienvenido, ${userData.nombre}! Realice su reserva`,
                icon: 'success',
                showConfirmButton: true,
                timer: 3000,
              }).then(() => {
                navigate('/reservas/create');
                
              });
              
          } else {
            // Passwords don't match
            MySwal.fire({
              title: 'Error',
              text: 'Contraseña incorrecta',
              icon: 'error',
              showConfirmButton: true,
            });
          }
        });
      } else {
        // User not found
        MySwal.fire({
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
       
        <div className="row justify-content-center">
        <div className="col-md-6">
        <div className="d-flex justify-content-center">
        <div className="login-key text-center">
          <i className="fa fa-user-circle fa-10x" aria-hidden="true"></i>
         </div>
        </div>
      </div>
        </div>
        
        <form onSubmit={login}>
          <div className="input-group mx-auto mb-3">
            <label  className="labels" htmlFor="email">Correo electrónico</label>
            <input className='form-control no-outline' type="email" id="email" name="user"
              placeholder="ejemplo@email.com" value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group mx-auto mb-3">
            <label className="labels" htmlFor="password">Contraseña</label>
            <input className='form-control no-outline' type="password"
              name="pass"
              id="pass"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="buttons">
          <button type="submit" className="btn btn-primary">
            Ingresar
          </button>
          <Link to ="/socios/create" className="btn btn-primary"> Registrarse </Link>
          </div>
        </form>
        
        
      
      </div>
    );


}