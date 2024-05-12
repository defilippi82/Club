
import React, { useState, useContext } from 'react';
import { collection, addDoc, Timestamp,query,where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


export const RegistrarReserva = () => {
  const [cancha, setCancha] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [nombre, setNombre] = useState('');

  const reservasCollection = collection(db, 'reservas');

  const MySwal = withReactContent(Swal);

  // Definir el rango horario permitido (de 8 am a 11 pm)
  const horaInicio = 8;
  const horaFin = 23;

  // Función para generar los intervalos de tiempo
  const generarIntervalos = () => {
    const intervalos = [];
    for (let hora = horaInicio; hora <= horaFin; hora++) {
      for (let minuto = 0; minuto < 60; minuto += 30) {
        const horaFormateada = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
        intervalos.push(horaFormateada);
      }
    }
    return intervalos;
  };

  const intervalos = generarIntervalos();

  const handleSubmit = async (e) => {
    e.preventDefault();

     // Verificar disponibilidad de la cancha en la fecha y hora seleccionadas
     const q = query(reservasCollection, 
      where('cancha', '==', cancha),
      where('fecha', '==', Timestamp.fromDate(new Date(`${fecha}T${hora}`)))
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      MySwal.fire({
        title: 'Error',
        text: 'Ya existe una reserva para esta cancha en la fecha y hora seleccionadas',
        icon: 'error',
        showConfirmButton: true,
      });
      return;
    }

    

    try {
      // Agregar nueva reserva a la colección 'reservas' en Firestore
      await addDoc(reservasCollection, {
        cancha,
        fecha: Timestamp.fromDate(new Date(`${fecha}T${hora}`)),
        nombre,
      });

      // Mostrar alerta de éxito
      MySwal.fire({
        title: 'Reserva exitosa',
        text: 'La reserva ha sido registrada correctamente',
        icon: 'success',
        showConfirmButton: true,
      }).then(() => {
        // Redirigir al usuario a otra página después de la alerta
        window.location = '/reservas';
      });

      // Resetear los campos del formulario
      setCancha('');
      setFecha(null);
      setHora('');
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
  
  // value={fecha ? fecha.toISOString().split('T')[0] : ''} 
  return (
    <div className="container">
      <div className='card text-bg-primary mb-3 shadow-lg" style="max-width: 18rem;"'>
        <h1 className='card-header'>Registrar Nueva Reserva</h1>
      </div>
      <form onSubmit={handleSubmit} className="card card-body shadow-lg">
        <div className="elem-group">
          
          <div className='form-floating mb-3'>
            <select class="form-select"
            id="cancha"
            value={cancha}
            onChange={(e) => setCancha(e.target.value)}
            required>
            <option value="">Seleccionar cancha</option>
            <option value="Tenis 1">Tenis 1</option>
            <option value="Tenis 2">Tenis 2</option>
            <option value="Paddle 1">Paddle 1</option>
            <option value="Paddle 2">Paddle 2</option>
            <option value="Futbol 1">Fútbol 1</option>
            <option value="Futbol 2">Fútbol 2</option>
          </select>
          <label for="floatingSelectDisabled" htmlFor="cancha">Cancha</label>
            </div>
        </div>
        <div className="elem-group">
          <div className='form-floating mb-3'>
          <input className='form-control'
            type="date"
            id="fecha"
            value={fecha}
            class="form-control"
            onChange={(e) => setFecha(e.target.value)}
            required
            />
          <label for="floatingInputDisabled" htmlFor="fecha">Fecha</label>
            </div>
          <select class="form-select"
            id="hora"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
              >
            <option value="">Seleccionar hora</option>
            {intervalos.map((intervalo, index) => (
              <option key={index} value={intervalo}>{intervalo}</option>
            ))}
          </select>
        </div>
        <div className='form-floating mb-3'>
          <input className='form-control'
            type="text"
            id="nombre"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        <label for="floatingInputDisabled" htmlFor="nombre">Nombre</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Registrar
        </button>
      </form>
    </div>
  );
};
