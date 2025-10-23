import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Package } from 'lucide-react';
import ProductCard from '../components/molecules/ProductCard';
import FilterBar from '../components/organisms/FilterBar';
import Badge from '../components/atoms/Badge';
import { productosDisponibles } from '../data/productos';

function CatalogoPage({ onAgregarAlCarrito }) {
  const location = useLocation();
  const navigate = useNavigate();

  console.log('CatalogoPage montada');
  console.log('URL actual:', window.location.href);
  console.log('location.search:', location.search);

  const queryParams = new URLSearchParams(location.search);
  const categoriaURL = queryParams.get('categoria') || '';
  const precioMinURL = queryParams.get('precioMin') || '';

  console.log('Filtros leidos desde URL:', { categoria: categoriaURL, precioMin: precioMinURL });

  const [categoria, setCategoria] = useState(categoriaURL);
  const [precioMin, setPrecioMin] = useState(precioMinURL);

  useEffect(() => {
    console.log('useEffect: URL cambió, actualizando estado local');
    setCategoria(categoriaURL);
    setPrecioMin(precioMinURL);
  }, [location.search, categoriaURL, precioMinURL]);

  const productosFiltrados = productosDisponibles.filter(producto => {
    const matchCategoria = !categoriaURL || producto.categoria === categoriaURL;
    const matchPrecio = !precioMinURL || producto.precio >= parseInt(precioMinURL);
    return matchCategoria && matchPrecio;
  });

  console.log('Productos filtrados:', productosFiltrados.length, 'de', productosDisponibles.length);

  const handleAplicarFiltros = () => {
    console.log('Aplicando filtros y actualizando URL');
    const params = new URLSearchParams();
    if (categoria) params.append('categoria', categoria);
    if (precioMin) params.append('precioMin', precioMin);
    const newURL = `/catalogo?${params.toString()}`;
    console.log('Nueva URL:', newURL);
    navigate(newURL);
  };

  const handleLimpiarFiltros = () => {
    console.log('Limpiando filtros');
    setCategoria('');
    setPrecioMin('');
    navigate('/catalogo');
  };

  return (
    <div>
      <h1 style={{
        fontSize: '30px',
        fontWeight: 'bold',
        color: '#ea580c',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap'
      }}>
        <Package size={32} />
        <span>Catálogo de Productos</span>
      </h1>

      <FilterBar
        categoria={categoria}
        setCategoria={setCategoria}
        precioMin={precioMin}
        setPrecioMin={setPrecioMin}
        onAplicar={handleAplicarFiltros}
        onLimpiar={handleLimpiarFiltros}
      />

      <div style={{ marginBottom: '16px' }}>
        <Badge variant="success">
          {productosFiltrados.length} productos encontrados
        </Badge>
      </div>

      <div 
        className="products-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '24px'
        }}
      >
        {productosFiltrados.map(producto => (
          <ProductCard
            key={producto.id}
            producto={producto}
            onAgregar={onAgregarAlCarrito}
          />
        ))}
      </div>

      {productosFiltrados.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 20px' }}>
          <div style={{ fontSize: '60px', marginBottom: '16px' }}>😢</div>
          <p style={{ fontSize: '20px', color: '#6b7280' }}>
            No se encontraron productos con estos filtros
          </p>
        </div>
      )}
    </div>
  );
}

export default CatalogoPage;