import React, { useEffect, useState, useCallback } from 'react';
import LibroCard from '../components/LibroCard';
import LibroForm from '../components/LibroForm';
import SearchBar from '../components/SearchBar';
import libroService from '../services/librosService';
import Swal from 'sweetalert2';
import Notificacion from '../components/Notificacion';

const LibrosPage = () => {
    // Estados
    const [libros, setLibros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [currentLibro, setCurrentLibro] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [selectCategory, setSelectCategory] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [notification, setNotification] = useState({ tipo: '', mensaje: '' });
    const librosPerPage = 8;

    // Obtener categorías únicas para el filtro
    const categories = [...new Set(libros.map(libro => libro.categoria).filter(Boolean))];

    // Cargar libros
    const loadLibros = useCallback(async () => {
        try {
            setLoading(true);
            const data = await libroService.getLibros();
            setLibros(data);
            setError(null);
        } catch (err) {
            handleError('Error al cargar los libros. Por favor, inténtelo de nuevo.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadLibros();
    }, [loadLibros]);

    // Manejo de errores
    const handleError = (mensaje) => {
        setError(mensaje);
        setNotification({ tipo: 'error', mensaje });
        setShowNotification(true);
    };

    // Manejo de éxito
    const handleSuccess = (mensaje) => {
        setNotification({ tipo: 'exito', mensaje });
        setShowNotification(true);
    };

    // Búsqueda de libros
    const handleSearch = useCallback(async (term) => {
        try {
            setLoading(true);
            setSearchTerm(term);
            const results = term ? await libroService.searchLibros(term) : await loadLibros();
            setLibros(results);
            setError(null);
            setCurrentPage(1);
        } catch (err) {
            handleError('Error al buscar libros');
            setLibros([]);
        } finally {
            setLoading(false);
        }
    }, [loadLibros]);

    // Operaciones CRUD
    const handleCreate = () => {
        setCurrentLibro(null);
        setShowForm(true);
    };

    const handleEdit = (libro) => {
        setCurrentLibro(libro);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás revertir esta acción',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await libroService.deleteLibro(id);
                setLibros(libros.filter(libro => libro.idLibro !== id));
                handleSuccess('El libro ha sido eliminado correctamente');
            } catch (err) {
                handleError('No se pudo eliminar el libro');
                console.error(err);
            }
        }
    };

    const handleSubmit = async (libroData) => {
        try {
            let mensaje;
            if (currentLibro) {
                const updatedLibro = await libroService.updateLibro(currentLibro.idLibro, libroData);
                setLibros(libros.map(libro =>
                    libro.idLibro === currentLibro.idLibro ? updatedLibro : libro
                ));
                mensaje = 'Libro actualizado correctamente';
            } else {
                const newLibro = await libroService.createLibro(libroData);
                setLibros([...libros, newLibro]);
                mensaje = 'Libro creado correctamente';
            }

            setShowForm(false);
            setCurrentLibro(null);
            setError(null);
            handleSuccess(mensaje);
        } catch (err) {
            handleError(`Error al ${currentLibro ? 'actualizar' : 'crear'} el libro. Por favor, inténtelo de nuevo.`);
            console.error(err);
        }
    };

    // Filtros
    const filteredLibros = libros.filter(libro => {
        const matchesFilter = filter === 'all' ||
            (filter === 'available' && libro.cantidadDisponible > 0) ||
            (filter === 'borrowed' && libro.cantidadDisponible < libro.cantidadTotal);

        const matchesCategory = !selectCategory ||
            (libro.categoria &&
                libro.categoria.toLowerCase() === selectCategory.toLowerCase());

        return matchesFilter && matchesCategory;
    });

    // Paginación
    const totalPages = Math.ceil(filteredLibros.length / librosPerPage);
    const indexOfLastLibro = currentPage * librosPerPage;
    const indexOfFirstLibro = indexOfLastLibro - librosPerPage;
    const currentLibros = filteredLibros.slice(indexOfFirstLibro, indexOfLastLibro);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="libros-page">
            {showNotification && (
                <Notificacion
                    tipo={notification.tipo}
                    mensaje={notification.mensaje}
                    onClose={() => setShowNotification(false)}
                />
            )}

            <div className='page-header'>
                <h1>Catálogo de Libros</h1>
                {!showForm && (
                    <button onClick={handleCreate} className="btn primary">
                        + Nuevo Libro
                    </button>
                )}
            </div>

            {showForm ? (
                <LibroForm
                    libro={currentLibro}
                    onSubmit={handleSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setCurrentLibro(null);
                    }}
                />
            ) : (
                <>
                    <div className="search-filters">
                        <SearchBar
                            placeholder="Buscar libros por título, autor o categoría..."
                            onSearch={handleSearch}
                            onClear={() => {
                                setSearchTerm('');
                                loadLibros();
                                setCurrentPage(1);
                            }}
                        />

                        <div className="filters">
                            <div className="filter-group">
                                <button
                                    className={`btn filter-btn ${filter === 'all' ? 'active' : ''}`}
                                    onClick={() => {
                                        setFilter('all');
                                        setCurrentPage(1);
                                    }}
                                >
                                    Todos
                                </button>
                                <button
                                    className={`btn filter-btn ${filter === 'available' ? 'active' : ''}`}
                                    onClick={() => {
                                        setFilter('available');
                                        setCurrentPage(1);
                                    }}
                                >
                                    Disponibles
                                </button>
                                <button
                                    className={`btn filter-btn ${filter === 'borrowed' ? 'active' : ''}`}
                                    onClick={() => {
                                        setFilter('borrowed');
                                        setCurrentPage(1);
                                    }}
                                >
                                    Prestados
                                </button>
                            </div>

                            <select
                                className="category-filter"
                                value={selectCategory}
                                onChange={(e) => {
                                    setSelectCategory(e.target.value);
                                    setCurrentPage(1);
                                }}
                            >
                                <option value="">Todas las categorías</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="loading">Cargando libros...</div>
                    ) : filteredLibros.length === 0 ? (
                        <div className="no-results">
                            <p>No se encontraron libros que coincidan con la búsqueda.</p>
                            <button
                                className='btn clear-filters'
                                onClick={() => {
                                    setSearchTerm('');
                                    setFilter('all');
                                    setSelectCategory('');
                                    loadLibros();
                                }}
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="libros-grid">
                                {currentLibros.map(libro => (
                                    <LibroCard
                                        key={libro.idLibro}
                                        libro={libro}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div className='pagination'>
                                    <button
                                        className='btn pagination-btn'
                                        disabled={currentPage === 1}
                                        onClick={() => paginate(currentPage - 1)}
                                    >
                                        Anterior
                                    </button>

                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                                        <button
                                            key={number}
                                            className={`btn pagination-btn ${currentPage === number ? 'active' : ''}`}
                                            onClick={() => paginate(number)}
                                        >
                                            {number}
                                        </button>
                                    ))}

                                    <button
                                        className='btn pagination-btn'
                                        disabled={currentPage === totalPages}
                                        onClick={() => paginate(currentPage + 1)}
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default LibrosPage;