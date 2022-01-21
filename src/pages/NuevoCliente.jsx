import { Formulario } from "../components/Formulario"


export const NuevoCliente = () => {
    return (
        <>
       <h1 className='font-black text-4xl text-black'>Nuevo Cliente</h1>
            <p className='mt-3'>Llena los siguientes campos para registrar un cliente</p>
            <Formulario/>
        </>
    )
}