import api from './api';

const petProfileService = {
  crearPerfilMascota: async (userId, petData) => {
    try {
      const response = await api.post(`/mascotas/usuario/${userId}`, petData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  obtenerMascotasPorUsuario: async (userId) => {
    try {
      const response = await api.get(`/mascotas/usuario/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default petProfileService;