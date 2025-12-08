import React, { useState, useEffect } from 'react';
import { Users, Search, RefreshCw, User, Dog, Heart } from 'lucide-react';
import Button from '../components/atoms/Button';
import api from '../services/api';

function UserListPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchId, setSearchId] = useState('');
  const [modoVista, setModoVista] = useState('todos'); // 'todos' o 'buscar'

  // Cargar todos los usuarios al montar
  useEffect(() => {
    cargarTodosLosUsuarios();
  }, []);

  const cargarTodosLosUsuarios = async () => {
    setLoading(true);
    setError('');
    setModoVista('todos');
    try {
      const response = await api.get('/usuarios');
      console.log('Usuarios cargados:', response.data);
      setUsuarios(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
      setError('Error al cargar usuarios');
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  const buscarPorId = async () => {
    if (!searchId.trim()) {
      setError('Por favor ingresa un ID');
      return;
    }

    setLoading(true);
    setError('');
    setModoVista('buscar');
    try {
      const response = await api.get(`/usuarios/${searchId}`);
      console.log('Usuario encontrado:', response.data);
      setUsuarios([response.data]);
    } catch (err) {
      console.error('Error al buscar usuario:', err);
      if (err.response?.status === 404) {
        setError(`No se encontró usuario con ID: ${searchId}`);
      } else {
        setError('Error al buscar usuario');
      }
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      buscarPorId();
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* HEADER */}
      <div style={{
        backgroundColor: '#fed7aa',
        padding: '30px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#ea580c',
          margin: '0 0 10px 0'
        }}>
          <Users style={{ display: 'inline-block', marginRight: '10px', verticalAlign: 'middle' }} size={36} />
          Usuarios Registrados
        </h1>
        <p style={{ fontSize: '16px', color: '#6b7280', margin: 0 }}>
          Gestiona y visualiza todos los usuarios de PuppyChop
        </p>
      </div>

      {/* MENSAJE DE ERROR */}
      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          border: '2px solid #ef4444',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '20px',
          color: '#991b1b',
          fontWeight: 'bold'
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* BARRA DE BÚSQUEDA Y ACCIONES */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        border: '2px solid #fed7aa',
        marginBottom: '20px'
      }}>
        <div style={{
          display: 'flex',
          gap: '15px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          {/* Búsqueda por ID */}
          <div style={{ flex: '1', minWidth: '200px' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '8px',
              fontSize: '14px',
              color: '#374151'
            }}>
              Buscar por ID
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="number"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ej: 1"
                style={{
                  flex: 1,
                  padding: '10px',
                  border: '2px solid #fed7aa',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <Button
                type="button"
                onClick={buscarPorId}
                variant="primary"
                icon={Search}
                disabled={loading}
              >
                Buscar
              </Button>
            </div>
          </div>

          {/* Botón Listar Todos */}
          <div style={{ marginTop: '28px' }}>
            <Button
              type="button"
              onClick={cargarTodosLosUsuarios}
              variant="secondary"
              icon={RefreshCw}
              disabled={loading}
            >
              Listar Todos
            </Button>
          </div>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          fontSize: '18px',
          color: '#6b7280'
        }}>
          Cargando usuarios...
        </div>
      )}

      {/* TABLA DE USUARIOS */}
      {!loading && usuarios.length > 0 && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          border: '2px solid #fed7aa',
          overflow: 'hidden'
        }}>
          <div style={{
            backgroundColor: '#ea580c',
            color: 'white',
            padding: '15px 20px',
            fontWeight: 'bold',
            fontSize: '18px'
          }}>
            {modoVista === 'todos' 
              ? `Total de usuarios: ${usuarios.length}`
              : 'Resultado de búsqueda'
            }
          </div>

          {usuarios.map((usuario) => (
            <div
              key={usuario.id}
              style={{
                padding: '20px',
                borderBottom: '2px solid #fed7aa',
                '&:last-child': { borderBottom: 'none' }
              }}
            >
              {/* INFO DEL USUARIO */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '15px',
                marginBottom: '15px'
              }}>
                <div>
                  <p style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    margin: '0 0 4px 0',
                    fontWeight: '600'
                  }}>
                    <User size={14} style={{ display: 'inline', marginRight: '5px' }} />
                    ID: {usuario.id}
                  </p>
                  <p style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#ea580c',
                    margin: 0
                  }}>
                    {usuario.nombre} {usuario.apellido}
                  </p>
                </div>

                <div>
                  <p style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    margin: '0 0 4px 0',
                    fontWeight: '600'
                  }}>
                    Email
                  </p>
                  <p style={{
                    fontSize: '14px',
                    color: '#374151',
                    margin: 0
                  }}>
                    {usuario.email}
                  </p>
                </div>

                <div>
                  <p style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    margin: '0 0 4px 0',
                    fontWeight: '600'
                  }}>
                    Teléfono
                  </p>
                  <p style={{
                    fontSize: '14px',
                    color: '#374151',
                    margin: 0
                  }}>
                    {usuario.telefono}
                  </p>
                </div>

                <div>
                  <p style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    margin: '0 0 4px 0',
                    fontWeight: '600'
                  }}>
                    Fecha de Registro
                  </p>
                  <p style={{
                    fontSize: '14px',
                    color: '#374151',
                    margin: 0
                  }}>
                    {new Date(usuario.fechaRegistro).toLocaleDateString('es-CL')}
                  </p>
                </div>
              </div>

              {/* MASCOTAS */}
              {usuario.mascotas && usuario.mascotas.length > 0 && (
                <div style={{
                  backgroundColor: '#d1fae5',
                  padding: '15px',
                  borderRadius: '8px',
                  marginBottom: '15px'
                }}>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#166534',
                    margin: '0 0 10px 0'
                  }}>
                    <Dog size={16} style={{ display: 'inline', marginRight: '5px' }} />
                    Mascotas ({usuario.mascotas.length})
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {usuario.mascotas.map((mascota) => (
                      <div
                        key={mascota.id}
                        style={{
                          backgroundColor: 'white',
                          padding: '10px 15px',
                          borderRadius: '6px',
                          border: '2px solid #10b981',
                          fontSize: '13px'
                        }}
                      >
                        <span style={{ fontWeight: 'bold', color: '#166534' }}>
                          {mascota.tipo === 'perro' ? '🐕' : mascota.tipo === 'gato' ? '🐈' : '🐾'} {mascota.nombreMascota}
                        </span>
                        <br />
                        <span style={{ color: '#6b7280' }}>
                          {mascota.raza} • {mascota.edad} años • {mascota.peso} kg
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PRODUCTOS FAVORITOS */}
              {usuario.productosFavoritos && usuario.productosFavoritos.length > 0 && (
                <div style={{
                  backgroundColor: '#ffedd5',
                  padding: '15px',
                  borderRadius: '8px'
                }}>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#c2410c',
                    margin: '0 0 10px 0'
                  }}>
                    <Heart size={16} style={{ display: 'inline', marginRight: '5px' }} />
                    Productos Favoritos ({usuario.productosFavoritos.length})
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {usuario.productosFavoritos.map((favorito) => (
                      <div
                        key={favorito.id}
                        style={{
                          backgroundColor: 'white',
                          padding: '10px 15px',
                          borderRadius: '6px',
                          border: '2px solid #ea580c',
                          fontSize: '13px'
                        }}
                      >
                        {favorito.producto ? (
                          <>
                            <span style={{ fontWeight: 'bold', color: '#ea580c' }}>
                              {favorito.producto.nombre}
                            </span>
                            <br />
                            <span style={{ color: '#6b7280' }}>
                              ${favorito.producto.precio?.toLocaleString()} • {favorito.producto.categoria}
                            </span>
                          </>
                        ) : (
                          <span style={{ color: '#6b7280' }}>
                            Categoría: {favorito.categoriaInteres}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SIN MASCOTAS NI FAVORITOS */}
              {(!usuario.mascotas || usuario.mascotas.length === 0) &&
               (!usuario.productosFavoritos || usuario.productosFavoritos.length === 0) && (
                <div style={{
                  backgroundColor: '#f3f4f6',
                  padding: '15px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  color: '#6b7280',
                  fontSize: '14px'
                }}>
                  Este usuario aún no tiene mascotas ni productos favoritos registrados
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* SIN RESULTADOS */}
      {!loading && usuarios.length === 0 && (
        <div style={{
          backgroundColor: 'white',
          padding: '60px 20px',
          borderRadius: '8px',
          border: '2px solid #fed7aa',
          textAlign: 'center'
        }}>
          <Users size={64} color="#d1d5db" style={{ marginBottom: '20px' }} />
          <h3 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#6b7280',
            margin: '0 0 10px 0'
          }}>
            No se encontraron usuarios
          </h3>
          <p style={{ color: '#9ca3af', margin: 0 }}>
            {modoVista === 'buscar'
              ? 'Intenta con otro ID o lista todos los usuarios'
              : 'No hay usuarios registrados en el sistema'
            }
          </p>
        </div>
      )}
    </div>
  );
}

export default UserListPage;