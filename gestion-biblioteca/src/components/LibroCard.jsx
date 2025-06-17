import React from 'react';
import Swal from 'sweetalert2';

const LibroCard = ({ libro, onEdit, onDelete }) => {
    const handleDelete = async () => {
        const result = await Swal.fire({
            title: '¿Eliminar libro?',
            text: `¿Estás seguro de eliminar "${libro.titulo}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6'
        });

        if (result.isConfirmed) {
            try {
                await onDelete(libro.idLibro);
                Swal.fire(
                    '¡Eliminado!',
                    'El libro ha sido eliminado',
                    'success'
                );
            } catch (error) {
                Swal.fire(
                    'Error',
                    'No se pudo eliminar el libro',
                    'error'
                );
            }
        }
    };

    const disponibilidad = libro.cantidad_disponible > 0
        ? <span className="disponible">Disponible ({libro.cantidad_disponible}/{libro.cantidad_total})</span>
        : <span className="no-disponible">Agotado</span>;

    return (
        <div className="libro-card">
            <div className="libro-info">
                <h3 title={libro.titulo}>{libro.titulo}</h3>

                <p className="autor" title={libro.autor}>
                    <strong>Autor:</strong> {libro.autor || 'No especificado'}
                </p>

                <p><strong>Editorial:</strong> {libro.editorial || 'No especificada'}</p>
                <p><strong>Año:</strong> {libro.anioPublicacion || 'No especificado'}</p>
                <p><strong>Categoría:</strong> {libro.categoria || 'No especificada'}</p>
                <p><strong>ISBN:</strong> {libro.isbn || 'No especificado'}</p>

                <div className="disponibilidad-container">
                    <strong>Disponibilidad:</strong>
                    <span className={`disponibilidad ${libro.cantidadDisponible > 0 ? 'disponible' : 'agotado'}`}>
                        {libro.cantidadDisponible} de {libro.cantidadTotal} disponibles
                    </span>
                </div>
            </div>

            <div className="libro-actions">
                {/* Botón Editar - Mejorado con ícono y accesibilidad */}
                <button
                    onClick={() => onEdit(libro)}
                    className="btn editar">
                    <svg className="btn__icon" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                    </svg>
                    <span className="btn__text">Editar Libro</span>
                </button>
                <button
                    onClick={handleDelete}
                    className="btn eliminar" title="Eliminar libro"
                >
                    <svg className="btn__icon" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                    </svg>
                    <span className="btn__text">Eliminar Libro</span>
                </button>
            </div>
        </div>
    );
};

export default LibroCard;