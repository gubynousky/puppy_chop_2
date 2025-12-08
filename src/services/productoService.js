import api from './api';

const productoService = {
  obtenerProductos: async () => {
    try {
      console.log('🔍 Llamando al backend para obtener productos...');
      const response = await api.get('/productos');
      console.log('✅ Productos recibidos del backend:', response.data.length, 'productos');
      console.log('📦 Productos:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error al obtener productos:', error);
      throw error.response?.data || error.message;
    }
  },

  obtenerProductosPorCategoria: async (categoria) => {
    try {
      const response = await api.get(`/productos/categoria/${categoria}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default productoService;