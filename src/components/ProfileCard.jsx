import React from "react";

const ProfileComponent = ({
    coverImageSrc,
    profileImageSrc,
    userName,
    email,
    onEditClick, // Add this prop to handle the edit button click
}) => {
    return (
        <div className="max-w-4xl mx-auto bg-white p-4 shadow-lg rounded-lg overflow-hidden">
            {/* Foto de portada */}
            <div className="relative">
                <img
                    src={
                        "https://i.pinimg.com/564x/40/75/1a/40751a5dbdf2e96bcf85a9b8d90cabf5.jpg"
                    }
                    alt="Cover"
                    className="w-full h-56 object-cover rounded-t-lg"
                />
                {/* Botón de editar */}
                <button
                    onClick={onEditClick}
                    className="absolute top-2 right-2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
                >
                    Editar
                </button>
                {/* Imagen de perfil */}
                <div className="absolute bottom-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white p-1 rounded-full border-4 border-white shadow-lg">
                    <img
                        src={
                            "https://i.pinimg.com/736x/b5/e9/62/b5e9621cdfaa7eb16d2233879e4b9689.jpg"
                        }
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-2 border-gray-200"
                    />
                </div>
            </div>

            {/* Información del usuario */}
            <div className="text-center mt-16 p-4">
                <h2 className="text-2xl font-semibold text-gray-900">
                    {userName}
                </h2>
                <p className="text-lg text-gray-700">{email}</p>
            </div>
        </div>
    );
};

export default ProfileComponent;
