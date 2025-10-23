import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Package, Trash2 } from 'lucide-react';
import CartItem from '../components/molecules/CartItem';
import Button from '../components/atoms/Button';

function CarritoPage({ carrito, onIncrement, onDecrement, onRemove, onVaciar }) {
  console.log('CarritoPage montada - productos en carrito:', carrito.length);

  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  if (carrito.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 20px' }}>
        <div style={{ fontSize: '60px', marginBottom: '16px' }}>🛒</div>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#6b7280', marginBottom: '16px' }}>
          Tu carrito está vacío
        </h2>
        <Link to="/catalogo">
          <Button variant="primary" icon={Package}>
            Ir a Comprar
          </Button>
        </Link>
      </div>
    );
  }

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
        <ShoppingCart size={32} />
        <span>Mi Carrito ({carrito.length} productos)</span>
      </h1>

      <div style={{ marginBottom: '24px' }}>
        {carrito.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onRemove={onRemove}
          />
        ))}
      </div>

      <div style={{
        backgroundColor: '#ea580c',
        color: 'white',
        padding: '24px',
        borderRadius: '8px'
      }}>
        <div 
          className="cart-total"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Total:</span>
          <span style={{ fontSize: '36px', fontWeight: 'bold' }}>
            ${total.toLocaleString()}
          </span>
        </div>
        <div 
          className="cart-total-buttons"
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
        >
          <Button onClick={onVaciar} variant="danger" icon={Trash2}>
            Vaciar Carrito
          </Button>
          <button style={{
            flex: 1,
            backgroundColor: 'white',
            color: '#ea580c',
            padding: '10px 20px',
            borderRadius: '8px',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            minWidth: '200px'
          }}>
            Finalizar Compra 💳
          </button>
        </div>
      </div>
    </div>
  );
}

export default CarritoPage;