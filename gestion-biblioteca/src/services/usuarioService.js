import axios from "axios";
import { getUsuariosCount } from "./bibliotecaService";

const API_URL = "http://localhost:8080/api/usuarios";

// Crear instancia de Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const usuarioService = {
  //Obtener todos los usuruarios
  getUsuarios: async () => {
    try {
      const response = await api.get(API_URL);
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener los usuarios", error);
    }
  },

  //Obtener usuario por id
  getUsuarioById: async (id) => {
    try {
      const response = await api.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener usuario con ID ${id}:`, error);
      throw error;
    }
  },

  // Crear un nuevo usuario
  createUsuario: async (usuario) => {
    try {
      const response = await api.post(API_URL, usuario);
      return response.data;
    } catch (error) {
      throw new Error("Error al crear el usuario", error);
    }
  },

  // Actualizar un usuario existente
  updateUsuario: async (id, usuario) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, usuario);
      return response.data;
    } catch (error) {
      throw new Error("Error al actualizar el usuario", error);
    }
  },

  // Eliminar un usuario
  deleteUsuario: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error(`Error al eliminar el usuario con ID ${id}:`, error);
      throw error;
    }
  },

  //Buscar usuarios por su nombre
  searchUsuarios: async (nombre) => {
    try {
      const response = await axios.get(`${API_URL}/search?nombre=${nombre}`);
      return response.data;
    } catch (error) {
      throw new Error("Error al buscar usuarios", error);
    }
  },

  getUsuariosCount: async () => {
    try {
      const response = await axios.get(`${API_URL}/count`);
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener el recuento de usuarios", error);
    }
  }
};

export default usuarioService;
