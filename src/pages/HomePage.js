import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, Mail } from 'lucide-react';
import Button from '../components/atoms/Button';

function HomePage() {
  console.log('HomePage montada');

  return (
    <div style={{ textAlign: 'center', padding: '0', marginBottom: '0' }}>
      
      <div style={{ marginBottom: '20px', marginTop: '0' }}>
        <img 
          src="/puppy.png"
          alt="Perrito PuppyChop" 
          className="home-logo"
          style={{
            width: '500px',
            height: 'auto',
            objectFit: 'contain',
            display: 'block',
            margin: '0 auto',
            maxWidth: '100%'
          }}
        />
      </div>

      <h1 style={{ 
        fontSize: '48px', 
        fontWeight: 'bold', 
        color: '#ea580c', 
        margin: '0 0 12px 0'
      }}>
        Bienvenido a PuppyChop
      </h1>

      <p style={{ 
        fontSize: '20px', 
        color: '#6b7280', 
        margin: '0 0 24px 0',
        padding: '0 16px'
      }}>
        Todo lo que tu perrito necesita en un solo lugar
      </p>

      <div 
        className="home-buttons"
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '16px', 
          marginBottom: '40px',
          flexWrap: 'wrap',
          padding: '0 16px'
        }}
      >
        <Link to="/catalogo">
          <Button variant="primary" icon={Package}>
            Ver Catálogo
          </Button>
        </Link>
        <Link to="/carrito">
          <Button variant="secondary" icon={ShoppingCart}>
            Ver Carrito
          </Button>
        </Link>
        <Link to="/contacto">
          <Button variant="success" icon={Mail}>
            Contáctanos
          </Button>
        </Link>
      </div>

<div 
  className="home-features"
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '0 20px',
    marginBottom: '0'
  }}
>
  <div 
    style={{
      padding: '24px',
      backgroundColor: 'white',
      borderRadius: '8px',
      border: '2px solid #fed7aa',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 12px 24px -6px rgba(234, 88, 12, 0.3)';
      e.currentTarget.style.borderColor = '#ea580c';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.borderColor = '#fed7aa';
    }}
  >
    <div style={{ fontSize: '40px', marginBottom: '12px' }}>🚚</div>
    <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Envío Gratis</h3>
    <p style={{ color: '#6b7280', margin: '0' }}>En compras sobre $50.000</p>
  </div>

  <div 
    style={{
      padding: '24px',
      backgroundColor: 'white',
      borderRadius: '8px',
      border: '2px solid #fed7aa',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 12px 24px -6px rgba(234, 88, 12, 0.3)';
      e.currentTarget.style.borderColor = '#ea580c';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.borderColor = '#fed7aa';
    }}
  >
    <div style={{ fontSize: '40px', marginBottom: '12px' }}>✨</div>
    <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Calidad Premium</h3>
    <p style={{ color: '#6b7280', margin: '0' }}>Productos certificados</p>
  </div>

  <div 
    style={{
      padding: '24px',
      backgroundColor: 'white',
      borderRadius: '8px',
      border: '2px solid #fed7aa',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 12px 24px -6px rgba(234, 88, 12, 0.3)';
      e.currentTarget.style.borderColor = '#ea580c';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.borderColor = '#fed7aa';
    }}
  >
    <div style={{ fontSize: '40px', marginBottom: '12px' }}>💚</div>
    <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Garantía</h3>
    <p style={{ color: '#6b7280', margin: '0' }}>30 días de devolución</p>
  </div>
</div>
    </div>
  );
}

export default HomePage;