import React, { useState, useEffect, useCallback } from 'react';
import { FaPlus } from 'react-icons/fa';
import prestamosService from '../services/prestamosService';
import librosService from '../services/librosService';
import usuarioService from '../services/usuarioService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';
import PrestamoCard from '../components/PrestamoCard';
import FiltrosPrestamos from '../components/FiltrosPrestamos';
import EstadisticasPrestamos from '../components/EstadisticasPrestamos';
import Pagination from '../components/Pagination';
import PrestamoForm from '../components/PrestamoForm';
import Swal from 'sweetalert2';

const PrestamosPage = () => {
  // Estados principales
  const [prestamos, setPrestamos] = useState([]);
  const [libros, setLibros] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Estados para filtros y búsqueda
  const [filtro, setFiltro] = useState('TODOS');
  const [searchTerm, setSearchTerm] = useState('');

  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const prestamosPerPage = 10;

  // Estado para modal de préstamo
  const [showModal, setShowModal] = useState(false);
  const [prestamoEditando, setPrestamoEditando] = useState(null);

  // Cargar datos iniciales
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [prestamosData, librosData, usuariosData] = await Promise.all([
        prestamosService.getPrestamos(),
        librosService.getLibros(),
        usuarioService.getUsuarios()
      ]);

      setPrestamos(prestamosData);
      setLibros(librosData);
      setUsuarios(usuariosData);
    } catch (err) {
      console.error('Error al cargar datos:', err);
      setError('Error al cargar los datos. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filtrar préstamos
  const filteredPrestamos = useCallback(() => {
    return prestamos.filter(prestamo => {
      const libro = libros.find(l => l.idLibro === prestamo.libro.idLibro);
      const usuario = usuarios.find(u => u.idUsuario === prestamo.usuario.idUsuario);

      const matchesSearch = searchTerm === '' ||
        (libro?.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          usuario?.nombre.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesFilter = filtro === 'TODOS' || prestamo.estado === filtro;

      return matchesSearch && matchesFilter;
    });
  }, [prestamos, libros, usuarios, searchTerm, filtro]);

  // Obtener préstamos actuales para la página
  const currentPrestamos = filteredPrestamos().slice(
    (currentPage - 1) * prestamosPerPage,
    currentPage * prestamosPerPage
  );

  const totalPages = Math.ceil(filteredPrestamos().length / prestamosPerPage);

  // Manejar devolución
  const handleDevolucion = async (id) => {
    const result = await Swal.fire({
      title: '¿Registrar devolución?',
      text: 'Esta acción marcará el préstamo como devuelto',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, registrar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await prestamosService.registrarDevolucion(id);
        const updatedPrestamos = prestamos.map(p =>
          p.idPrestamo === id ? {
            ...p,
            estado: 'DEVUELTO',
            fechaDevolucion: new Date().toISOString()
          } : p
        );
        setPrestamos(updatedPrestamos);
        setSuccess('Devolución registrada correctamente');
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        console.error('Error al registrar devolución:', err);
        setError('Error al registrar la devolución');
      }
    }
  };

  // Manejar eliminación
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar préstamo?',
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
        await prestamosService.deletePrestamo(id);
        setPrestamos(prestamos.filter(p => p.idPrestamo !== id));
        setSuccess('Préstamo eliminado correctamente');
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        console.error('Error al eliminar préstamo:', err);
        setError('Error al eliminar el préstamo');
      }
    }
  };

  // Manejar edición
  const handleEdit = (prestamo) => {
    setPrestamoEditando(prestamo);
    setShowModal(true);
  };

  // Manejar nuevo préstamo
  const handleNuevoPrestamo = () => {
    setPrestamoEditando(null);
    setShowModal(true);
  };

  // Manejar envío del formulario
  const handleSubmitPrestamo = async (prestamoData) => {
    try {
      if (prestamoEditando) {
        // Actualizar préstamo existente
        const updatedPrestamo = await prestamosService.updatePrestamo(
          prestamoEditando.idPrestamo,
          prestamoData
        );
        setPrestamos(prestamos.map(p =>
          p.idPrestamo === prestamoEditando.idPrestamo ? updatedPrestamo : p
        ));
        setSuccess('Préstamo actualizado correctamente');
      } else {
        // Crear nuevo préstamo
        const newPrestamo = await prestamosService.createPrestamo(
          prestamoData.usuarioId,
          prestamoData.libroId
        );
        setPrestamos([...prestamos, newPrestamo]);
        setSuccess('Préstamo creado correctamente');
      }

      setShowModal(false);
      setPrestamoEditando(null);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error al guardar préstamo:', err);
      setError(`Error al ${prestamoEditando ? 'actualizar' : 'crear'} el préstamo`);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={fetchData} />;

  return (
    <div className="prestamos-page">
      <div className="page-header">
        <h1>Gestión de Préstamos</h1>
        <button className="btn primary" onClick={handleNuevoPrestamo}>
          <FaPlus /> Nuevo Préstamo
        </button>
      </div>

      {success && <SuccessMessage message={success} />}

      <FiltrosPrestamos
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filtro={filtro}
        setFiltro={setFiltro}
        setCurrentPage={setCurrentPage}
      />

      <EstadisticasPrestamos prestamos={prestamos} />

      <div className="prestamos-grid">
        {currentPrestamos.length > 0 ? (
          currentPrestamos.map(prestamo => (
            <PrestamoCard
              key={prestamo.idPrestamo}
              prestamo={prestamo}
              onDevolucion={handleDevolucion}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="no-results">
            No se encontraron préstamos que coincidan con los filtros.
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <PrestamoForm
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setPrestamoEditando(null);
        }}
        onSubmit={handleSubmitPrestamo}
        prestamo={prestamoEditando}
        libros={libros}
        usuarios={usuarios}
      />
    </div>
  );
};

export default PrestamosPage;