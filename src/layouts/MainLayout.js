import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/organisms/Navbar';

function MainLayout({ cantidadCarrito }) {
  console.log('MainLayout montado - carrito tiene', cantidadCarrito, 'items');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffedd5' }}>
      <Navbar cantidadCarrito={cantidadCarrito} />
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 24px 0 24px' }}>
        {/* outlet renderiza automaticamente la ruta hija */}
        <Outlet />
      </div>
      <footer style={{
        backgroundColor: '#ea580c',
        color: 'white',
        textAlign: 'center',
        padding: '24px',
        marginTop: '48px'
      }}>
        <p style={{ fontWeight: '600' }}>
          🐾 PuppyChop © 2025 - Hecho con ❤️ para tu perrito
        </p>
        <p style={{ fontSize: '14px', marginTop: '8px' }}>
          Proyecto educativo - Semana 6 - Desarrollo Fullstack II (DSY1104)
        </p>
      </footer>
    </div>
  );
}

export default MainLayout;
