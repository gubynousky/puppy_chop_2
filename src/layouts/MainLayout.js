import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/organisms/Navbar';


function MainLayout({ cantidadCarrito }) {
  console.log('MainLayout montado - carrito tiene', cantidadCarrito, 'items');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffedd5', overflow: 'visible' }}>
      <Navbar cantidadCarrito={cantidadCarrito} />
      <div
        className="main-container"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '24px',
          overflow: 'visible'
        }}
      >
        <Outlet />
      </div>
      <footer style={{
        backgroundColor: '#ea580c',
        color: 'white',
        textAlign: 'center',
        padding: '24px',
        marginTop: '48px'
      }}>
        <p style={{ fontWeight: '600', marginBottom: '8px' }}>
          🐾 PuppyChop - Hecho con amor para tu perrito
        </p>
        <p style={{ fontSize: '14px' }}>
          PuppyChop © 2025. Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
}


export default MainLayout;