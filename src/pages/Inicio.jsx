import { useEffect, useState } from "react";
import { array } from "yup";
import { Cliente } from "../components/Cliente";


export const Inicio = () => {
    const [clientes, setClientes] = useState([]);
    useEffect(() => {
        const obtenerClientesAPI = async () => {
            try {
                const url = import.meta.env.VITE_API_URL;
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                setClientes(resultado);
        } catch (error) {
                console.log(error);
            }
        }
        obtenerClientesAPI();
    }, []);

    const handleEliminar = async(id) => {
      const confirmar = confirm('¿Deseas eliminar este cliente?');
      if (confirmar) {
        try {
            const url = `${import.meta.env.VITE_API_URL}/${id}`;
            const respuesta = await fetch(url, {
                method: 'DELETE',
            });
            await respuesta.json();

            const arrayClientes = clientes.filter(cliente => cliente.id !== id);

            setClientes(arrayClientes);
        } catch (error) {
            console.log(error);
        }
      }
    };
    return (
        <>
            <h1 className='font-black text-4xl text-black'>Clientes</h1>
            <p className='mt-3'>Administra tu clientes</p>
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nombre
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Contacto
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Empresa
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Acciones
                                        </th>
                                        {/*  <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th> */}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {clientes.map(cliente => (
                                       <Cliente
                                       key={cliente.id}
                                       cliente={cliente}
                                       handleEliminar={handleEliminar}
                                       />
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
