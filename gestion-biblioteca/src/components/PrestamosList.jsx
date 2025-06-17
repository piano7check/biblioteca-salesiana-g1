import React, { useState, useEffect } from 'react';
import prestamosService from '../services/prestamosService';
import Notificacion from './Notificacion';
import Loader from './Loader';

const PrestamosList = ({ onEdit, usuarios, libros, refreshKey }) => {
    const [prestamos, setPrestamos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState(null);
    const [filtroEstado, setFiltroEstado] = useState('TODOS');

    useEffect(() => {
        const fetchPrestamos = async () => {
            try {
                setLoading(true);
                let response;
                if (filtroEstado === 'TODOS') {
                    response = await prestamosService.getPrestamos();
                } else {
                    response = await prestamosService.getPrestamosByEstado(filtroEstado);
                }
                setPrestamos(response);
                setError(null);
            } catch (err) {
                setError('Error al cargar los préstamos');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPrestamos();
    }, [refreshKey, filtroEstado]);

    const handleDelete = async (id) => {
        try {
            await prestamosService.deletePrestamo(id);
            setPrestamos(prestamos.filter(prestamo => prestamo.idPrestamo !== id));
            setNotification({
                tipo: 'success',
                mensaje: 'Préstamo eliminado correctamente'
            });
        } catch (err) {
            setNotification({
                tipo: 'error',
                mensaje: 'Error al eliminar el préstamo'
            });
            console.error(err);
        }
    };

    const getNombreUsuario = (idUsuario) => {
        const usuario = usuarios.find(u => u.idUsuario === idUsuario);
        return usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Desconocido';
    };

    const getTituloLibro = (idLibro) => {
        const libro = libros.find(l => l.idLibro === idLibro);
        return libro ? libro.titulo : 'Desconocido';
    };

    if (loading) return <Loader />;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="mt-4">
            <h2>Lista de Préstamos</h2>

            {notification && (
                <Notificacion
                    tipo={notification.tipo}
                    mensaje={notification.mensaje}
                    onClose={() => setNotification(null)}
                />
            )}

            <div className="mb-3">
                <label htmlFor="filtroEstado" className="form-label">Filtrar por estado:</label>
                <select
                    id="filtroEstado"
                    className="form-select"
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value)}
                >
                    <option value="TODOS">Todos</option>
                    <option value="PRESTADO">Prestados</option>
                    <option value="DEVUELTO">Devueltos</option>
                    <option value="RETRASADO">Retrasados</option>
                </select>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Libro</th>
                            <th>Fecha Préstamo</th>
                            <th>Fecha Devolución</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prestamos.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center">No hay préstamos registrados</td>
                            </tr>
                        ) : (
                            prestamos.map((prestamo) => (
                                <tr key={prestamo.idPrestamo}>
                                    <td>{getNombreUsuario(prestamo.usuario.idUsuario)}</td>
                                    <td>{getTituloLibro(prestamo.libro.idLibro)}</td>
                                    <td>{new Date(prestamo.fechaPrestamo).toLocaleDateString()}</td>
                                    <td>
                                        {prestamo.fechaDevolucion
                                            ? new Date(prestamo.fechaDevolucion).toLocaleDateString()
                                            : 'Pendiente'}
                                    </td>
                                    <td>
                                        <span className={`badge ${prestamo.estado === 'PRESTADO' ? 'bg-primary' :
                                            prestamo.estado === 'DEVUELTO' ? 'bg-success' :
                                                'bg-warning'
                                            }`}>
                                            {prestamo.estado}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => onEdit(prestamo)}
                                            className="btn btn-sm btn-outline-primary me-2"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(prestamo.idPrestamo)}
                                            className="btn btn-sm btn-outline-danger"
                                            disabled={prestamo.estado === 'DEVUELTO'}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PrestamosList;