import axios from "axios";

const API_URL = "http://localhost:8080/api/prestamos";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const transformPrestamoData = (prestamo) => {
    return {
        id: prestamo.idPrestamo,
        usuario: {
            nombreCompleto: `${prestamo.usuario.nombre} ${prestamo.usuario.apellido}`,
            tipoUsuario: prestamo.usuario.tipoUsuario,
            id: prestamo.usuario.idUsuario
        },
        libro: {
            titulo: prestamo.libro.titulo,
            autor: prestamo.libro.autor,
            id: prestamo.libro.idLibro
        },
        fechaPrestamo: prestamo.fechaPrestamo,
        fechaDevolucion: prestamo.fechaDevolucion,
        estado: prestamo.estado
    };
};

const prestamosService = {

    getPrestamos: async () => {
        try {
            const response = await api.get(API_URL);
            return response.data.map(transformPrestamoData);
        } catch (error) {
            console.error('Error al obtener préstamos:', error);
            throw error;
        }
    },

    getPrestamoById: async (id) => {
        try {
            const response = await api.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener préstamo por ID:', error);
            throw error;
        }
    },

    createPrestamo: async (usuarioId, libroId) => {
        try {
            const response = await api.post(`${API_URL}?usuarioId=${usuarioId}&libroId=${libroId}`);
            return response.data;
        } catch (error) {
            console.error("Error al crear el préstamo:", error);
            throw error;
        }
    },

    updatePrestamo: async (id, prestamoData) => {
        try {
            const response = await api.put(`${API_URL}/${id}`, prestamoData);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar préstamo:', error);
            throw error;
        }
    },

    deletePrestamo: async (id) => {
        try {
            await api.delete(`${API_URL}/${id}`);
        } catch (error) {
            console.error(`Error al eliminar el préstamo con ID ${id}:`, error);
            throw error;
        }
    },

    getPrestamosByEstado: async (estado) => {
        try {
            const response = await api.get(`${API_URL}/estado/${estado}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener préstamos por estado:', error);
            throw error;
        }
    },

    registrarDevolucion: async (id) => {
        try {
            const response = await api.put(`${API_URL}/${id}/devolucion`);
            return response.data;
        } catch (error) {
            console.error('Error al registrar devolución:', error);
            throw error;
        }
    }

};
export default prestamosService;