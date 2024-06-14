import React, { useState } from "react";
import axios from "../api/axios";
import Modal from "../components/Modal";

function EditDialog({
    isOpen,
    onClose,
    title,
    publicationId,
    content,
    setTitle,
    setContent,
}) {
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !content) {
            setModalMessage("Completa todos los campos");
            setShowModal(true);
            return;
        }

        try {
            const response = await axios.put(
                `/publication/update/${publicationId}`,
                { title, content }
            );

            if (response.status === 200) {
                setModalMessage("Publicación actualizada exitosamente");
                setShowModal(true);
                setTimeout(() => window.location.reload(), 1000);
            }
        } catch (error) {
            setModalMessage(
                "Error al actualizar la publicación. Intente de nuevo."
            );
            setShowModal(true);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-5xl w-full">
                <div className="flex justify-between items-center border-b pb-3 mb-5">
                    <h2 className="text-2xl font-semibold">Editar Contenido</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800"
                    >
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label
                            htmlFor="title"
                            className="block text-lg font-medium text-gray-700"
                        >
                            Título
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="content"
                            className="block text-lg font-medium text-gray-700"
                        >
                            Contenido
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
                            rows="6"
                        ></textarea>
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 bg-gray-300 rounded-md"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 bg-blue-600 text-white rounded-md"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
            <Modal
                show={showModal}
                message={modalMessage}
                onClose={() => setShowModal(false)}
            />
        </div>
    );
}

export default EditDialog;
