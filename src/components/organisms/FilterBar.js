import React from 'react';
import { Search } from 'lucide-react';
import Button from '../atoms/Button';
import CustomSelect from '../atoms/CustomSelect';
import { categorias } from '../../data/productos';


function FilterBar({ categoria, setCategoria, precioMin, setPrecioMin, onAplicar, onLimpiar }) {
  console.log('FilterBar renderizado - filtros actuales:', { categoria, precioMin });

  // Preparar opciones para el CustomSelect
  const categoriaOptions = [
    { value: '', label: 'Todas las categorías' },
    ...categorias.map(cat => ({
      value: cat.id,
      label: `${cat.emoji} ${cat.nombre}`
    }))
  ];

  return (
    <div
      className="filter-bar-container"
      style={{
        backgroundColor: '#ffedd5',
        padding: '24px',
        borderRadius: '8px',
        marginBottom: '24px',
        border: '2px solid #fed7aa'
      }}
    >
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
     
      <div
        className="filter-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}
      >
        <div>
          <label style={{
            display: 'block',
            fontWeight: '600',
            marginBottom: '8px',
            fontSize: '14px'
          }}>
            Categoría
          </label>
          <CustomSelect
            value={categoria}
            onChange={setCategoria}
            options={categoriaOptions}
            placeholder="Todas las categorías"
          />
        </div>
       
        <div>
          <label style={{
            display: 'block',
            fontWeight: '600',
            marginBottom: '8px',
            fontSize: '14px'
          }}>
            Precio mínimo
          </label>
          <input
            type="number"
            value={precioMin}
            onChange={(e) => setPrecioMin(e.target.value)}
            placeholder="0"
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #fed7aa',
              borderRadius: '8px',
              outline: 'none',
              fontSize: '16px',
              backgroundColor: 'white',
              minHeight: '44px'
            }}
          />
        </div>
       
        <div
          className="filter-buttons"
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '8px'
          }}
        >
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