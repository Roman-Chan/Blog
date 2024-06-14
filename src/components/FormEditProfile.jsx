import React, { useState } from "react";
import axios from "../api/axios";
import Modal from "../components/Modal";

const EditProfileDialog = ({
    isOpen,
    onClose,
    onSave,
    initialName,
    initialEmail,
}) => {
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [name, setName] = useState(initialName);
    const [email, setEmail] = useState(initialEmail);
    const userId = localStorage.getItem("id");

    const handleSave = async () => {
        try {
            const response = await axios.put(`/profile/update/${userId}`, {
                username: name,
                email: email,
            });
            if (response.status === 200) {
                console.log(response);

                localStorage.setItem("username", name); //
                onSave(name, email);

                setModalMessage("Perfil actualizado exitosamente");
                setShowModal(true);
                setTimeout(() => window.location.reload(), 1000);
            }
        } catch (error) {
            console.error("Error al hacer la solicitud PUT:", error);
            setModalMessage("Error al actualizar el perfil. Intente de nuevo.");
            setShowModal(true);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4">Editar Perfil</h2>
                <label className="block mb-2">
                    <span className="text-gray-700">Nombre</span>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full mt-1 border border-gray-300 rounded-md p-2"
                    />
                </label>
                <label className="block mb-4">
                    <span className="text-gray-700">Correo Electrónico</span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full mt-1 border border-gray-300 rounded-md p-2"
                    />
                </label>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Guardar
                    </button>
                </div>
            </div>
            <Modal
                show={showModal}
                message={modalMessage}
                onClose={() => setShowModal(false)}
            />
        </div>
    );
};

export default EditProfileDialog;
