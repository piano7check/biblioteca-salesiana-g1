import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const UsuarioDetail = () => {
    const { id } = useParams();
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarUsuario = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/usuarios/${id}`);
                if (!response.ok) {
                    throw new Error('Usuario no encontrado');
                }
                const data = await response.json();
                setUsuario(data);
            } catch (error) {
                console.error("Error al cargar usuario:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        cargarUsuario();
    }, [id]);

    if (loading) return <div className="loading">Cargando usuario...</div>;

    if (error) return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="text-center py-10">
                <h3 className="text-xl font-medium text-red-600">{error}</h3>
                <Link
                    to="/usuarios"
                    className="mt-4 inline-block px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                >
                    Volver a la lista
                </Link>
            </div>
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Detalles del Usuario</h2>
            <div className="space-y-4">
                <p><strong>Nombre:</strong> {usuario.nombre}</p>
                <p><strong>Apellido:</strong> {usuario.apellido}</p>
                <p><strong>DNI/CI:</strong> {usuario.ci}</p>
                <p><strong>Correo:</strong> {usuario.correo}</p>
                <p><strong>Telefono:</strong> {usuario.telefono}</p>
                <p><strong>Direccion:</strong> {usuario.direccion}</p>
                <p><strong>Tipo de usuario:</strong> {usuario.tipoUsuario}</p>
            </div>
            <div className="mt-6">
                <Link
                    to="/usuarios"
                    className="inline-block px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                >
                    Volver a la lista
                </Link>
            </div>
        </div>
    );
};

export default UsuarioDetail;