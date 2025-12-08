import api from './api';

const authService = {
  registrarUsuario: async (userData) => {
    try {
      const response = await api.post('/usuarios/registro', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  login: async (email, password) => {
    try {
      const response = await api.post('/usuarios/login', { email, password });
      if (response.data.usuario) {
        localStorage.setItem('user', JSON.stringify(response.data.usuario));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  logout: () => {
    localStorage.removeItem('user');
  },
};

export default authService;