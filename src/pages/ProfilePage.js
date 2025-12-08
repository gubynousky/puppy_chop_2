import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Calendar, Dog, Heart, ArrowLeft, Edit, LogOut } from 'lucide-react';
import Button from '../components/atoms/Button';
import userService from '../services/userService';
import favoritoService from '../services/favoritoService';

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    // Verificar si hay usuario logueado
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      alert('Debes iniciar sesión para ver tu perfil');
      navigate('/login');
      return;
    }

    // Cargar datos completos del usuario
    const loadUserData = async () => {
      try {
        const userData = JSON.parse(storedUser);
        console.log('Usuario desde localStorage:', userData);

        // Obtener datos completos del backend
        const fullUserData = await userService.obtenerUsuario(userData.id);
        console.log('Datos completos del usuario:', fullUserData);
        setUser(fullUserData);

        // Cargar favoritos si existen
        if (favoritoService && favoritoService.obtenerFavoritosPorUsuario) {
          try {
            const userFavoritos = await favoritoService.obtenerFavoritosPorUsuario(userData.id);
            console.log('Favoritos del usuario:', userFavoritos);
            setFavoritos(userFavoritos);
          } catch (error) {
            console.log('No se pudieron cargar favoritos:', error);
            setFavoritos([]);
          }
        }
      } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
        alert('Error al cargar datos del perfil');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        fontSize: '18px',
        color: '#6b7280'
      }}>
        Cargando perfil...
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        fontSize: '18px',
        color: '#6b7280'
      }}>
        No se pudo cargar el perfil
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '20px'
    }}>
      {/* HEADER */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <Button
          onClick={() => navigate('/')}
          variant="secondary"
          icon={ArrowLeft}
        >
          Volver al Inicio
        </Button>

        <Button
          onClick={handleLogout}
          variant="primary"
          icon={LogOut}
          style={{ backgroundColor: '#dc2626' }}
        >
          Cerrar Sesión
        </Button>
      </div>

      {/* TARJETA PRINCIPAL DEL PERFIL */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        marginBottom: '30px'
      }}>
        {/* BANNER SUPERIOR */}
        <div style={{
          background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
          padding: '40px 30px',
          textAlign: 'center',
          color: 'white'
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            backgroundColor: 'white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
          }}>
            <User size={60} color="#ea580c" />
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            margin: '0 0 8px 0'
          }}>
            {user.nombre} {user.apellido}
          </h1>
          <p style={{
            fontSize: '16px',
            opacity: 0.9,
            margin: 0
          }}>
            Miembro desde {new Date(user.fechaRegistro).toLocaleDateString('es-CL', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* INFORMACIÓN PERSONAL */}
        <div style={{ padding: '30px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#ea580c',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <User size={24} />
            Información Personal
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            {/* Email */}
            <div style={{
              backgroundColor: '#f9fafb',
              padding: '20px',
              borderRadius: '12px',
              border: '2px solid #fed7aa'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '8px'
              }}>
                <Mail size={20} color="#ea580c" />
                <span style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#6b7280'
                }}>
                  Email
                </span>
              </div>
              <p style={{
                fontSize: '16px',
                color: '#111827',
                margin: 0,
                fontWeight: '500'
              }}>
                {user.email}
              </p>
            </div>

            {/* Teléfono */}
            <div style={{
              backgroundColor: '#f9fafb',
              padding: '20px',
              borderRadius: '12px',
              border: '2px solid #fed7aa'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '8px'
              }}>
                <Phone size={20} color="#ea580c" />
                <span style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#6b7280'
                }}>
                  Teléfono
                </span>
              </div>
              <p style={{
                fontSize: '16px',
                color: '#111827',
                margin: 0,
                fontWeight: '500'
              }}>
                {user.telefono}
              </p>
            </div>

            {/* Fecha de Nacimiento */}
            <div style={{
              backgroundColor: '#f9fafb',
              padding: '20px',
              borderRadius: '12px',
              border: '2px solid #fed7aa'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '8px'
              }}>
                <Calendar size={20} color="#ea580c" />
                <span style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#6b7280'
                }}>
                  Fecha de Nacimiento
                </span>
              </div>
              <p style={{
                fontSize: '16px',
                color: '#111827',
                margin: 0,
                fontWeight: '500'
              }}>
                {new Date(user.fechaNacimiento).toLocaleDateString('es-CL')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MASCOTAS */}
      {user.mascotas && user.mascotas.length > 0 && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          padding: '30px',
          marginBottom: '30px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#ea580c',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <Dog size={24} />
            Mis Mascotas
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {user.mascotas.map((mascota) => (
              <div
                key={mascota.id}
                style={{
                  backgroundColor: '#d1fae5',
                  padding: '24px',
                  borderRadius: '12px',
                  border: '3px solid #10b981',
                  position: 'relative'
                }}
              >
                {/* Emoji según tipo */}
                <div style={{
                  fontSize: '48px',
                  textAlign: 'center',
                  marginBottom: '15px'
                }}>
                  {mascota.tipo === 'perro' ? '🐕' : mascota.tipo === 'gato' ? '🐈' : '🐾'}
                </div>

                {/* Nombre de la mascota */}
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: 'bold',
                  color: '#166534',
                  textAlign: 'center',
                  marginBottom: '15px'
                }}>
                  {mascota.nombreMascota}
                </h3>

                {/* Detalles */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                  fontSize: '14px'
                }}>
                  <div>
                    <span style={{ fontWeight: '600', color: '#166534' }}>Tipo:</span>
                    <p style={{ margin: '4px 0 0 0', color: '#166534' }}>
                      {mascota.tipo.charAt(0).toUpperCase() + mascota.tipo.slice(1)}
                    </p>
                  </div>
                  <div>
                    <span style={{ fontWeight: '600', color: '#166534' }}>Raza:</span>
                    <p style={{ margin: '4px 0 0 0', color: '#166534' }}>{mascota.raza}</p>
                  </div>
                  <div>
                    <span style={{ fontWeight: '600', color: '#166534' }}>Edad:</span>
                    <p style={{ margin: '4px 0 0 0', color: '#166534' }}>
                      {mascota.edad} {mascota.edad === 1 ? 'año' : 'años'}
                    </p>
                  </div>
                  <div>
                    <span style={{ fontWeight: '600', color: '#166534' }}>Peso:</span>
                    <p style={{ margin: '4px 0 0 0', color: '#166534' }}>{mascota.peso} kg</p>
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <span style={{ fontWeight: '600', color: '#166534' }}>Tamaño:</span>
                    <p style={{ margin: '4px 0 0 0', color: '#166534' }}>
                      {mascota.tamaño.charAt(0).toUpperCase() + mascota.tamaño.slice(1)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRODUCTOS FAVORITOS */}
      {user.productosFavoritos && user.productosFavoritos.length > 0 && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          padding: '30px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#ea580c',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <Heart size={24} />
            Productos Favoritos ({user.productosFavoritos.length})
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            {user.productosFavoritos.map((favorito) => (
              <div
                key={favorito.id}
                style={{
                  backgroundColor: '#ffedd5',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '2px solid #ea580c',
                  transition: 'transform 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {favorito.producto ? (
                  <>
                    <h4 style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#ea580c',
                      marginBottom: '8px'
                    }}>
                      {favorito.producto.nombre}
                    </h4>
                    <p style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      marginBottom: '8px'
                    }}>
                      {favorito.producto.descripcion}
                    </p>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#ea580c'
                      }}>
                        ${favorito.producto.precio?.toLocaleString()}
                      </span>
                      <span style={{
                        fontSize: '12px',
                        backgroundColor: '#fed7aa',
                        color: '#ea580c',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontWeight: '600'
                      }}>
                        {favorito.producto.categoria}
                      </span>
                    </div>
                  </>
                ) : (
                  <p style={{ color: '#6b7280' }}>
                    Categoría: {favorito.categoriaInteres}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SI NO HAY MASCOTAS NI FAVORITOS */}
      {(!user.mascotas || user.mascotas.length === 0) && 
       (!user.productosFavoritos || user.productosFavoritos.length === 0) && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          padding: '60px 30px',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '18px',
            color: '#6b7280',
            marginBottom: '20px'
          }}>
            Aún no tienes mascotas ni productos favoritos registrados
          </p>
          <Button
            onClick={() => navigate('/catalogo')}
            variant="primary"
            icon={Heart}
          >
            Explorar Productos
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;