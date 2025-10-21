import React from 'react';
import { Search } from 'lucide-react';
import Button from '../atoms/Button';
import { categorias } from '../../data/productos';

function FilterBar({ categoria, setCategoria, precioMin, setPrecioMin, onAplicar, onLimpiar }) {
  console.log('FilterBar renderizado - filtros actuales:', { categoria, precioMin });

  return (
    <div style={{
      backgroundColor: '#ffedd5',
      padding: '24px',
      borderRadius: '8px',
      marginBottom: '24px',
      border: '2px solid #fed7aa'
    }}>
      <h3 style={{
        fontWeight: 'bold',
        fontSize: '18px',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <Search size={20} />
        Filtros de Búsqueda
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px'
      }}>
        <div>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>
            Categoría
          </label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '2px solid #fed7aa',
              borderRadius: '8px',
              outline: 'none'
            }}
          >
            <option value="">Todas las categorías</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.emoji} {cat.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>
            Precio mínimo
          </label>
          <input
            type="number"
            value={precioMin}
            onChange={(e) => setPrecioMin(e.target.value)}
            placeholder="0"
            style={{
              width: '100%',
              padding: '8px',
              border: '2px solid #fed7aa',
              borderRadius: '8px',
              outline: 'none'
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
          <Button onClick={onAplicar} variant="primary">
            Aplicar Filtros
          </Button>
          <Button onClick={onLimpiar} variant="secondary">
            Limpiar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;