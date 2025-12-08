import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Home, Search, UserPlus, LogIn, LogOut, User } from 'lucide-react';
import CartDropdown from './CartDropdown';

function Navbar({ cantidadCarrito, carrito }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Cargar usuario desde localStorage al montar el componente
  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Error al parsear usuario:', error);
          localStorage.removeItem('user');
        }
      }
    };

    loadUser();

    // Escuchar cambios en localStorage
    window.addEventListener('storage', loadUser);
    
    // Polling para detectar cambios en la misma pestaña
    const interval = setInterval(loadUser, 1000);

    return () => {
      window.removeEventListener('storage', loadUser);
      clearInterval(interval);
    };
  }, []);

  const toggleCart = (e) => {
    e.preventDefault();
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      localStorage.removeItem('user');
      setUser(null);
      navigate('/');
      alert('Sesión cerrada exitosamente');
    }
  };

  console.log('Navbar renderizado - items en carrito:', cantidadCarrito);
  console.log('Usuario logueado:', user);

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
          {/* LOGO */}
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
          
          {/* NAVEGACIÓN CENTRAL */}
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
                whiteSpace: 'nowrap',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
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
                whiteSpace: 'nowrap',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              <Search size={20} />
              <span>Catálogo</span>
            </Link>
            
            {/* Botón Carrito */}
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
                fontWeight: isActive('/carrito') ? 'bold' : 'normal',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
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

            {/* Mostrar "Usuarios" solo si está logueado */}
            {user && (
              <Link
                to="/usuarios"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: isActive('/usuarios') ? 'bold' : 'normal',
                  fontSize: '16px',
                  whiteSpace: 'nowrap',
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                <User size={20} />
                <span>Usuarios</span>
              </Link>
            )}
          </div>

          {/* SECCIÓN DERECHA - LOGIN/LOGOUT */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            {user ? (
              // USUARIO LOGUEADO
              <>
                {/* Saludo */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  whiteSpace: 'nowrap'
                }}>
                  <User size={18} />
                  <span>Hola, {user.nombre}</span>
                </div>

                {/* Botón Cerrar Sesión */}
                <button
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'white',
                    color: '#ea580c',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#fed7aa';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <LogOut size={18} />
                  <span>Cerrar Sesión</span>
                </button>
              </>
            ) : (
              // USUARIO NO LOGUEADO
              <>
                {/* Botón Iniciar Sesión */}
                <Link
                  to="/login"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'white',
                    color: '#ea580c',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#fed7aa';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <LogIn size={18} />
                  <span>Iniciar Sesión</span>
                </Link>

                {/* Botón Registrarse */}
                <Link
                  to="/registro"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#fed7aa',
                    color: '#ea580c',
                    border: '2px solid white',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#fed7aa';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <UserPlus size={18} />
                  <span>Registrarse</span>
                </Link>
              </>
            )}
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