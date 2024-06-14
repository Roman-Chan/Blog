import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        // Redirigir al usuario a la página de login si no hay token
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;
