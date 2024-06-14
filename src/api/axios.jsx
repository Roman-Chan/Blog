import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000", // URL base de tu API
    headers: {
        "Content-Type": "application/json",
    },
});

// Agregar un interceptor para añadir el token de autenticación a las cabeceras
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // Asume que el token se guarda en localStorage
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
