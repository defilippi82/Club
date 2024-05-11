import {useState,useEffect} from "react";
import {Link} from "react-router-dom";
import {collection,getDocs,deleteDoc,doc, Timestamp} from "firebase/firestore";
import {db} from "../firebaseConfig/firebase";
import{ services } from "../services/Services";

/* SWEET ALERT*/
import Swal from "sweetalert2";
import whitReactContent from "sweetalert2-react-content";
import { get } from "firebase/database";
const mySwal = whitReactContent(Swal)

export const Reservas = ()=>{

    const [reservas, setReservas] = useState([]);

    const reservasCollection = collection(db,"reservas");

    
    useEffect(()=>{
        const getReservas = async()=>{
            const data = await getDocs(reservasCollection);
            //console.log(data);
            setReservas(
                data.docs.map((doc)=>({
                    ...doc.data(),
                     id:doc.id, 
                     fecha: doc.data().fecha.toDate().toLocaleString() 
        }))
        );
        }; getReservas()
    },[])

    return (
        <>
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="d-gip gap-2">
                    <Link to="/reservas/create" className="btn btn-secundary mt-2 mb-2">CREAR</Link>
                    
                    </div>
                    <table className="table tavle-dark table-hover">
                        <thead>
                            <tr>
                                <td>Socio</td>
                                <td>Fecha</td>
                                <td>Cancha</td>
                                <td>Acciones</td>
                            </tr>
                        </thead>
                        <tbody>
                            {reservas.map((reserva) => (
                            <tr key={reserva.id}>
                                <td>{reserva.nombre}</td>
                                <td>{reserva.fecha}</td>
                                <td>{reserva.cancha}</td>
                                <td>
                                    <Link to ={`edit/${reserva.id}`} className="btn btn-light"><i className="fa-solid fa-pen-to-square"></i></Link>
                                    <button className="btn btn-danger" onClick={()=>confirmDelete(reserva.id)}><i className="fa-solid fa-trash"></i></button>
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