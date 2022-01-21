import React from 'react'

export const AlertaForm = ({mensajeError}) => {
    return (
        <div className="text-center my-4 bg-red-400 text-white font-bold p-2 rounded-xl">
            {mensajeError}
        </div>
    )
}
