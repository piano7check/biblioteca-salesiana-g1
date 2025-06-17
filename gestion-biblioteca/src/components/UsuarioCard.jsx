import React from 'react';
import Swal from 'sweetalert2';
import UsuarioDetail from '../components/UsuarioDetail';


const UsuarioCard = ({ usuario, onEdit, onDelete, onDetail }) => {
    const handleDelete = async () => {
        const result = await Swal.fire({
            title: '¿Eliminar usuario?',
            text: `¿Estás seguro de eliminar a ${usuario.nombre} ${usuario.apellido}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6'
        });

        if (result.isConfirmed) {
            try {
                await onDelete(usuario.idUsuario);
                Swal.fire(
                    '¡Eliminado!',
                    'El usuario ha sido eliminado correctamente.',
                    'success'
                );
            } catch (error) {
                Swal.fire(
                    'Error',
                    'No se pudo eliminar el usuario.',
                    'error'
                );
            }
        }
    };

    return (
        <div className="usuario-card">
            <div className="usuario-info">
                <h3>{usuario.nombre} {usuario.apellido}</h3>
                <span className={`tipo-usuario ${usuario.tipoUsuario === 'ADMINISTRADOR' ? 'bg-purple-100 text-purple-800' :
                    usuario.tipoUsuario === 'DOCENTE' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                    }`}>
                    {usuario.tipoUsuario}
                </span>
            </div>

            <p><strong>Correo:</strong> {usuario.correo || 'No especificado'}</p>
            <p><strong>Telefono:</strong> {usuario.telefono || 'No especificado'}</p>

            <div className="action-buttons">
                {/* Botón Editar - Mejorado con ícono y accesibilidad */}
                <button
                    onClick={() => onEdit(usuario)}
                    className="btn editar"
                    aria-label={`Editar usuario ${usuario.nombre}`}
                    title={`Editar ${usuario.nombre} ${usuario.apellido}`}
                >
                    <svg className="btn__icon" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                    </svg>
                    <span className="btn__text">Editar</span>
                </button>

                {/* Botón Detalles - Con ícono y mejor semántica */}
                <button
                    onClick={UsuarioDetail}
                    className="btn detalle"
                    aria-label={`Ver detalles de ${usuario.nombre}`}
                >
                    <svg className="btn__icon" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                    </svg>
                    <span className="btn__text">Detalles</span>
                </button>

                {/* Botón Eliminar - Con confirmación y accesibilidad mejorada */}
                <button
                    onClick={handleDelete}
                    className="btn eliminar"
                    aria-label={`Eliminar usuario ${usuario.nombre}`}
                    title={`Eliminar ${usuario.nombre} ${usuario.apellido}`}
                >
                    <svg className="btn__icon" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                    </svg>
                    <span className="btn__text">Eliminar</span>
                </button>
            </div>
        </div>
    );
};

export default UsuarioCard;