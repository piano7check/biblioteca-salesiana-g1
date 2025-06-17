import axios from "axios";

const API_URL = "http://localhost:8080/api/categorias";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const categoriaService = {
    /**
     * Obtener todas las categorías
     * @returns {Promise<Array>} Lista de categorías
     */
    getCategorias: async () => {
        try {
            const response = await api.get(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error al obtener categorías:", error);
            throw error;
        }
    },


    getCategoriaById: async (id) => {
        try {
            const response = await api.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener la categoría con ID ${id}:`, error);
            throw error;
        }
    },

    /**
     * Crear una nueva categoría
     * @param {Object} categoria - Objeto con nombreCategoria y descripcion
     * @returns {Promise<Object>} Categoría creada
     */
    createCategoria: async (categoria) => {
        try {
            const response = await api.post(API_URL, categoria);
            return response.data;
        } catch (error) {
            console.error("Error al crear la categoría:", error);
            throw error;
        }
    },

    /**
     * Actualizar una categoría existente
     * @param {number} id - ID de la categoría a actualizar
     * @param {Object} categoria - Objeto con los nuevos datos
     * @returns {Promise<Object>} Categoría actualizada
     */
    updateCategoria: async (id, categoria) => {
        try {
            const response = await api.put(`${API_URL}/${id}`, categoria);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar la categoría con ID ${id}:`, error);
            throw error;
        }
    },

    /**
     * Eliminar una categoría
     * @param {number} id - ID de la categoría a eliminar
     * @returns {Promise<void>}
     */
    deleteCategoria: async (id) => {
        try {
            await api.delete(`${API_URL}/${id}`);
        } catch (error) {
            console.error(`Error al eliminar la categoría con ID ${id}:`, error);
            throw error;
        }
    },

    /**
     * Buscar categorías por nombre
     * @param {string} nombre - Nombre o parte del nombre a buscar
     * @returns {Promise<Array>} Lista de categorías que coinciden
     */
    searchCategorias: async (nombre) => {
        try {
            const response = await api.get(`/buscar?nombre=${nombre}`);
            return response.data;
        } catch (error) {
            console.error(`Error al buscar categorías con nombre "${nombre}":`, error);
            throw error;
        }
    },
};

export default categoriaService;