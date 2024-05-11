import {useState,useEffect} from "react";
import {Link} from "react-router-dom";
import {collection,getDocs,deleteDoc,doc} from "firebase/firestore";
import {db} from "../firebaseConfig/firebase";
import{ services } from "../services/Services";

/* SWEET ALERT*/
import Swal from "sweetalert2";
import whitReactContent from "sweetalert2-react-content";
import { get } from "firebase/database";
const mySwal = whitReactContent(Swal)

export const Socios = ()=>{

    const [socios, setSocios] = useState([]);

    const sociosCollection = collection(db,"socios");

    
    useEffect(()=>{
        const getSocios = async()=>{
            const data = await getDocs(sociosCollection);
            //console.log(data);
            setSocios(
                data.docs.map((doc)=>({
                    ...doc.data(), id:doc.id
        }))
        );
        }; getSocios()
    },(socios))
    const confirmDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "socios", id));
            setSocios(socios.filter((socio) => socio.id !== id));
            mySwal.fire(
                "¡Borrado!",
                "Tu socio ha sido eliminada.",
                "success"
            );
        } catch (error) {
            MySwal.fire(
                "Error",
                "Ha ocurrido un error al intentar borrar la socio.",
                "error"
            );
        }
    };

    return (
        <>
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="d-gip gap-2">
                        
                        <Link to ="/socios/create" className="btn btn-secundary mt-2 mb-2"> CREAR </Link>

                    </div>
                    <table className="table tavle-dark table-hover">
                        <thead>
                            <tr>
                                <td>Nombre</td>
                                <td>Email</td>
                                <td>Contraseña</td>
                                <td>Acciones</td>
                            </tr>
                        </thead>
                        <tbody>
                            {socios.map((socio) => (
                            <tr key={socio.id}>
                                <td>{socio.nombre}</td>
                                <td>{socio.email}</td>
                                <td>{socio.contrasena}</td>
                                <td>
                                    <Link to ={`edit/${socio.id}`} className="btn btn-light"><i className="fa-solid fa-pen-to-square"></i></Link>
                                    <button className="btn btn-danger" onClick={()=>confirmDelete(socio.id)}><i className="fa-solid fa-trash"></i></button>
                                </td>
                                </tr>
                               )) }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


        </>
    )
}