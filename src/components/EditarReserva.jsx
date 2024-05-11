import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

export const EditarReserva = () => {
    const { id } = useParams();
    const [reserva, setReserva] = useState({
        nombre: "",
        fecha: "",
        cancha: ""
    });

    useEffect(() => {
        const fetchReserva = async () => {
            try {
                const docRef = doc(db, "reservas", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setReserva({
                        ...docSnap.data(),
                        fecha: docSnap.data().fecha.toDate().toLocaleString()
                    });
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error getting document:", error);
            }
        };
        fetchReserva();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReserva({
            ...reserva,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDoc(doc(db, "reservas", id), reserva);
            console.log("Document successfully updated!");
            // Redirigir al usuario a la página de detalles de la reserva
            // o a la lista de reservas después de editar exitosamente.
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    return (
        <div className="container">
            <h1>Editar Reserva</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" className="form-control" id="nombre" name="nombre" value={reserva.nombre} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="fecha">Fecha</label>
                    <input type="text" className="form-control" id="fecha" name="fecha" value={reserva.fecha} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="cancha">Cancha</label>
                    <input type="text" className="form-control" id="cancha" name="cancha" value={reserva.cancha} onChange={handleChange} required />
                </div>
               
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
            </form>
        </div>
    );
};


