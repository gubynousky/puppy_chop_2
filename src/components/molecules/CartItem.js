import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';

function CartItem({ item, onIncrement, onDecrement, onRemove }) {
  return (
    <div 
      className="cart-item"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px',
        backgroundColor: '#ffedd5',
        borderRadius: '8px',
        marginBottom: '12px',
        flexWrap: 'wrap'
      }}
    >
      <div style={{ fontSize: '40px' }}>{item.imagen}</div>
      
      <div style={{ flex: 1, minWidth: '150px' }}>
        <h4 style={{ fontWeight: 'bold', marginBottom: '4px' }}>{item.nombre}</h4>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>
          ${item.precio.toLocaleString()} c/u
        </p>
      </div>
      
      <div 
        className="cart-item-controls"
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => onDecrement(item.id)}
            style={{
              backgroundColor: '#ea580c',
              color: 'white',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Minus size={16} />
          </button>
          <span style={{ fontWeight: 'bold', width: '32px', textAlign: 'center' }}>
            {item.cantidad}
          </span>
          <button
            onClick={() => onIncrement(item.id)}
            style={{
              backgroundColor: '#ea580c',
              color: 'white',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Plus size={16} />
          </button>
        </div>
        
        <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#ea580c', minWidth: '80px', textAlign: 'right' }}>
          ${(item.precio * item.cantidad).toLocaleString()}
        </div>
        
        <button
          onClick={() => onRemove(item.id)}
          style={{
            color: '#dc2626',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Eliminar producto"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}

export default CartItem;