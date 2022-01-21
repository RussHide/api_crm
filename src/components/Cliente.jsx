import { useNavigate } from 'react-router-dom';

export const Cliente = ({ cliente, handleEliminar }) => {
    const navigate = useNavigate();

    const { nombre, email, empresa, telefono, notas, id } = cliente;
    return (
        <tr className='hover:bg-gray-100'>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {nombre}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">Email: {email}</div>
                <div className="text-sm text-gray-500">Telefono: {telefono}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {empresa}
            </td>
            <td className="px-6 py-4 text-right text-sm font-medium">
                <button onClick={() => navigate(`/clientes/${id}`)} className="block w-full mb-1 text-gray-700 hover:bg-yellow-500 bg-yellow-400  py-1 px-3 rounded-lg">Ver</button>
                <button onClick={() => navigate(`/clientes/editar/${id}`)} className="block w-full mb-1 text-gray-700 hover:bg-blue-500 bg-blue-400  py-1 px-3 rounded-lg">Editar</button>
                <button onClick={() => handleEliminar(id)} className="block w-full  text-gray-700  hover:bg-red-500 bg-red-400 py-1 px-3 rounded-lg">Eliminar</button>
            </td>
        </tr>
    );
};
