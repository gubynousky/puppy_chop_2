import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Home, Search, Dog, Mail } from 'lucide-react';

function Navbar({ cantidadCarrito }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      backgroundColor: '#ea580c',
      color: 'white',
      padding: '16px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '24px',
          fontWeight: 'bold',
          color: 'white',
          textDecoration: 'none'
        }}>
          <Dog size={32} />
          PuppyChop
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'white',
            textDecoration: 'none',
            fontWeight: isActive('/') ? 'bold' : 'normal'
          }}>
            <Home size={20} />
            Inicio
          </Link>
          <Link to="/catalogo" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'white',
            textDecoration: 'none',
            fontWeight: isActive('/catalogo') ? 'bold' : 'normal'
          }}>
            <Search size={20} />
            Catálogo
          </Link>
          <Link to="/carrito" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'white',
            textDecoration: 'none',
            position: 'relative',
            fontWeight: isActive('/carrito') ? 'bold' : 'normal'
          }}>
            <ShoppingCart size={20} />
            Carrito
            {cantidadCarrito > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                backgroundColor: '#dc2626',
                color: 'white',
                fontSize: '12px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                {cantidadCarrito}
              </span>
            )}
          </Link>
          <Link to="/contacto" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'white',
            textDecoration: 'none',
            fontWeight: isActive('/contacto') ? 'bold' : 'normal'
          }}>
            <Mail size={20} />
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
