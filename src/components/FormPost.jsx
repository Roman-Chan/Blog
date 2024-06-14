import React, { useState } from "react";
import Modal from "../components/Modal";

function FormPost({ onSubmit }) {
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handlePostChange = (event) => {
        setPostText(event.target.value);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handlePostSubmit = (event) => {
        event.preventDefault();

        if (!title.trim() || !postText.trim()) {
            setModalMessage("Completa todos los campos");
            setShowModal(true);
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", postText);
        if (image) {
            formData.append("image", image);
        }

        onSubmit(formData);

        setTitle("");
        setPostText("");
        setImage(null);
        setPreview(null);
    };

    return (
        <div className="w-full p-4 border-2 bg-white shadow-md rounded-lg space-y-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Título
            </label>
            <input
                id="title"
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Título"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />

            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                ¿Qué estás pensando?
            </label>
            <textarea
                id="content"
                value={postText}
                onChange={handlePostChange}
                placeholder="¿Qué estás pensando?"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                required
            />

            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Imagen
            </label>
            <div className="flex items-center space-x-2">
                <input
                    id="image"
                    type="file"
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                />
                <button
                    type="button"
                    onClick={() => document.getElementById('image').click()}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                    Seleccionar archivo
                </button>
                {preview && <img src={preview} alt="Vista previa" className="w-20 h-20 object-cover rounded-lg" />}
            </div>

            <div className="flex justify-end">
                <button
                    onClick={handlePostSubmit}
                    className="bg-blue-700 text-white px-4 py-2 rounded-full hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Publicar
                </button>
            </div>

            <Modal
                show={showModal}
                message={modalMessage}
                onClose={() => setShowModal(false)}
            />
        </div>
    );
}

export default FormPost;
