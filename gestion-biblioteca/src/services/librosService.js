import axios from "axios";

const API_URL = "http://localhost:8080/api/libros";

// Crear instancia de Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const libroService = {
  //Obtener todos los libros
  getLibros: async () => {
    try {
      const response = await api.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error al obtener libros:", error);
      throw error;
    }
  },

  getLibroById: async (id) => {
    try {
      const response = await api.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el libro con ID ${id}:`, error);
      throw error;
    }
  },

  // Crear un nuevo libro
  createLibro: async (libro) => {
    try {
      const response = await api.post(API_URL, libro);
      return response.data;
    } catch (error) {
      console.error("Error al crear el libro:", error);
      throw error;
    }
  },

  // Actualizar un libro existente
  updateLibro: async (id, libro) => {
    try {
      const response = await api.put(`${API_URL}/${id}`, libro);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar el libro con ID ${id}:`, error);
      throw error;
    }
  },

  // Eliminar un libro
  deleteLibro: async (id) => {
    try {
      await api.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error(`Error al eliminar el libro con ID ${id}:`, error);
      throw error;
    }
  },

  // Buscar libros por título
  searchLibros: async (titulo) => {
    try {
      const response = await api.get(`/buscar?titulo=${titulo}`);
      return response.data;
    } catch (error) {
      console.error(`Error al buscar libros con título "${titulo}":`, error);
      throw error;
    }
  },

  getLibroCount: async () => {
    try {
      const response = await api.get("/count");
      return response.data;
    } catch (error) {
      console.error("Error al obtener el recuento de libros:", error);
      throw error;
    }
  }
};

export default libroService;