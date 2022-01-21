import { Formulario } from "../components/Formulario"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export const EditarCliente = () => {
    const { id } = useParams();
    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(true);
    useEffect(() => {
        const consultarClienteAPI = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`;
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                setCliente(resultado);
            } catch (error) {
                console.log(error);
            }

            setCargando(!cargando);
        }
        consultarClienteAPI();
    }, []);
    return (
        <>
       <h1 className='font-black text-4xl text-black'>Editar Cliente</h1>
            <p className='mt-3'>Llena los siguientes campos para editar el cliente</p>
            {cliente?.nombre ? (
                <Formulario
                cliente={cliente}
                cargando={cargando}/>
            ) : (<p>Cliente ID no valido</p>)}
        </>
    )
}
