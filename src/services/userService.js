import api from './api';

const userService = {
  // Registrar nuevo usuario
  registrarUsuario: async (userData) => {
    try {
      console.log('📤 Enviando datos de usuario al backend:', userData);
      const response = await api.post('/usuarios/registro', userData);
      console.log('✅ Respuesta del servidor:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error al registrar usuario:', error.response?.data || error);
      throw error.response?.data || error.message;
    }
  },

  // Login de usuario
  login: async (email, password) => {
    try {
      console.log('🔐 Intentando login con email:', email);
      const response = await api.post('/usuarios/login', {
        email,
        password
      });
      console.log('✅ Login exitoso:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error en login:', error.response?.data || error);
      throw error.response?.data || error.message;
    }
  },

  // Obtener usuario por ID
  obtenerUsuario: async (id) => {
    try {
      const response = await api.get(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      throw error.response?.data || error.message;
    }
  },

  // Listar todos los usuarios
  listarUsuarios: async () => {
    try {
      const response = await api.get('/usuarios');
      return response.data;
    } catch (error) {
      console.error('Error al listar usuarios:', error);
      throw error.response?.data || error.message;
    }
  },

  // Actualizar usuario
  actualizarUsuario: async (id, userData) => {
    try {
      const response = await api.put(`/usuarios/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error.response?.data || error.message;
    }
  },

  // Desactivar usuario
  desactivarUsuario: async (id) => {
    try {
      const response = await api.delete(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al desactivar usuario:', error);
      throw error.response?.data || error.message;
    }
  },

  // Buscar usuarios por nombre
  buscarUsuarios: async (nombre) => {
    try {
      const response = await api.get('/usuarios/buscar', {
        params: { nombre }
      });
      return response.data;
    } catch (error) {
      console.error('Error al buscar usuarios:', error);
      throw error.response?.data || error.message;
    }
  },

  // Obtener usuario por email
  obtenerUsuarioPorEmail: async (email) => {
    try {
      const response = await api.get(`/usuarios/email/${email}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener usuario por email:', error);
      throw error.response?.data || error.message;
    }
  }
};

export default userService;