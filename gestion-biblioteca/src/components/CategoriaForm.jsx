import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import {FaSave, FaTimes } from 'react-icons/fa';

const CategoriaForm = ({onSave, initialData = {} }) => {
    const {id } = useParams();
    const navigate = useNavigate();
    const [categoria, setCategoria] = useState({
        nombre: '',
        descripcion: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
          // Simular carga de datos para edición
            setLoading(true);
            setTimeout(() => {
            const mockData = {
                id: 1,
                nombre: 'Novela',
                descripcion: 'Obras de ficción narrativa'
            };
            setCategoria(mockData);
            setLoading(false);
            }, 500);
        }
    }, [id]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCategoria(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            //Validacion basica
            if (!categoria.nombre.trim()) {
                throw new Error('El nombre de la categoría es obligatorio');
            }

            //Logica para guardar
            onSave(categoria);
            navigate('/categorias');
        } catch (error) {
            setError(error.message);
        }
    }

    if (loading) return <div className="loading">Cargando categoria...</div>;

    return (
        <div className="categoria-form-page">
            <h1>{id ? 'Editar Categoria' : 'Nueva Categoria'}</h1>

            {error && <div className="error">{error}</div>}

            <form onSubmit={handleSubmit} className="categoria-from"></form>
            <div className="form-group">
                <label>Nombre *</label>
                <input 
                    type="text"
                    name="nombre"
                    value={categoria.nombre}
                    onChange={handleChange}
                    required
                    autoFocus
                />
            </div>

            <div className="form-group">
                <label>Descripción</label>
                <textarea
                    name="descripcion"
                    value={categoria.descripcion}
                    onChange={handleChange}
                    rows="4"
                />
            </div>
            
            <div className="form-actions">
                <button type="submit" className="btn guardar">
                    <FaSave /> {id ? 'Actualizar' : 'Guardar'}
                </button>
                <button 
                    type="button" 
                    className="btn cancelar"
                    onClick={() => navigate('/categorias')}
                >
                    <FaTimes /> Cancelar
                </button>
            </div>
        </div>
    );
};

export default CategoriaForm;