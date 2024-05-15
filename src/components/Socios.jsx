import {useState,useEffect} from "react";
import {Link} from "react-router-dom";
import {collection,getDocs,deleteDoc,doc} from "firebase/firestore";
import {db} from "../firebaseConfig/firebase";


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
    },[])
    const confirmDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "socios", id));
            setSocios(socios.filter((socio) => socio.id !== id));
            mySwal.fire({

                title:"¡Borrado!",
                text:"Tu socio ha sido eliminada.",
                icon:"success",
                showConfirmButton: true
            });
        } catch (error) {
            mySwal.fire({
               title: "Error",
                text:"Ha ocurrido un error al intentar borrar la socio.",
                icon:"error"
        });
        }
    };

    return (
        <>
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="d-grid gap-2 col-6 mx-auto">
                        
                        <Link to ="/socios/create" className="btn btn-secondary mt-2 mb-2"> CREAR </Link>

                    </div>
                    <table className="table table-dark table-hover">
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