import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Home, Search, Dog, Mail } from 'lucide-react';
import CartDropdown from './CartDropdown';

function Navbar({ cantidadCarrito, carrito }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = (e) => {
    e.preventDefault();
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  console.log('Navbar renderizado - items en carrito:', cantidadCarrito);

  return (
    <>
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
            
            {/* Botón que abre el dropdown en lugar de navegar */}
            <button
              onClick={toggleCart}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'white',
                textDecoration: 'none',
                position: 'relative',
                fontSize: '16px',
                whiteSpace: 'nowrap',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: isActive('/carrito') ? 'bold' : 'normal'
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
            </button>
            
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

      {/* Dropdown del carrito */}
      <CartDropdown 
        carrito={carrito}
        isOpen={isCartOpen}
        onClose={closeCart}
      />
    </>
  );
}

export default Navbar;