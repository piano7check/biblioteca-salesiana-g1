import React, { useState, useEffect, useMemo, useCallback } from 'react';
import usuarioService from '../services/usuarioService';
import UsuarioCard from '../components/UsuarioCard';
import UsuarioForm from '../components/UsuarioForm';
import UsuarioDetail from '../components/UsuarioDetail';
import SearchBar from '../components/SearchBar';
import Swal from 'sweetalert2';
import Notificacion from '../components/Notificacion';

const UsuariosPage = () => {
  // Estados
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [currentUsuario, setCurrentUsuario] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectCategory, setSelectCategory] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({ tipo: '', mensaje: '' });

  // Constantes
  const USUARIOS_PER_PAGE = 8;
  const USER_TYPES = {
    ADMINISTRADOR: 'Administrador',
    DOCENTE: 'Docente',
    ESTUDIANTE: 'Estudiante'
  };

  // Cargar usuarios con posibilidad de búsqueda
  const loadUsuarios = useCallback(async (search = '') => {
    try {
      setLoading(true);
      const data = search ? await usuarioService.searchUsuarios(search) : await usuarioService.getUsuarios();
      setUsuarios(data);
      setError(null);
    } catch (err) {
      handleError('Error al cargar los usuarios. Por favor, inténtelo de nuevo.');
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsuarios();
  }, [loadUsuarios]);

  // Manejo de errores y notificaciones
  const handleError = (mensaje) => {
    setError(mensaje);
    setNotification({ tipo: 'error', mensaje });
    setShowNotification(true);
  };

  const handleSuccess = (mensaje) => {
    setNotification({ tipo: 'exito', mensaje });
    setShowNotification(true);
  };

  // Búsqueda de usuarios
  const handleSearch = useCallback(async (term) => {
    try {
      setLoading(true);
      setSearchTerm(term);
      const results = term ? await usuarioService.searchUsuarios(term) : await loadUsuarios();
      setUsuarios(results);
      setError(null);
      setCurrentPage(1);
    } catch (err) {
      handleError('Error al buscar usuarios');
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  }, [loadUsuarios]);

  // Operaciones CRUD
  const handleCreate = () => {
    setCurrentUsuario(null);
    setShowForm(true);
    setShowDetail(false);
  };

  const handleEdit = (usuario) => {
    setCurrentUsuario(usuario);
    setShowForm(true);
    setShowDetail(false);
  };

  const handleViewDetail = (usuario) => {
    setCurrentUsuario(usuario);
    setShowDetail(true);
    setShowForm(false);
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
        await usuarioService.deleteUsuario(id);
        setUsuarios(usuarios.filter(usuario => usuario.idUsuario !== id));
        handleSuccess('El usuario ha sido eliminado correctamente');
      } catch (err) {
        handleError('No se pudo eliminar el usuario');
        console.error(err);
      }
    }
  };

  const handleSubmit = async (usuarioData) => {
    try {
      let mensaje;
      if (!currentUsuario) {
        const updatedUsuario = await usuarioService.updateUsuario(usuarioData);
        setUsuarios(usuarios.map(usuario =>
          usuario.idUsuario === currentUsuario.idUsuario ? updatedUsuario : usuario
        ));
        mensaje = 'Usuario actualizado correctamente';
      } else {
        const newUsuario = await usuarioService.createUsuario(usuarioData);
        setUsuarios([...usuarios, newUsuario]);
        mensaje = 'Usuario creado correctamente';
      }

      setShowForm(false);
      setShowDetail(false);
      setCurrentUsuario(null);
      setError(null);
      handleSuccess(mensaje);
    } catch (err) {
      handleError(`Error al ${currentUsuario ? 'actualizar' : 'crear'} el usuario. Por favor, inténtelo de nuevo.`);
      console.error(err);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setShowDetail(false);
    setCurrentUsuario(null);
  };

  // Filtros y paginación
  const categories = useMemo(() =>
    [...new Set(usuarios.map(usuario => usuario.categoria).filter(Boolean))],
    [usuarios]
  );

  const filteredUsuarios = useMemo(() => {
    return usuarios.filter(usuario => {
      const matchesFilter = filter === 'all' || usuario.tipoUsuario === filter;
      const matchesCategory = !selectCategory ||
        (usuario.categoria && usuario.categoria.toLowerCase() === selectCategory.toLowerCase());

      return matchesFilter && matchesCategory;
    });
  }, [usuarios, filter, selectCategory]);

  const totalPages = Math.ceil(filteredUsuarios.length / USUARIOS_PER_PAGE);
  const indexOfLastUsuario = currentPage * USUARIOS_PER_PAGE;
  const indexOfFirstUsuario = indexOfLastUsuario - USUARIOS_PER_PAGE;
  const currentUsuarios = filteredUsuarios.slice(indexOfFirstUsuario, indexOfLastUsuario);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="usuarios-page">
      {showNotification && (
        <Notificacion
          tipo={notification.tipo}
          mensaje={notification.mensaje}
          onClose={() => setShowNotification(false)}
        />
      )}

      <div className="page-header">
        <h1>Gestión de Usuarios</h1>
        {!showForm && !showDetail && (
          <button onClick={handleCreate} className="btn primary">
            + Nuevo Usuario
          </button>
        )}
      </div>

      {showForm ? (
        <UsuarioForm
          usuario={currentUsuario || {}} // Asegura que nunca sea undefined
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setCurrentUsuario(null);
          }}
          userTypes={USER_TYPES || []} // Asegura que siempre sea un array
        />
      ) : showDetail ? (
        <UsuarioDetail
          usuario={currentUsuario}
          onBack={() => {
            setShowDetail(false);
            setCurrentUsuario(null);
          }}
          onEdit={() => handleEdit(currentUsuario)}
        />
      ) : (
        <>
          <div className="search-filters">
            <SearchBar
              placeholder="Buscar usuarios por nombre, email o tipo..."
              onSearch={handleSearch}
              onClear={() => {
                setSearchTerm('');
                loadUsuarios();
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
                {Object.entries(USER_TYPES).map(([key, value]) => (
                  <button
                    key={key}
                    className={`btn filter-btn ${filter === value ? 'active' : ''}`}
                    onClick={() => {
                      setFilter(value);
                      setCurrentPage(1);
                    }}
                  >
                    {value}
                  </button>
                ))}
              </div>

              {categories.length > 0 && (
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
              )}
            </div>
          </div>

          {loading ? (
            <div className="loading">Cargando usuarios...</div>
          ) : filteredUsuarios.length === 0 ? (
            <div className="no-results">
              <p>No se encontraron usuarios que coincidan con la búsqueda.</p>
              <button
                className="btn clear-filters"
                onClick={() => {
                  setSearchTerm('');
                  setFilter('all');
                  setSelectCategory('');
                  loadUsuarios();
                }}
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <>
              <div className="usuarios-grid">
                {currentUsuarios.map(usuario => (
                  <UsuarioCard
                    key={usuario.idUsuario}
                    usuario={usuario}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onView={handleViewDetail}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="btn pagination-btn"
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
                    className="btn pagination-btn"
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

export default UsuariosPage;