import React, { useState, useEffect, useCallback } from 'react';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaTimes, FaSpinner } from 'react-icons/fa';
import categoriaService from '../services/categoriaService';
import Notificacion from '../components/Notificacion';
import Swal from 'sweetalert2';

const CategoriasPage = () => {
    // Estados principales
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [currentCategoria, setCurrentCategoria] = useState(null);
    const [notification, setNotification] = useState({ show: false, tipo: '', mensaje: '' });

    // Cargar categorías
    const fetchCategorias = useCallback(async (searchTerm = '') => {
        try {
            setLoading(true);
            const data = searchTerm
                ? await categoriaService.searchCategorias(searchTerm)
                : await categoriaService.getCategorias();
            setCategorias(data);
        } catch (error) {
            showNotification('error', 'Error al cargar categorías');
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Mostrar notificación
    const showNotification = (tipo, mensaje) => {
        setNotification({ show: true, tipo, mensaje });
        setTimeout(() => setNotification({ ...notification, show: false }), 5000);
    };

    // Manejar búsqueda
    const handleSearch = (e) => {
        e.preventDefault();
        fetchCategorias(searchTerm);
    };

    // Validar formulario
    const validateForm = () => {
        if (!currentCategoria?.nombreCategoria?.trim()) {
            showNotification('error', 'El nombre de la categoría es requerido');
            return false;
        }
        return true;
    };

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setLoading(true);
            if (currentCategoria.idCategoria) {
                await categoriaService.updateCategoria(
                    currentCategoria.idCategoria,
                    currentCategoria
                );
                showNotification('exito', 'Categoría actualizada correctamente');
            } else {
                await categoriaService.createCategoria(currentCategoria);
                showNotification('exito', 'Categoría creada correctamente');
            }
            await fetchCategorias();
            resetForm();
        } catch (error) {
            showNotification('error', 'Error al guardar la categoría');
            console.error("Save error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Editar categoría
    const handleEdit = (categoria) => {
        setCurrentCategoria({ ...categoria });
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Eliminar categoría
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                setLoading(true);
                await categoriaService.deleteCategoria(id);
                showNotification('exito', 'Categoría eliminada correctamente');
                await fetchCategorias();
            } catch (error) {
                showNotification('error', 'Error al eliminar la categoría');
                console.error("Delete error:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    // Resetear formulario
    const resetForm = () => {
        setCurrentCategoria(null);
        setShowForm(false);
    };

    // Inicializar
    useEffect(() => {
        fetchCategorias();
    }, [fetchCategorias]);

    return (
        <div className="categorias-page">
            {/* Notificación */}
            {notification.show && (
                <Notificacion
                    tipo={notification.tipo}
                    mensaje={notification.mensaje}
                    onClose={() => setNotification({ ...notification, show: false })}
                />
            )}

            {/* Encabezado */}
            <header className="page-header">
                <h1>
                    <span className="icon-wrapper">
                        <FaSpinner className={loading ? 'spin' : ''} />
                    </span>
                    Gestión de Categorías
                </h1>

                <div className="header-actions">
                    {/* Buscador */}
                    <form onSubmit={handleSearch} className="search-form">
                        <div className="search-input-container">
                            <input
                                type="text"
                                placeholder="Buscar categorías..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                disabled={loading}
                            />
                            <button
                                type="submit"
                                className="search-button"
                                disabled={loading}
                            >
                                <FaSearch />
                            </button>
                        </div>
                    </form>

                    {/* Botón nueva categoría */}
                    <button
                        className={`primary-button ${showForm ? 'cancel-button' : ''}`}
                        onClick={() => showForm ? resetForm() : setShowForm(true)}
                        disabled={loading}
                    >
                        <FaPlus /> {showForm ? 'Cancelar' : 'Nueva Categoría'}
                    </button>
                </div>
            </header>

            {/* Formulario */}
            {showForm && (
                <section className="form-section">
                    <h2>{currentCategoria ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre *</label>
                            <input
                                id="nombre"
                                type="text"
                                name="nombreCategoria"
                                value={currentCategoria?.nombreCategoria || ''}
                                onChange={(e) => setCurrentCategoria({
                                    ...currentCategoria,
                                    nombreCategoria: e.target.value
                                })}
                                disabled={loading}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="descripcion">Descripción</label>
                            <textarea
                                id="descripcion"
                                name="descripcion"
                                value={currentCategoria?.descripcion || ''}
                                onChange={(e) => setCurrentCategoria({
                                    ...currentCategoria,
                                    descripcion: e.target.value
                                })}
                                rows="3"
                                disabled={loading}
                            />
                        </div>

                        <div className="form-actions">
                            <button
                                type="submit"
                                className="primary-button"
                                disabled={loading}
                            >
                                {loading ? 'Procesando...' : 'Guardar'}
                            </button>
                            <button
                                type="button"
                                className="secondary-button"
                                onClick={resetForm}
                                disabled={loading}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </section>
            )}

            {/* Listado de categorías */}
            <section className="results-section">
                {loading && categorias.length === 0 ? (
                    <div className="loading-state">
                        <FaSpinner className="spin" />
                        <p>Cargando categorías...</p>
                    </div>
                ) : categorias.length === 0 ? (
                    <div className="empty-state">
                        <p>No se encontraron categorías</p>
                        {searchTerm && (
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    fetchCategorias();
                                }}
                                className="secondary-button"
                            >
                                Limpiar búsqueda
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="categorias-table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categorias.map((categoria) => (
                                    <tr key={categoria.idCategoria}>
                                        <td>{categoria.nombreCategoria}</td>
                                        <td>{categoria.descripcion || '-'}</td>
                                        <td className="actions-cell">
                                            <button
                                                className="icon-button edit"
                                                onClick={() => handleEdit(categoria)}
                                                title="Editar"
                                                disabled={loading}
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="icon-button delete"
                                                onClick={() => handleDelete(categoria.idCategoria)}
                                                title="Eliminar"
                                                disabled={loading}
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
};

export default CategoriasPage;