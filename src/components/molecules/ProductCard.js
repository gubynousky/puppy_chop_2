import React from 'react';
import { Plus } from 'lucide-react';
import Button from '../atoms/Button';


function ProductCard({ producto, onAgregar }) {
  return (
    <div 
      style={{
        border: '2px solid #fed7aa',
        borderRadius: '8px',
        padding: '16px',
        backgroundColor: 'white',
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
      <div style={{ fontSize: '60px', textAlign: 'center', marginBottom: '12px' }}>
        {producto.imagen}
      </div>
      <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>
        {producto.nombre}
      </h3>
      <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '12px' }}>
        {producto.descripcion}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#ea580c' }}>
          ${producto.precio.toLocaleString()}
        </span>
        <Button onClick={() => onAgregar(producto)} variant="primary" icon={Plus}>
          Agregar
        </Button>
      </div>
    </div>
  );
}


export default ProductCard;