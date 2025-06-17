import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UsuarioForm = ({ usuario, onSubmit, onCancel }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const initialFormState = {
    nombre: '',
    apellido: '',
    ci: '',
    correo: '',
    telefono: '',
    direccion: '',
    tipoUsuario: 'Estudiante'
  };

  const [loading] = useState(!!id);
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const USER_TYPES = ['Estudiante', 'Docente', 'Administrador', 'Otro'];


  useEffect(() => {
    if (usuario) {
      setFormData({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        ci: usuario.ci,
        correo: usuario.correo,
        telefono: usuario.telefono || '',
        direccion: usuario.direccion || '',
        tipoUsuario: usuario.tipoUsuario
      });
    }
  }, [usuario])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Función auxiliar validateField
  const validateField = (fieldName, value) => {
    const trimmedValue = typeof value === 'string' ? value.trim() : value;

    const validations = {
      nombre: () => {
        if (!trimmedValue) return 'El nombre es obligatorio';
        if (trimmedValue.length < 2) return 'Mínimo 2 caracteres';
        if (trimmedValue.length > 100) return 'Máximo 100 caracteres';
        return null;
      },
      apellido: () => {
        if (!trimmedValue) return 'El apellido es obligatorio';
        if (trimmedValue.length < 2) return 'Mínimo 2 caracteres';
        if (trimmedValue.length > 100) return 'Máximo 100 caracteres';
        return null;
      },
      ci: () => {
        if (!trimmedValue) return 'El CI es obligatorio';
        if (!/^\d{6,12}$/.test(trimmedValue)) return 'Debe tener 6-12 dígitos';
        return null;
      },
      correo: () => {
        if (!trimmedValue) return 'El correo es obligatorio';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) return 'Correo inválido';
        return null;
      },
      telefono: () => {
        if (trimmedValue && !/^\d{7,15}$/.test(trimmedValue)) return '7-15 dígitos requeridos';
        return null;
      },
      tipoUsuario: () => {
        if (!trimmedValue) return 'Seleccione un tipo';
        if (!USER_TYPES.includes(trimmedValue)) return 'Tipo inválido';
        return null;
      }
    };

    return validations[fieldName] ? validations[fieldName]() : null;
  };

  const validateForm = () => {
    const newError = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      const errorMsg = validateField(key, formData[key]);
      if (errorMsg) {
        newError[key] = errorMsg;
        isValid = false;
      }
    });

    setErrors(newError);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      await Swal.fire({
        icon: 'error',
        title: 'Error de validación',
        html: Object.values(errors).filter(Boolean).join('<br>'),
        confirmButtonColor: '#3085d6'
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const usuarioToSubmit = {
        ...formData,
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        ci: formData.ci.trim(),
        correo: formData.correo.trim().toLowerCase(),
        telefono: formData.telefono.trim() || null,
        direccion: formData.direccion.trim() || null,
        tipo_usuario: formData.tipoUsuario
      };

      await onSubmit(usuarioToSubmit);

      await Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: usuario ? 'Usuario actualizado' : 'Usuario creado',
        timer: 2000,
        showConfirmButton: false
      });

      if (!usuario) {
        setFormData(initialFormState); // Resetear solo en creación
      }
      navigate('/usuarios');
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMsg || 'Error desconocido',
        confirmButtonColor: '#dc3545'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="loading">Cargando usuario...</div>;

  return (
    <div className="usuario-form-page">
      <h1>{usuario ? 'Editar Usuario' : 'Nuevo Usuario'}</h1>
      <form onSubmit={handleSubmit} className="usuario-form" noValidate>
        <div className="form-row">
          <div className={`form-group ${errors.nombre ? 'has-error' : ''}`}>
            <label htmlFor="nombre">Nombre *</label>
            <input
              id="nombre"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              disabled={isSubmitting}
              aria-invalid={!!errors.nombre}
              aria-describedby={errors.nombre ? 'nombre-error' : undefined}
            />
            {errors.nombre && (
              <span id="nombre-error" className="error-message" role="alert">
                {errors.nombre}
              </span>
            )}
          </div>

          <div className={`form-group ${errors.apellido ? 'has-error' : ''}`}>
            <label htmlFor="apellido">Apellido *</label>
            <input
              id='apellido'
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              disabled={isSubmitting}
              aria-invalid={!!errors.apellido}
              aria-describedby={errors.apellido ? 'apellido-error' : undefined}
            />
            {errors.apellido && (
              <span id="nombre-error" className="error-message" role="alert">
                {errors.apellido}
              </span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className={`form-group ${errors.ci ? 'has-error' : ''}`}>
            <label>CI *</label>
            <input
              id='ci'
              type="text"
              name="ci"
              value={formData.ci}
              onChange={handleChange}
              disabled={isSubmitting}
              aria-invalid={!!errors.ci}
              aria-describedby={errors.ci ? 'ci-error' : undefined}
            />
            {errors.ci && (
              <span id="nombre-error" className="error-message" role="alert">
                {errors.ci}
              </span>
            )}
          </div>

          <div className={`form-group ${errors.correo ? 'has-error' : ''}`}>
            <label htmlFor='correo'>Correo *</label>
            <input
              id='correo'
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              aria-invalid={!!errors.correo}
              aria-describedby={errors.correo ? 'correo-error' : undefined}
            />
            {errors.correo && (
              <span id="nombre-error" className="error-message" role="alert">
                {errors.correo}
              </span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className={`form-group ${errors.direccion ? 'has-error' : ''}`}>
            <label htmlFor='direccion'>Dirección</label>
            <input
              id='direccion'
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              aria-invalid={!!errors.direccion}
              aria-describedby={errors.direccion ? 'direccion-error' : undefined}
            />
            {errors.direccion && (
              <span id="nombre-error" className="error-message" role="alert">
                {errors.direccion}
              </span>
            )}
          </div>
        </div>

        <div className='form-row'>
          <div className={`form-group ${errors.telefono ? 'has-error' : ''}`}>
            <label htmlFor='telefono'>Teléfono</label>
            <input
              id='telefono'
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              aria-invalid={!!errors.telefono}
              aria-describedby={errors.telefono ? 'telefono-error' : undefined}
            />
            {errors.telefono && (
              <span id="nombre-error" className="error-message" role="alert">
                {errors.telefono}
              </span>
            )}
          </div>

          <div className={`form-group ${errors.tipoUsuario ? 'has-error' : ''}`}>
            <label htmlFor='tipoUsuario'>Tipo de Usuario *</label>
            <select
              id="tipoUsuario"
              name="tipoUsuario"
              value={formData.tipoUsuario}
              onChange={handleChange}
              disabled={isSubmitting}
              aria-invalid={!!errors.tipoUsuario}
              aria-describedby={errors.tipoUsuario ? 'tipoUsuario-error' : undefined}
            >
              {USER_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.tipoUsuario && (
              <span id="tipoUsuario-error" className="error-message" role="alert">
                {errors.tipoUsuario}
              </span>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="spinner"></span>
            ) : usuario ? 'Actualizar Usuario' : 'Crear Usuario'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
            disabled={isSubmitting}
          >
            Cancelar
          </button>
        </div>
      </form >
    </div >
  );
};

export default UsuarioForm;