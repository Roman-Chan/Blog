import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("username");
        navigate("/");
    };

    return (
        <nav className="bg-gray-800 shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="text-white text-xl font-semibold">
                    <a
                        href="/dashboard"
                        className="text-white text-xl font-semibold"
                    >
                        Blog
                    </a>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-white">
                        Bienvenido {localStorage.getItem("username")}
                    </span>
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                        Inicio
                    </button>
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center focus:outline-none"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
                                alt="Profile"
                                className="h-10 w-10 rounded-full border-2 border-gray-600"
                            />
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20">
                                <a
                                    href="/profile"
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                >
                                    Tu perfil
                                </a>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
