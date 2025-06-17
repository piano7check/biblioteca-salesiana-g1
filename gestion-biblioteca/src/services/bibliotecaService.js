import axios from "axios";

const API_URL = "http://localhost:8080/api/libros";

// Crear instancia de Axios
const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getLibrosCount = async () => {
    try {
        const response = await api.get('/libros/count');
        return response.data.count;
    } catch (error) {
        console.error('Error fetching libros count:', error);
        throw error;
    }
};

export const getUsuariosCount = async () => {
    try {
        const response = await api.get('/usuarios/count');
        return response.data.count;
    } catch (error) {
        console.error('Error fetching usuarios count:', error);
        throw error;
    }
};

export const getPrestamosActivosCount = async () => {
    try {
        const response = await api.get('/prestamos/count', {
            params: { estado: 'activo' }
        });
        return response.data.count;
    } catch (error) {
        console.error('Error fetching prestamos activos count:', error);
        throw error;
    }
};