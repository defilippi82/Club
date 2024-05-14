import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import Form from 'react-bootstrap/Form';


export const EditarSocio = () => {
    const {id} = useParams();
    const [socio, setSocio] = useState({
        nombre: "",
        email: "",
        contrasena: "",
        administrador: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSocio = async () => {
            try {
                const docId = doc(db, "socios", id);
                const docSocio = await getDoc(docId);
                if (docSocio.exists()) {
                    setSocio(docSocio.data());
                } else {
                    console.log("No hay Socios requeridos!");
                }
            } catch (error) {
                console.error("Error al traer documento", error);
            }
        };
        fetchSocio();
    }, [id]);

    const actualizarSocio = (e) => {
        const { name, value } = e.target;
        setSocio({
            ...socio,
            [name]: value
        });
    };

    const editarSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDoc(doc(db, "socios", id), socio)
            .then(() => {
                // Mostrar alerta de éxito
      MySwal.fire({
        title: 'Socio actualizado',
        text: 'El Socio ha sido actualizado correctamente',
        icon: 'success',
        showConfirmButton: false,
      }).then(() => {
        // Redirigir al usuario a otra página después de la alerta
        navigate ('/socios');
      });;
              });;
            console.log("Socio editado!");

        } catch (error) {
            // Mostrar alerta de error
      MySwal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        showConfirmButton: true,
      });
    
            console.error("Error al editar el socio: ", error);
        }
    };

    return (
        <div className="container">
            <h1>Editar Socio</h1>
            <form onSubmit={editarSubmit} style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px' }}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" className="form-control" id="nombre" name="nombre" value={socio.nombre} onChange={actualizarSocio} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control" id="email" name="email" value={socio.email} onChange={actualizarSocio} required />
                </div>
                <div className="form-group">
                    <label htmlFor="contrasena">Contraseña</label>
                    <input type="password" className="form-control" id="contrasena" name="contrasena" value={socio.contrasena} onChange={actualizarSocio} required />
                </div>
                <div className="form-group form-check">
                   
                    <Form.Check
                        type="switch"
                        className="form-check-input"
                        id="custom-switch"
                        label="Administrador"
                        checked={socio.administrador}
                        onChange={actualizarSocio}
                    />
                    </div>
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
            </form>
        </div>
    );
};


