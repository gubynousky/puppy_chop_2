import React, { useState } from 'react';
import { User, Dog, Heart, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import Button from '../components/atoms/Button';
import { productosDisponibles, categorias } from '../data/productos';

function RegisterPage() {
  console.log('RegisterPage montada');

  // Estado del formulario dividido en 3 pasos
  const [currentStep, setCurrentStep] = useState(1);
  
  // Paso 1: Información Personal
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: '',
    fechaNacimiento: ''
  });

  // Paso 2: Información de la Mascota
  const [petData, setPetData] = useState({
    nombreMascota: '',
    tipo: 'perro',
    raza: '',
    edad: '',
    peso: '',
    tamaño: ''
  });

  // Paso 3: Productos Favoritos
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [productosFavoritos, setProductosFavoritos] = useState([]);
  const [notificarOfertas, setNotificarOfertas] = useState(true);

  // Handlers para Paso 1
  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  // Handlers para Paso 2
  const handlePetDataChange = (e) => {
    const { name, value } = e.target;
    setPetData({
      ...petData,
      [name]: value
    });
  };

  // Handlers para Paso 3
  const toggleCategoria = (categoriaId) => {
    if (categoriasSeleccionadas.includes(categoriaId)) {
      setCategoriasSeleccionadas(categoriasSeleccionadas.filter(id => id !== categoriaId));
    } else {
      setCategoriasSeleccionadas([...categoriasSeleccionadas, categoriaId]);
    }
  };

  const toggleProductoFavorito = (productoId) => {
    if (productosFavoritos.includes(productoId)) {
      setProductosFavoritos(productosFavoritos.filter(id => id !== productoId));
    } else {
      setProductosFavoritos([...productosFavoritos, productoId]);
    }
  };

  const productosFiltered = productosDisponibles.filter(producto =>
    categoriasSeleccionadas.includes(producto.categoria)
  );

  // Navegación entre pasos
  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Submit final
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const registroCompleto = {
      usuario: userData,
      mascota: petData,
      favoritos: {
        categorias: categoriasSeleccionadas,
        productos: productosFavoritos,
        notificarOfertas: notificarOfertas
      }
    };

    console.log('Registro completo:', registroCompleto);
    alert('¡Registro exitoso! (Por ahora solo en consola, falta conectar con Spring Boot)');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* HEADER */}
      <div style={{
        textAlign: 'center',
        padding: '40px 20px',
        backgroundColor: '#fed7aa',
        borderRadius: '8px',
        marginBottom: '40px'
      }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: '#ea580c',
          marginBottom: '12px'
        }}>
          ¡Únete a PuppyChop! 🐾
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#6b7280'
        }}>
          Crea tu cuenta y descubre los mejores productos para tu peludo
        </p>
      </div>

      {/* PROGRESS BAR */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '40px',
        position: 'relative'
      }}>
        {/* Línea de progreso */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '10%',
          right: '10%',
          height: '4px',
          backgroundColor: '#fed7aa',
          zIndex: 0
        }}>
          <div style={{
            height: '100%',
            width: `${((currentStep - 1) / 2) * 100}%`,
            backgroundColor: '#ea580c',
            transition: 'width 0.3s ease'
          }} />
        </div>

        {/* Step 1 */}
        <div style={{ flex: 1, textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: currentStep >= 1 ? '#ea580c' : '#fed7aa',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 8px',
            fontWeight: 'bold',
            border: '4px solid white'
          }}>
            {currentStep > 1 ? <CheckCircle size={20} /> : '1'}
          </div>
          <span style={{
            fontSize: '14px',
            fontWeight: currentStep === 1 ? 'bold' : 'normal',
            color: currentStep >= 1 ? '#ea580c' : '#6b7280'
          }}>
            Datos Personales
          </span>
        </div>

        {/* Step 2 */}
        <div style={{ flex: 1, textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: currentStep >= 2 ? '#ea580c' : '#fed7aa',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 8px',
            fontWeight: 'bold',
            border: '4px solid white'
          }}>
            {currentStep > 2 ? <CheckCircle size={20} /> : '2'}
          </div>
          <span style={{
            fontSize: '14px',
            fontWeight: currentStep === 2 ? 'bold' : 'normal',
            color: currentStep >= 2 ? '#ea580c' : '#6b7280'
          }}>
            Tu Mascota
          </span>
        </div>

        {/* Step 3 */}
        <div style={{ flex: 1, textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: currentStep >= 3 ? '#ea580c' : '#fed7aa',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 8px',
            fontWeight: 'bold',
            border: '4px solid white'
          }}>
            3
          </div>
          <span style={{
            fontSize: '14px',
            fontWeight: currentStep === 3 ? 'bold' : 'normal',
            color: currentStep >= 3 ? '#ea580c' : '#6b7280'
          }}>
            Productos Favoritos
          </span>
        </div>
      </div>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit}>
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          border: '2px solid #fed7aa',
          minHeight: '500px'
        }}>
          
          {/* PASO 1: INFORMACIÓN PERSONAL */}
          {currentStep === 1 && (
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '2px solid #fed7aa'
              }}>
                <User size={28} color="#ea580c" />
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ea580c', margin: 0 }}>
                  Información Personal
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={userData.nombre}
                    onChange={handleUserDataChange}
                    required
                    placeholder="Tu nombre"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #fed7aa',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>
                    Apellido *
                  </label>
                  <input
                    type="text"
                    name="apellido"
                    value={userData.apellido}
                    onChange={handleUserDataChange}
                    required
                    placeholder="Tu apellido"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #fed7aa',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleUserDataChange}
                  required
                  placeholder="email@example.com"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #fed7aa',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>
                    Contraseña *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleUserDataChange}
                    required
                    placeholder="Mínimo 6 caracteres"
                    minLength="6"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #fed7aa',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>
                    Confirmar Contraseña *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleUserDataChange}
                    required
                    placeholder="Repite tu contraseña"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #fed7aa',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={userData.telefono}
                    onChange={handleUserDataChange}
                    required
                    placeholder="+56 9 1234 5678"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #fed7aa',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>
                    Fecha de Nacimiento *
                  </label>
                  <input
                    type="date"
                    name="fechaNacimiento"
                    value={userData.fechaNacimiento}
                    onChange={handleUserDataChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #fed7aa',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* PASO 2: INFORMACIÓN DE LA MASCOTA */}
          {currentStep === 2 && (
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '2px solid #fed7aa'
              }}>
                <Dog size={28} color="#ea580c" />
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ea580c', margin: 0 }}>
                  Información de tu Mascota
                </h3>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>
                  Nombre de tu mascota *
                </label>
                <input
                  type="text"
                  name="nombreMascota"
                  value={petData.nombreMascota}
                  onChange={handlePetDataChange}
                  required
                  placeholder="Nombre de tu peludo"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #fed7aa',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>
                    Tipo *
                  </label>
                  <select
                    name="tipo"
                    value={petData.tipo}
                    onChange={handlePetDataChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #fed7aa',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      backgroundColor: 'white'
                    }}
                  >
                    <option value="perro">🐕 Perro</option>
                    <option value="gato">🐈 Gato</option>
                    <option value="otro">🐾 Otro</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>
                    Raza *
                  </label>
                  <input
                    type="text"
                    name="raza"
                    value={petData.raza}
                    onChange={handlePetDataChange}
                    required
                    placeholder="Labrador, Mestizo, etc."
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #fed7aa',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>
                    Edad (años) *
                  </label>
                  <input
                    type="number"
                    name="edad"
                    value={petData.edad}
                    onChange={handlePetDataChange}
                    required
                    min="0"
                    max="30"
                    placeholder="5"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #fed7aa',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>
                    Peso (kg) *
                  </label>
                  <input
                    type="number"
                    name="peso"
                    value={petData.peso}
                    onChange={handlePetDataChange}
                    required
                    min="0"
                    step="0.1"
                    placeholder="15.5"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #fed7aa',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>
                    Tamaño *
                  </label>
                  <select
                    name="tamaño"
                    value={petData.tamaño}
                    onChange={handlePetDataChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #fed7aa',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      backgroundColor: 'white'
                    }}
                  >
                    <option value="">Selecciona...</option>
                    <option value="pequeño">Pequeño</option>
                    <option value="mediano">Mediano</option>
                    <option value="grande">Grande</option>
                  </select>
                </div>
              </div>

              <div style={{
                backgroundColor: '#d1fae5',
                padding: '16px',
                borderRadius: '8px',
                marginTop: '24px'
              }}>
                <p style={{ fontSize: '14px', color: '#166534', margin: 0 }}>
                  💡 <strong>Tip:</strong> Esta información nos ayudará a recomendarte los productos más adecuados para tu mascota.
                </p>
              </div>
            </div>
          )}

          {/* PASO 3: PRODUCTOS FAVORITOS */}
          {currentStep === 3 && (
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '2px solid #fed7aa'
              }}>
                <Heart size={28} color="#ea580c" />
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ea580c', margin: 0 }}>
                  Productos de tu Interés
                </h3>
              </div>

              {/* Selección de Categorías */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '12px', fontSize: '16px' }}>
                  Selecciona las categorías que te interesan:
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                  gap: '12px'
                }}>
                  {categorias.map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => toggleCategoria(cat.id)}
                      style={{
                        padding: '12px',
                        border: `2px solid ${categoriasSeleccionadas.includes(cat.id) ? '#ea580c' : '#fed7aa'}`,
                        borderRadius: '8px',
                        backgroundColor: categoriasSeleccionadas.includes(cat.id) ? '#ffedd5' : 'white',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: categoriasSeleccionadas.includes(cat.id) ? 'bold' : 'normal',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}
                    >
                      <span style={{ fontSize: '20px' }}>{cat.emoji}</span>
                      <span>{cat.nombre}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Productos según categorías seleccionadas */}
              {categoriasSeleccionadas.length > 0 && (
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '12px', fontSize: '16px' }}>
                    Marca tus productos favoritos:
                  </label>
                  
                  <div style={{
                    maxHeight: '400px',
                    overflowY: 'auto',
                    border: '2px solid #fed7aa',
                    borderRadius: '8px',
                    padding: '16px',
                    backgroundColor: '#fffbeb'
                  }}>
                    {productosFiltered.length === 0 ? (
                      <p style={{ textAlign: 'center', color: '#6b7280' }}>
                        No hay productos en las categorías seleccionadas
                      </p>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {productosFiltered.map(producto => (
                          <div
                            key={producto.id}
                            onClick={() => toggleProductoFavorito(producto.id)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              padding: '12px',
                              backgroundColor: productosFavoritos.includes(producto.id) ? '#ffedd5' : 'white',
                              border: `2px solid ${productosFavoritos.includes(producto.id) ? '#ea580c' : '#fed7aa'}`,
                              borderRadius: '8px',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                          >
                            <div style={{ fontSize: '32px' }}>{producto.imagen}</div>
                            <div style={{ flex: 1 }}>
                              <h4 style={{ margin: '0 0 4px 0', fontWeight: 'bold', fontSize: '14px' }}>
                                {producto.nombre}
                              </h4>
                              <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>
                                {producto.descripcion}
                              </p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <p style={{ margin: '0 0 4px 0', fontWeight: 'bold', color: '#ea580c', fontSize: '16px' }}>
                                ${producto.precio.toLocaleString()}
                              </p>
                              {productosFavoritos.includes(producto.id) && (
                                <span style={{ fontSize: '20px' }}>❤️</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {productosFavoritos.length > 0 && (
                    <div style={{
                      marginTop: '16px',
                      padding: '12px',
                      backgroundColor: '#d1fae5',
                      borderRadius: '8px'
                    }}>
                      <p style={{ margin: 0, fontSize: '14px', color: '#166534', fontWeight: 'bold' }}>
                        ✓ Has seleccionado {productosFavoritos.length} producto{productosFavoritos.length !== 1 ? 's' : ''} favorito{productosFavoritos.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Notificaciones */}
              <div style={{
                marginTop: '24px',
                padding: '16px',
                backgroundColor: 'white',
                border: '2px solid #fed7aa',
                borderRadius: '8px'
              }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  <input
                    type="checkbox"
                    checked={notificarOfertas}
                    onChange={(e) => setNotificarOfertas(e.target.checked)}
                    style={{
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer'
                    }}
                  />
                  <span>
                    Notificarme cuando haya ofertas en mis productos favoritos
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* BOTONES DE NAVEGACIÓN */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '24px',
          gap: '16px'
        }}>
          {currentStep > 1 && (
            <Button type="button" onClick={prevStep} variant="secondary" icon={ArrowLeft}>
              Anterior
            </Button>
          )}
          
          <div style={{ flex: 1 }} />

          {currentStep < 3 ? (
            <Button type="button" onClick={nextStep} variant="primary" icon={ArrowRight}>
              Siguiente
            </Button>
          ) : (
            <Button type="submit" variant="success" icon={CheckCircle}>
              Completar Registro
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;