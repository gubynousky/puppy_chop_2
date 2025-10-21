import React from 'react';

function Badge({ children, variant = 'default' }) {
  const styles = {
    default: { backgroundColor: '#e5e7eb', color: '#1f2937' },
    primary: { backgroundColor: '#fed7aa', color: '#9a3412' },
    success: { backgroundColor: '#bbf7d0', color: '#166534' }
  };

  return (
    <span style={{
      ...styles[variant],
      padding: '4px 12px',
      borderRadius: '9999px',
      fontSize: '14px',
      fontWeight: '600',
      display: 'inline-block'
    }}>
      {children}
    </span>
  );
}

export default Badge;