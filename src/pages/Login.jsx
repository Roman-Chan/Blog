import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard"); // Redirigir al dashboard si ya hay un token
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/login/signIn", {
                email,
                password,
            });
            if (response.data) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("id", response.data.id);
                localStorage.setItem("username", response.data.username);

                navigate("/dashboard"); // Redirigir al usuario a una página protegida
            } else {
                setError(response.data.message || "Login failed"); // Usar mensaje de la respuesta o un mensaje genérico
            }
        } catch (error) {
            if (error.response) {
                // La respuesta del servidor fue un error
                setError(error.response.data.message || "An error occurred"); // Mostrar mensaje de error de la API
            } else if (error.request) {
                // No se recibió respuesta del servidor
                setError("No response from server");
            } else {
                // Algo salió mal al configurar la solicitud
                setError("Error setting up request");
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow">
                <h2 className="text-2xl font-bold text-center">Bienvenido a Blog</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Correo</label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Contraseña</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full p-2 border rounded"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showPassword ? (
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="size-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z"
                                                clipRule="evenodd"
                                            />
                                            <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
                                        </svg>
                                    </span> // Icono para ocultar contraseña
                                ) : (
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="size-5"
                                        >
                                            <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                            <path
                                                fillRule="evenodd"
                                                d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span> // Icono para mostrar contraseña
                                )}
                            </button>
                        </div>
                    </div>
                    {error && (
                        <p className="text-red-500 text-center">{error}</p>
                    )}{" "}
                    {/* Mostrar error si hay */}
                    <button
                        type="submit"
                        className="w-full p-2 mt-4 bg-blue-500 text-white rounded"
                    >
                        Iniciar sesion
                    </button>
                </form>
                <p className="text-center">
                    ¿No tienes cuenta?{" "}
                    <Link to="/register" className="text-blue-500">
                        Registro
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
