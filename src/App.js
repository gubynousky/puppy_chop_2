import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import CatalogoPage from './pages/CatalogoPage';
import CarritoPage from './pages/CarritoPage';
import ContactoPage from './pages/ContactoPage';

function App() {
  const [carrito, setCarrito] = useState(() => {
    try {
      const carritoGuardado = localStorage.getItem('puppychop-carrito');
      if (carritoGuardado) {
        return JSON.parse(carritoGuardado);
      }
      return [];
    } catch (error) {
      console.error('Error al leer localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('puppychop-carrito', JSON.stringify(carrito));
    } catch (error) {
      console.error('Error al guardar en localStorage:', error);
    }
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    const itemExistente = carrito.find(item => item.id === producto.id);
    if (itemExistente) {
      setCarrito(carrito.map(item =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const incrementarCantidad = (id) => {
    setCarrito(carrito.map(item =>
      item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    ));
  };

  const decrementarCantidad = (id) => {
    const item = carrito.find(i => i.id === id);
    if (item.cantidad === 1) {
      eliminarDelCarrito(id);
    } else {
      setCarrito(carrito.map(i =>
        i.id === id ? { ...i, cantidad: i.cantidad - 1 } : i
      ));
    }
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const cantidadTotal = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout cantidadCarrito={cantidadTotal} />}>
          <Route index element={<HomePage />} />
          <Route path="catalogo" element={<CatalogoPage onAgregarAlCarrito={agregarAlCarrito} />} />
          <Route path="carrito" element={
            <CarritoPage
              carrito={carrito}
              onIncrement={incrementarCantidad}
              onDecrement={decrementarCantidad}
              onRemove={eliminarDelCarrito}
              onVaciar={vaciarCarrito}
            />
          } />
          <Route path="contacto" element={<ContactoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;