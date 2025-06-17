import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LibroForm = ({ libro, onSubmit, onCancel }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        titulo: '',
        autor: '',
        editorial: '',
        anioPublicacion: '',
        categoria: '',
        isbn: '',
        cantidadTotal: '',
        cantidadDisponible: ''
    });

    const [loading] = useState(!!id);
    const [error, setError] = useState({});
    const [categories] = useState([
        'Novela', 'Ciencia', 'Historia', 'Tecnología',
        'Biografía', 'Infantil', 'Fantasía', 'Autoayuda'
    ]);

    useEffect(() => {
        if (libro) {
            setFormData({
                titulo: libro.titulo,
                autor: libro.autor || '',
                editorial: libro.editorial || '',
                anioPublicacion: libro.anioPublicacion || '',
                categoria: libro.categoria || '',
                isbn: libro.isbn || '',
                cantidadTotal: libro.cantidadTotal,
                cantidadDisponible: libro.cantidadDisponible
            });
        }
    }, [libro]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (error[name]) {
            setError(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleNumberChange = (e) => {
        const { name, value } = e.target;
        const numValue = value === '' ? '' : parseInt(value) || 0;

        if (name === 'anioPublicacion') {
            setFormData(prev => ({ ...prev, [name]: value }));
        } else {
            setFormData(prev => {
                const updatedData = { ...prev, [name]: numValue };
                if (name === 'cantidadTotal') {
                    const total = numValue;
                    const disponible = parseInt(prev.cantidadDisponible) || 0;
                    if (total < disponible) {
                        updatedData.cantidadDisponible = total;
                    }
                }
                return updatedData;
            });
        }

        if (error[name]) {
            setError(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateField = (name, value) => {
        switch (name) {
            case 'titulo':
            case 'autor':
            case 'editorial':
                return value.trim() ? '' : `El campo ${name} es obligatorio`;
            case 'anioPublicacion':
                const anio = parseInt(value);
                return anio >= 1500 && anio <= new Date().getFullYear()
                    ? ''
                    : 'Año inválido';
            case 'categoria':
                return value ? '' : 'La categoría es obligatoria';
            case 'isbn':
                return value.trim().length >= 3 && value.trim().length <= 30
                    ? ''
                    : 'El ISBN debe tener entre 3 y 30 caracteres';
            case 'cantidadTotal':
                return parseInt(value) >= 1 ? '' : 'Debe haber al menos 1 ejemplar';
            case 'cantidadDisponible':
                const disponible = parseInt(value);
                const total = parseInt(formData.cantidadTotal);
                return disponible >= 0 && disponible <= total
                    ? ''
                    : 'Cantidad disponible inválida';
            default:
                return '';
        }
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

        setError(newError);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            Swal.fire({
                icon: 'error',
                title: 'Error de validación',
                text: 'Por favor, complete todos los campos obligatorios correctamente'
            });
            return;
        }

        const libroToSubmit = {
            titulo: formData.titulo,
            autor: formData.autor,
            editorial: formData.editorial,
            anioPublicacion: parseInt(formData.anioPublicacion),
            categoria: formData.categoria,
            isbn: formData.isbn,
            cantidadTotal: parseInt(formData.cantidadTotal),
            cantidadDisponible: parseInt(formData.cantidadDisponible)
        };

        onSubmit(libroToSubmit)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: libro ? 'Libro actualizado correctamente' : 'Libro agregado correctamente'
                }).then(() => {
                    navigate('/libros');
                });
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message
                });
            });
    };

    if (loading) return <div className="loading">Cargando libro...</div>;

    return (
        <div className="libro-form-page">
            <h1>{libro ? 'Editar Libro' : 'Nuevo Libro'}</h1>
            <form onSubmit={handleSubmit} className="libro-form">
                <div className="form-row">
                    <div className="form-group">
                        <label>Título *</label>
                        <input
                            type="text"
                            name="titulo"
                            value={formData.titulo}
                            onChange={handleChange}
                            className={error.titulo ? 'has-error' : ''}
                        />
                        {error.titulo && <span className="error-message">{error.titulo}</span>}
                    </div>
                    <div className="form-group">
                        <label>Autor *</label>
                        <input
                            type="text"
                            name="autor"
                            value={formData.autor}
                            onChange={handleChange}
                            className={error.autor ? 'has-error' : ''}
                        />
                        {error.autor && <span className="error-message">{error.autor}</span>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Editorial *</label>
                        <input
                            type="text"
                            name="editorial"
                            value={formData.editorial}
                            onChange={handleChange}
                            className={error.editorial ? 'has-error' : ''}
                        />
                        {error.editorial && <span className="error-message">{error.editorial}</span>}
                    </div>
                    <div className="form-group">
                        <label>Año de Publicación *</label>
                        <input
                            type="number"
                            name="anioPublicacion"
                            value={formData.anioPublicacion}
                            onChange={handleNumberChange}
                            min="1500"
                            max={new Date().getFullYear()}
                            className={error.anioPublicacion ? 'has-error' : ''}
                        />
                        {error.anioPublicacion && <span className="error-message">{error.anioPublicacion}</span>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Categoría *</label>
                        <select
                            name="categoria"
                            value={formData.categoria}
                            onChange={handleChange}
                            className={error.categoria ? 'has-error' : ''}
                        >
                            <option value="">Seleccione una categoría</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                        {error.categoria && <span className="error-message">{error.categoria}</span>}
                    </div>
                    <div className="form-group">
                        <label>ISBN *</label>
                        <input
                            type="text"
                            name="isbn"
                            value={formData.isbn}
                            onChange={handleChange}
                            className={error.isbn ? 'has-error' : ''}
                        />
                        {error.isbn && <span className="error-message">{error.isbn}</span>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Cantidad Total *</label>
                        <input
                            type="number"
                            name="cantidadTotal"
                            value={formData.cantidadTotal}
                            onChange={handleNumberChange}
                            min="1"
                            className={error.cantidadTotal ? 'has-error' : ''}
                        />
                        {error.cantidadTotal && <span className="error-message">{error.cantidadTotal}</span>}
                    </div>
                    <div className="form-group">
                        <label>Cantidad Disponible *</label>
                        <input
                            type="number"
                            name="cantidadDisponible"
                            value={formData.cantidadDisponible}
                            onChange={handleNumberChange}
                            min="0"
                            max={formData.cantidadTotal}
                            className={error.cantidadDisponible ? 'has-error' : ''}
                        />
                        {error.cantidadDisponible && <span className="error-message">{error.cantidadDisponible}</span>}
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn guardar">
                        {libro ? 'Actualizar Libro' : 'Guardar Nuevo Libro'}
                    </button>
                    <button type="button" className="btn cancelar" onClick={onCancel}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LibroForm;
