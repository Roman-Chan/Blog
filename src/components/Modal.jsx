import React, { useEffect } from "react";

const Modal = ({ show, message, onClose }) => {
    // Si la prop 'show' es falsa, no renderizar el modal
    if (!show) return null;

    useEffect(() => {
        // Configurar un temporizador para cerrar el modal después de 5 segundos (5000 ms)
        const timer = setTimeout(() => {
            onClose(); // Llama a la función onClose para cerrar el modal
        }, 1000);

        // Limpiar el temporizador si el componente se desmonta antes de que el temporizador expire
        return () => clearTimeout(timer);
    }, [onClose]); // Dependencia para limpiar el temporizador

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <p className="mb-4">{message}</p>
            </div>
        </div>
    );
};

export default Modal;

