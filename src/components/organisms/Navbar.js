import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Home, Search, Dog, Mail } from 'lucide-react';

function Navbar({ cantidadCarrito }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  console.log('Navbar renderizado - items en carrito:', cantidadCarrito);

  return (
    <nav style={{
      backgroundColor: '#ea580c',
      color: 'white',
      padding: '16px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'white',
            textDecoration: 'none'
          }}
        >
          <span style={{ fontSize: '2rem' }}>🐶</span>
          <span style={{ whiteSpace: 'nowrap' }}>PuppyChop</span>
        </Link>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '20px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'white',
              textDecoration: 'none',
              fontWeight: isActive('/') ? 'bold' : 'normal',
              fontSize: '16px',
              whiteSpace: 'nowrap'
            }}
          >
            <Home size={20} />
            <span>Inicio</span>
          </Link>
          
          <Link
            to="/catalogo"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'white',
              textDecoration: 'none',
              fontWeight: isActive('/catalogo') ? 'bold' : 'normal',
              fontSize: '16px',
              whiteSpace: 'nowrap'
            }}
          >
            <Search size={20} />
            <span>Catálogo</span>
          </Link>
          
          <Link
            to="/carrito"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'white',
              textDecoration: 'none',
              position: 'relative',
              fontWeight: isActive('/carrito') ? 'bold' : 'normal',
              fontSize: '16px',
              whiteSpace: 'nowrap'
            }}
          >
            <ShoppingCart size={20} />
            <span>Carrito</span>
            {cantidadCarrito > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                backgroundColor: '#dc2626',
                color: 'white',
                fontSize: '12px',
                minWidth: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                padding: '0 6px'
              }}>
                {cantidadCarrito}
              </span>
            )}
          </Link>
          
          <Link
            to="/contacto"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'white',
              textDecoration: 'none',
              fontWeight: isActive('/contacto') ? 'bold' : 'normal',
              fontSize: '16px',
              whiteSpace: 'nowrap'
            }}
          >
            <Mail size={20} />
            <span>Contacto</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;