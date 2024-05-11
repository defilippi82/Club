
import React, { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


export const RegistrarReserva = () => {
  const [cancha, setCancha] = useState('');
  const [fecha, setFecha] = useState(null);
  const [nombre, setNombre] = useState('');

  const reservasCollection = collection(db, 'reservas');

  const MySwal = withReactContent(Swal);

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    try {
      // Agregar nueva reserva a la colección 'reservas' en Firestore
      await addDoc(reservasCollection, {
        cancha,
        fecha: Timestamp.fromDate(new Date(fecha)),
        nombre,
      });

      // Mostrar alerta de éxito
      MySwal.fire({
        title: 'Reserva exitosa',
        text: 'La reserva ha sido registrada correctamente',
        icon: 'success',
        showConfirmButton: true,
      });

      // Resetear los campos del formulario
      setCancha('');
      setFecha(null);
      setNombre('');
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
        <h1>Registrar Nueva Reserva</h1>
      </div>
      <form onSubmit={handleSubmit} className="card card-body shadow-lg">
        <div className="elem-group">
          <label htmlFor="cancha">Cancha</label>
          <select
            id="cancha"
            value={cancha}
            onChange={(e) => setCancha(e.target.value)}
            required
          >
            <option value="">Seleccionar cancha</option>
            <option value="Tenis 1">Tenis 1</option>
            <option value="Tenis 2">Tenis 2</option>
            <option value="Paddle 1">Paddle 1</option>
            <option value="Paddle 2">Paddle 2</option>
            <option value="Futbol 1">Fútbol 1</option>
            <option value="Futbol 2">Fútbol 2</option>
          </select>
        </div>
        <div className="elem-group">
          <label htmlFor="fecha">Fecha</label>
          <input
            type="date"
            id="fecha"
            value={fecha ? fecha.toISOString().split('T')[0] : ''}
            onChange={(e) => setFecha(new Date(e.target.value))}
            required
          />
        </div>
        <div>
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
        <button type="submit" className="btn btn-primary">
          Registrar
        </button>
      </form>
    </div>
  );
};
