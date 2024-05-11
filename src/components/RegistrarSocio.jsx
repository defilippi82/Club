import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


export const RegistrarSocio = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');

  const auth = getAuth();
  const sociosCollection = collection(db, 'socios');

  const MySwal = withReactContent(Swal);

  const handleSubmit = async (e) => {
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
      const { user } = await createUserWithEmailAndPassword(auth, email, contrasena);

      // Agregar datos del usuario a la colección 'socios' en Firestore
      await addDoc(sociosCollection, {
        nombre,
        email: user.email,
        contrasena,
      });

      // Mostrar alerta de éxito
      MySwal.fire({
        title: 'Registro exitoso',
        text: 'El socio ha sido registrado correctamente',
        icon: 'success',
        showConfirmButton: true,
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
      <div>
        <h1>Registrar Nuevo Socio</h1>
      </div>
      <form onSubmit={handleSubmit} className="card card-body shadow-lg">
        <div className="elem-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="elem-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            placeholder="ejemplo@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="contrasena">Contraseña</label>
          <input
            type="password"
            id="contrasena"
            placeholder="XXXXXXXX"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Registrar
        </button>
      </form>
    </div>
  );
};
