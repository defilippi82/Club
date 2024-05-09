import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

/* SWEET ALERT*/
import Swal from "sweetalert2";
import whitReactContent from "sweetalert2-react-content";
import { get } from "firebase/database";
const mySwal = whitReactContent(Swal)

export const RegistrarReserva = ({ userId, name }) => {
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [cancha, setCancha] = useState('');

  
  
  const isLogin = (e) => {
    e.preventDefault();
    // Aquí puedes realizar la lógica para registrar la reserva
    // Por ejemplo, puedes enviar una solicitud a un servidor o guardar la reserva en una base de datos

    // Ejemplo de alerta con SweetAlert2
    MySwal.fire({
      title: 'Reserva exitosa',
      text: 'Tu reserva ha sido registrada',
      icon: 'success',
      showConfirmButton: true,
      timer: 3000,
    }).then(() => {
      // Redirigir al usuario a otra página después de la alerta
      window.location = '/misreservas';
    });
  };

  return (
    <div className="container">
      <div id="calendar"></div>
      <form id="reservaForm" onSubmit={isLogin}>
        <label htmlFor="fecha">Fecha:</label>
        <input
          type="date"
          id="fecha"
          name="fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />

        <label htmlFor="hora">Hora de Inicio:</label>
        <select
          type="time"
          id="hora"
          name="hora"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          required
        >
          <option value="" disabled>
            Selecciona una hora
          </option>
          {/* Opciones de hora cada 30 minutos */}
          {Array.from({ length: 48 }, (_, i) => {
            const hour = Math.floor(i / 2);
            const minute = (i % 2) * 30;
            const formattedHour = String(hour).padStart(2, '0');
            const formattedMinute = String(minute).padStart(2, '0');
            const timeValue = `${formattedHour}:${formattedMinute}`;
            return <option key={i} value={timeValue}>{timeValue}</option>;
          })}
        </select>

        <label htmlFor="cancha">Canchas:</label>
        <select
          id="cancha"
          name="cancha"
          value={cancha}
          onChange={(e) => setCancha(e.target.value)}
          required
        >
          <option value="1">Tenis 1</option>
          <option value="2">Tenis 2</option>
          <option value="3">Fútbol</option>
        </select>
        <br />

        <input type="hidden" name="userId" value={userId} />

        <label htmlFor="username">Socio:</label>
        <p>{name}</p>

        <button type="submit" className="btn btn-dark">
          Reservar
        </button>
      </form>
      <div id="mensaje">
        <h6>Recuerde que se puede reservar de 1 hora por vez por socio</h6>
        <div className="float-right">
          <h6>Se cobrará la ficha de luz después de las 20hs.</h6>
        </div>
      </div>
    </div>
  );
};
