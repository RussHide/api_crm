import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../components/Spinner";

export const VerCliente = () => {
    const { id } = useParams();
    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(true);
    const { nombre, email, empresa, telefono, notas } = cliente;

    useEffect(() => {
        const consultarClienteAPI = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`;
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
        cargando ? <Spinner /> : Object.keys(cliente).length === 0 ? <p>No hay resultados</p>
            : (
                <div>
                    <div className="relative md:w-1/2 bg-gray-900 block p-8 overflow-hidden border border-gray-100 rounded-lg">
                        <span
                            className="absolute inset-x-0 bottom-0 h-2  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
                        ></span>

                        <div className="flex justify-center mb-4">
                            <p className="text-2xl font-bold text-gray-100">
                                Cliente: <span className="text-base font-semibold">{nombre}</span>
                            </p>
                        </div>
                        <div className="flex ">
                            <p className="text-xl font-bold text-gray-100">
                                Email: <span className="text-base font-semibold">{email}</span>
                            </p>
                        </div>
                        <div className="flex ">
                            <p className="text-xl font-bold text-gray-100">
                                Telefono: <span className="text-base font-semibold">
                                    {telefono ? telefono : '(No se agrego un telefono)'}

                                </span>
                            </p>
                        </div>
                        <div className="flex ">
                            <p className="text-xl font-bold text-gray-100">
                                Empresa: <span className="text-base font-semibold">{empresa}</span>
                            </p>
                        </div>
                        <div className=" ">
                            <p className="text-xl font-bold text-gray-100">
                                Notas:
                            </p>
                            <p className="text-base font-semibold text-gray-100">
                                {notas ? notas : '(No se agregaron notas)'}
                            </p>
                        </div>
                    </div>
                </div>
            )
    )
};
