import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

export const EditarSocio = () => {
    const { id } = useParams();
    const [socio, setSocio] = useState({
        nombre: "",
        email: "",
        contrasena: ""
    });

    useEffect(() => {
        const fetchSocio = async () => {
            try {
                const docRef = doc(db, "socios", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setSocio(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error getting document:", error);
            }
        };
        fetchSocio();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSocio({
            ...socio,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDoc(doc(db, "socios", id), socio)
            .then(() => {
                // Redirigir al usuario a otra página después de la alerta
                window.location = '/socios';
              });;
            console.log("Document successfully updated!");

            // Redirigir al usuario a la página de detalles de la socio
            // o a la lista de socios después de editar exitosamente.
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    return (
        <div className="container">
            <h1>Editar socio</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" className="form-control" id="nombre" name="nombre" value={socio.nombre} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control" id="email" name="email" value={socio.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="contrasena">Contraseña</label>
                    <input type="password" className="form-control" id="contrasena" name="contrasena" value={socio.contrasena} onChange={handleChange} required />
                </div>
               
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
            </form>
        </div>
    );
};


