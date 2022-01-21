import { Formik, Form, Field } from "formik"
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { AlertaForm } from "./AlertaForm";
import { Spinner } from "./Spinner";

export const Formulario = ({ cliente = false, cargando }) => {
    const navigate = useNavigate();

    const nuevoClienteScema = Yup.object().shape({
        nombre: Yup.string()
            .required('El nombre del cliente es obligatorio')
            .min(3, 'El nombre es muy corto')
            .max(30, 'El nombre es muy largo'),
        empresa: Yup.string()
            .required('El nombre de la empresa es obligatorio'),
        email: Yup.string()
            .required('El email es obligatorio')
            .email('Email no valido'),
        telefono: Yup.number().typeError('Numero no valido')
            .integer('Numero no valido')
            .positive('Numero no valido'),

    })

    const handleSubmit = async (values) => {
        try {
            let respuesta;
            if (cliente.id) {
                const url = `http://localhost:4000/clientes/${cliente.id}`;
                respuesta = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                })
            } else {
                const url = 'http://localhost:4000/clientes';
                respuesta = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                })
            }
             await respuesta.json();
            navigate('/clientes');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        cargando ? <Spinner /> : (

            <div className="bg-white mt-10 px-5 py-10 rounded-xl shadow-xl md:w-3/4 mx-auto">
                <h1 className="text-gray-600 font-bold text-xl text-center">{cliente?.nombre ? 'Editar Cliente' : 'Nuevo Cliente'}</h1>
                <Formik
                    validationSchema={nuevoClienteScema}
                    initialValues={{
                        nombre: cliente?.nombre ?? '',
                        empresa: cliente?.empresa ?? '',
                        email: cliente?.email ?? '',
                        telefono: cliente?.telefono ?? '',
                        notas: cliente?.notas ?? '',
                    }}
                    enableReinitialize={true}
                    onSubmit={async (values, { resetForm }) => {
                        await handleSubmit(values);
                        resetForm();
                    }}
                >
                    {({ errors, touched }) => {
                        /* console.log(data); */
                        return (
                            <Form
                                className="mt-10"
                            >
                                <div className="mb-4">
                                    <label
                                        htmlFor="nombre"
                                        className="text-gray-800"
                                    >Nombre: </label>
                                    <Field
                                        name="nombre"
                                        type="text"
                                        id="nombre"
                                        placeholder="Nombre del Cliente"
                                        className="border rounded-xl mt-2 block w-full p-3 bg-gray-50"
                                    />
                                    {errors.nombre && touched.nombre ? (
                                        <AlertaForm mensajeError={errors.nombre} />
                                    ) : null}
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="empresa"
                                        className="text-gray-800"
                                    >Empresa: </label>
                                    <Field
                                        type="text"
                                        name="empresa"
                                        id="empresa"
                                        placeholder="Empresa del Cliente"
                                        className="border rounded-xl mt-2 block w-full p-3 bg-gray-50"
                                    />
                                    {errors.empresa && touched.empresa ? (
                                        <AlertaForm mensajeError={errors.empresa} />
                                    ) : null}
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="email"
                                        className="text-gray-800"
                                    >Email: </label>
                                    <Field
                                        type="text"
                                        name="email"
                                        id="email"
                                        placeholder="Email del Cliente"
                                        className="border rounded-xl mt-2 block w-full p-3 bg-gray-50"
                                    />
                                    {errors.email && touched.email ? (
                                        <AlertaForm mensajeError={errors.email} />
                                    ) : null}
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="telefono"
                                        className="text-gray-800"
                                    >Telefono: </label>
                                    <Field
                                        type="tel"
                                        name="telefono"
                                        id="telefono"
                                        placeholder="Telefono del Cliente (Opcional)"
                                        className="border rounded-xl mt-2 block w-full p-3 bg-gray-50"
                                    />
                                    {errors.telefono && touched.telefono ? (
                                        <AlertaForm mensajeError={errors.telefono} />
                                    ) : null}
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="notas"
                                        className="text-gray-800"
                                    >Notas: </label>
                                    <Field
                                        as="textarea"
                                        type="text"
                                        name="notas"
                                        id="telefono"
                                        placeholder="Notas del Cliente (Opcional)"
                                        className="border rounded-xl h-40 mt-2 block w-full p-3 bg-gray-50"
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value={cliente?.nombre ? 'Editar Cliente' : 'Nuevo Cliente'}
                                    className="hover:bg-[#5870e0] cursor-pointer mt-5 w-full bg-[#667eea] p-3 text-white font-bold text-lg rounded-lg"
                                />
                            </Form>
                        )
                    }}

                </Formik>
            </div>
        )
    )
}
