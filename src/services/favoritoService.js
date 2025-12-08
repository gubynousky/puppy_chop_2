import api from './api';

const favoritoService = {
  agregarFavorito: async (userId, productId, categoriaInteres, notificarOfertas) => {
    try {
      console.log('📦 Agregando favorito al backend...');
      console.log('Parámetros recibidos:', { userId, productId, categoriaInteres, notificarOfertas });
      
      // CRÍTICO: Enviar con los nombres EXACTOS que espera el backend
      const payload = {
        userId: userId,
        productId: productId,
        categoriaInteres: categoriaInteres,
        notificarOfertas: notificarOfertas
      };
      
      console.log('Payload a enviar:', payload);
      
      const response = await api.post('/favoritos', payload);
      
      console.log('✅ Favorito agregado:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error al agregar favorito:', error.response?.data || error);
      throw error.response?.data || error.message;
    }
  },

  obtenerFavoritosPorUsuario: async (userId) => {
    try {
      const response = await api.get(`/favoritos/usuario/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  verificarFavorito: async (userId, productId) => {
    try {
      const response = await api.get(`/favoritos/usuario/${userId}/verificar/${productId}`);
      return response.data.existe;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default favoritoService;