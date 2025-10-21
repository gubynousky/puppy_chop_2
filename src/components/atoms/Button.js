import React from 'react';

function Button({ onClick, children, variant = 'primary', icon: Icon }) {
  const styles = {
    primary: {
      backgroundColor: '#ea580c',
      color: 'white'
    },
    secondary: {
      backgroundColor: '#6b7280',
      color: 'white'
    },
    danger: {
      backgroundColor: '#dc2626',
      color: 'white'
    },
    success: {
      backgroundColor: '#16a34a',
      color: 'white'
    }
  };

  return (
    <button
      onClick={onClick}
      style={{
        ...styles[variant],
        padding: '10px 20px',
        borderRadius: '8px',
        border: 'none',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.2s'
      }}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
}

export default Button;