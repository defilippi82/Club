import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';


export const RegistrarSocio = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [administrador, setAdministrador] = useState(false)

  const auth = getAuth();
  const sociosCollection = collection(db, 'socios');
  const navigate = useNavigate()

  const MySwal = withReactContent(Swal);

  const crearSocio = async (e) => {
    e.preventDefault();
   /*
    // Validar la contraseña (mínimo 8 caracteres alfanuméricos)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(nombre)) {
      MySwal.fire({
        title: 'Error',
        text: 'La contraseña debe tener al menos 8 caracteres alfanuméricos una letra mayúscula',
        icon: 'error',
        showConfirmButton: true,
      });
      return;
    }*/

    try {
      // Crear usuario en Firebase Authentication
      const { user } = await createUserWithEmailAndPassword(auth, email, contrasena, administrador);

      // Agregar datos del usuario a la colección 'socios' en Firestore
      await addDoc(sociosCollection, {
        nombre: nombre,
        email: email,
        contrasena: contrasena,
        administrador: false
      });

      // Mostrar alerta de éxito
      MySwal.fire({
        title: 'Registro exitoso',
        text: 'El socio ha sido registrado correctamente',
        icon: 'success',
        showConfirmButton: true,
      }).then(() => {
        // Redirigir al usuario a otra página después de la alerta
        navigate ('/');
      });
      
      // Resetear los campos del formulario
      setNombre('');
      setEmail('');
      setContrasena('');
    } catch (error) {
      // Mostrar alerta de error
      MySwal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="container">
       <div className='card text-bg-primary mb-3 shadow-lg" style="max-width: 18rem;"'>
        <h1 className='card-header'>Registrar Nueva Socio</h1>
      </div>
      <form onSubmit={crearSocio} className="card card-body shadow-lg">
        <div className="elem-group">
         <div className='form-floating mb-3'>

          <input className='form-control'
            type="text"
            id="nombre"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required />
          <label for="floatingInputDisabled" htmlFor="nombre">Nombre</label>
         </div>
        </div>
        <div className="elem-group">
        <div className='form-floating mb-3'>

          <input className='form-control'
            type="email"
            id="email"
            placeholder="ejemplo@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required/>
          <label for="floatingInputDisabled" htmlFor="email">Correo electrónico</label>
            </div>
        </div>
        <div className='form-floating mb-3'>
          <input className='form-control'
            type="password"
            id="contrasena"
            placeholder="XXXXXXXX"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required />
          <label for="floatingInputDisabled" htmlFor="contrasena">Contraseña</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Registrar
        </button>
      </form>
    </div>
  );
};
