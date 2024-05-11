import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const EditarReserva = () => {
  const { id } = useParams();
  const [cancha, setCancha] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [nombre, setNombre] = useState('');
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

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const docRef = doc(db, "reservas", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCancha(data.cancha);
          setNombre(data.nombre);
          // Separar la fecha y la hora de la reserva existente
          const fechaHora = data.fecha.toDate();
          setFecha(fechaHora.toISOString().split('T')[0]);
          setHora(`${fechaHora.getHours().toString().padStart(2, '0')}:${fechaHora.getMinutes().toString().padStart(2, '0')}`);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };
    fetchReserva();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Actualizar la reserva en la colección 'reservas' en Firestore
      await updateDoc(doc(db, "reservas", id), {
        cancha,
        fecha: new Date(`${fecha}T${hora}`),
        nombre,
      });

      // Mostrar alerta de éxito
      MySwal.fire({
        title: 'Reserva actualizada',
        text: 'La reserva ha sido actualizada correctamente',
        icon: 'success',
        showConfirmButton: true,
      });
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
        <h1>Editar Reserva</h1>
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
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
          <select
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
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};


