import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, Mail } from 'lucide-react';
import Button from '../components/atoms/Button';

function HomePage() {
  return (
    <div style={{ textAlign: 'center', padding: '0', marginBottom: '0' }}>
      <div style={{ marginBottom: '20px', marginTop: '0' }}>
        <img 
          src="/puppy.png"
          alt="Perrito PuppyChop" 
          style={{
            width: '500px',
            height: 'auto',
            objectFit: 'contain',
            display: 'block',
            margin: '0 auto'
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
        margin: '0 0 24px 0'
      }}>
        Todo lo que tu perrito necesita en un solo lugar
      </p>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '16px', 
        marginBottom: '40px' 
      }}>
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

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 20px',
        marginBottom: '0'
      }}>
        <div style={{
          padding: '24px',
          backgroundColor: '#ffedd5',
          borderRadius: '8px',
          border: '2px solid #fed7aa'
        }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🚚</div>
          <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Envío Gratis</h3>
          <p style={{ color: '#6b7280', margin: '0' }}>En compras sobre $50.000</p>
        </div>
        <div style={{
          padding: '24px',
          backgroundColor: '#ffedd5',
          borderRadius: '8px',
          border: '2px solid #fed7aa'
        }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>✨</div>
          <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Calidad Premium</h3>
          <p style={{ color: '#6b7280', margin: '0' }}>Productos certificados</p>
        </div>
        <div style={{
          padding: '24px',
          backgroundColor: '#ffedd5',
          borderRadius: '8px',
          border: '2px solid #fed7aa'
        }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>💚</div>
          <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Garantía</h3>
          <p style={{ color: '#6b7280', margin: '0' }}>30 días de devolución</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
