import {collection,getDocs,deleteDoc,doc} from "firebase/firestore";
import {db} from "../firebaseConfig/firebase";

export const services=()=>{

    //SOCIOS
    //FUNCION PARA ELIMINAR  UN DOC
    
    const deleteSocio = async(id)=>{
        const SocioDoc = doc(db, "socios", id) //sociosCollection
        await deleteDoc(SocioDoc);
    }
    
    //FUNCION PARA MOSTRAR TODOS LOS DOCUMENTOS

   const getSocios = async()=>{
        const data = await getDocs(sociosCollection);
        //console.log(data);
        setSocios(
            data.docs.map((doc)=>({
                ...doc.data(), id:doc.id
    }))
    );
    }
    // RESERVAS
    //FUNCION PARA ELIMINAR  UN DOC

    const deleteReserva = async(id)=>{
        const reservaDoc = doc(db, "reserva", id) //reservasCollection
        await deleteDoc(reservaDoc);
    }
    //FUNCION PARA MOSTRAR TODOS LOS DOCUMENTOS
    const getReservas = async()=>{
        const data = await getDocs(reservasCollection);
        //console.log(data);
        setReservas(
            data.docs.map((doc)=>({
                ...doc.data(), id:doc.id
    }))
    );
    }


}