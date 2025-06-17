import React, { useState, useEffect } from 'react';
import prestamosService from '../services/prestamosService';
import Notificacion from './Notificacion';
import Loader from '../components/LoadingSpinner';

const PrestamoForm = ({
  prestamoToEdit,
  onCancel,
  onSuccess,
  usuarios,
  libros
}) => {
  const [formData, setFormData] = useState({
    usuario: { idUsuario: '' },
    libro: { idLibro: '' },
    fechaPrestamo: new Date().toISOString().split('T')[0],
    fechaDevolucion: '',
    estado: 'PRESTADO'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (prestamoToEdit) {
      setFormData({
        usuario: { idUsuario: prestamoToEdit.usuario.idUsuario },
        libro: { idLibro: prestamoToEdit.libro.idLibro },
        fechaPrestamo: prestamoToEdit.fechaPrestamo.split('T')[0],
        fechaDevolucion: prestamoToEdit.fechaDevolucion
          ? prestamoToEdit.fechaDevolucion.split('T')[0]
          : '',
        estado: prestamoToEdit.estado
      });
    } else {
      // Reset form for new prestamo
      setFormData({
        usuario: { idUsuario: '' },
        libro: { idLibro: '' },
        fechaPrestamo: new Date().toISOString().split('T')[0],
        fechaDevolucion: '',
        estado: 'PRESTADO'
      });
    }
  }, [prestamoToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'idUsuario') {
      setFormData({
        ...formData,
        usuario: { idUsuario: parseInt(value) }
      });
    } else if (name === 'idLibro') {
      setFormData({
        ...formData,
        libro: { idLibro: parseInt(value) }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (prestamoToEdit) {
        // Actualizar préstamo existente
        await prestamosService.updatePrestamo(prestamoToEdit.idPrestamo, formData);
        setNotification({
          tipo: 'success',
          mensaje: 'Préstamo actualizado correctamente'
        });
      } else {
        // Crear nuevo préstamo
        await prestamosService.createPrestamo(
          formData.usuario.idUsuario,
          formData.libro.idLibro
        );
        setNotification({
          tipo: 'success',
          mensaje: 'Préstamo creado correctamente'
        });
      }
      onSuccess();
    } catch (err) {
      setError(err.message || 'Error al guardar el préstamo');
      setNotification({
        tipo: 'error',
        mensaje: 'Error al procesar la solicitud'
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h2 className="card-title">
          {prestamoToEdit ? 'Editar Préstamo' : 'Nuevo Préstamo'}
        </h2>

        {notification && (
          <Notificacion
            tipo={notification.tipo}
            mensaje={notification.mensaje}
            onClose={() => setNotification(null)}
          />
        )}

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="idUsuario" className="form-label">Usuario</label>
            <select
              id="idUsuario"
              name="idUsuario"
              className="form-select"
              value={formData.usuario.idUsuario}
              onChange={handleChange}
              required
              disabled={!!prestamoToEdit}
            >
              <option value="">Seleccione un usuario</option>
              {usuarios.map(usuario => (
                <option key={usuario.idUsuario} value={usuario.idUsuario}>
                  {usuario.nombre} {usuario.apellido}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="idLibro" className="form-label">Libro</label>
            <select
              id="idLibro"
              name="idLibro"
              className="form-select"
              value={formData.libro.idLibro}
              onChange={handleChange}
              required
              disabled={!!prestamoToEdit}
            >
              <option value="">Seleccione un libro</option>
              {libros.map(libro => (
                <option key={libro.idLibro} value={libro.idLibro}>
                  {libro.titulo} ({libro.autor})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="fechaPrestamo" className="form-label">Fecha de Préstamo</label>
            <input
              type="date"
              id="fechaPrestamo"
              name="fechaPrestamo"
              className="form-control"
              value={formData.fechaPrestamo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="fechaDevolucion" className="form-label">Fecha de Devolución</label>
            <input
              type="date"
              id="fechaDevolucion"
              name="fechaDevolucion"
              className="form-control"
              value={formData.fechaDevolucion}
              onChange={handleChange}
              min={formData.fechaPrestamo}
            />
          </div>

          {prestamoToEdit && (
            <div className="mb-3">
              <label htmlFor="estado" className="form-label">Estado</label>
              <select
                id="estado"
                name="estado"
                className="form-select"
                value={formData.estado}
                onChange={handleChange}
                required
              >
                <option value="PRESTADO">Prestado</option>
                <option value="DEVUELTO">Devuelto</option>
                <option value="RETRASADO">Retrasado</option>
              </select>
            </div>
          )}

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {prestamoToEdit ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrestamoForm;