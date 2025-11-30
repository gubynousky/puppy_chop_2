import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { User, Dog, Heart, ArrowRight, ArrowLeft, CheckCircle, Users } from 'lucide-react';
import Button from '../components/atoms/Button';
import { categorias } from '../data/productos';
import authService from '../services/authService';
import petProfileService from '../services/petProfileService';
import favoritoService from '../services/favoritoService';
import productoService from '../services/productoService';

function RegisterPage() {
  console.log('RegisterPage montada');
  const navigate = useNavigate();

  // Estado del formulario dividido en 3 pasos
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
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

  // Estados para productos del backend
  const [productosBackend, setProductosBackend] = useState([]);
  const [productosFiltered, setProductosFiltered] = useState([]);

  // Cargar productos del backend al montar
  useEffect(() => {
    cargarProductosDelBackend();
  }, []);

  // Filtrar productos cuando cambian las categorías
  useEffect(() => {
    if (productosBackend.length > 0) {
      const filtrados = productosBackend.filter(p => 
        categoriasSeleccionadas.includes(p.categoria)
      );
      setProductosFiltered(filtrados);
    }
  }, [categoriasSeleccionadas, productosBackend]);

  // Función para cargar productos desde el backend
  const cargarProductosDelBackend = async () => {
    try {
      console.log('🔍 Cargando productos desde el backend...');
      const productos = await productoService.obtenerProductos();
      console.log('✅ Productos cargados:', productos);
      setProductosBackend(productos);
    } catch (err) {
      console.error('❌ Error al cargar productos:', err);
      setError('Error al cargar productos del servidor');
    }
  };

  // Handlers para Paso 1
  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
    setError('');
  };

  // Handlers para Paso 2
  const handlePetDataChange = (e) => {
    const { name, value } = e.target;
    setPetData({
      ...petData,
      [name]: value
    });
    setError('');
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

  // Validaciones
  const validarPaso1 = () => {
    if (!userData.nombre || !userData.apellido || !userData.email || 
        !userData.password || !userData.telefono || !userData.fechaNacimiento) {
      setError('Todos los campos son obligatorios');
      return false;
    }

    if (userData.password !== userData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }

    if (userData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    return true;
  };

  const validarPaso2 = () => {
    if (!petData.nombreMascota || !petData.raza || !petData.edad || 
        !petData.peso || !petData.tamaño) {
      setError('Todos los campos de la mascota son obligatorios');
      return false;
    }

    if (petData.edad < 0 || petData.edad > 30) {
      setError('La edad debe estar entre 0 y 30 años');
      return false;
    }

    if (petData.peso <= 0) {
      setError('El peso debe ser mayor a 0');
      return false;
    }

    return true;
  };

  // CORREGIDO: Navegación entre pasos - previene submit
  const nextStep = (e) => {
    if (e) e.preventDefault();
    
    setError('');
    
    if (currentStep === 1 && !validarPaso1()) {
      return;
    }
    
    if (currentStep === 2 && !validarPaso2()) {
      return;
    }
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = (e) => {
    if (e) e.preventDefault();
    setError('');
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // CORREGIDO: Submit final - SOLO se ejecuta en paso 3
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('📍 handleSubmit llamado en paso:', currentStep);
    
    // SI NO ESTAMOS EN PASO 3, SOLO AVANZAR AL SIGUIENTE PASO
    if (currentStep !== 3) {
      console.log('⏭️ No estamos en paso 3, avanzando al siguiente paso...');
      nextStep(e);
      return;
    }
    
    console.log('✅ Estamos en paso 3, procediendo con el registro...');
    setLoading(true);
    setError('');

    try {
      // 1. Registrar usuario
      const userPayload = {
        nombre: userData.nombre.trim(),
        apellido: userData.apellido.trim(),
        email: userData.email.trim().toLowerCase(),
        password: userData.password,
        telefono: userData.telefono.trim(),
        fechaNacimiento: userData.fechaNacimiento,
      };

      console.log('=== PASO 1: REGISTRANDO USUARIO ===');
      console.log('Payload usuario:', JSON.stringify(userPayload, null, 2));
      
      const userResponse = await authService.registrarUsuario(userPayload);
      console.log('Respuesta del servidor:', userResponse);
      
      if (!userResponse || !userResponse.usuario || !userResponse.usuario.id) {
        throw new Error('Respuesta inválida del servidor al registrar usuario');
      }
      
      const userId = userResponse.usuario.id;
      console.log('✓ Usuario creado con ID:', userId);

      // 2. Crear perfil de mascota
      const petPayload = {
        nombreMascota: petData.nombreMascota.trim(),
        tipo: petData.tipo,
        raza: petData.raza.trim() || 'Sin especificar',
        edad: parseInt(petData.edad, 10),
        peso: parseFloat(petData.peso),
        tamaño: petData.tamaño,
      };

      console.log('=== PASO 2: CREANDO PERFIL MASCOTA ===');
      console.log('Payload mascota:', JSON.stringify(petPayload, null, 2));
      
      const petResponse = await petProfileService.crearPerfilMascota(userId, petPayload);
      console.log('Respuesta mascota:', petResponse);
      console.log('✓ Perfil de mascota creado');

      // 3. Agregar productos favoritos (solo si hay favoritos seleccionados)
      if (productosFavoritos.length > 0) {
        console.log('=== PASO 3: AGREGANDO FAVORITOS ===');
        console.log('Total de favoritos a agregar:', productosFavoritos.length);
        console.log('IDs de favoritos:', productosFavoritos);
        console.log('Productos en backend:', productosBackend.length);
        
        for (const productoId of productosFavoritos) {
          const producto = productosBackend.find(p => p.id === productoId);
          if (producto) {
            console.log(`📦 Agregando favorito: ${producto.nombre} (ID: ${productoId})`);
            try {
              await favoritoService.agregarFavorito(
                userId,
                productoId,
                producto.categoria,
                notificarOfertas
              );
              console.log(`✅ Favorito agregado: ${producto.nombre}`);
            } catch (favError) {
              console.error(`❌ Error al agregar favorito ${productoId}:`, favError);
              // Continuar con los demás favoritos aunque uno falle
            }
          } else {
            console.warn(`⚠️ Producto ${productoId} no encontrado en productosBackend`);
          }
        }
        console.log('✓ Favoritos procesados');
      } else {
        console.log('=== PASO 3: SIN FAVORITOS SELECCIONADOS ===');
      }

      // 4. Login automático
      console.log('=== PASO 4: LOGIN AUTOMÁTICO ===');
      await authService.login(userData.email.trim().toLowerCase(), userData.password);
      console.log('✓ Login exitoso');

      // 5. Mostrar mensaje de éxito
      console.log('=== REGISTRO COMPLETADO EXITOSAMENTE ===');
      alert('¡Registro exitoso! Bienvenido a PuppyChop 🐕');

      // 6. Redirigir
      navigate('/');

    } catch (err) {
      console.error('=== ERROR EN EL REGISTRO ===');
      console.error('Error completo:', err);
      console.error('Error response:', err.response);
      console.error('Error data:', err.response?.data);
      
      // Mostrar error más específico
      let errorMessage = 'Error al registrar usuario. Por favor intenta de nuevo.';
      
      if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.error) {
        errorMessage = err.error;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
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

      {/* MENSAJE DE ERROR */}
      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          border: '2px solid #ef4444',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px',
          color: '#991b1b',
          fontWeight: 'bold'
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* INDICADOR DE CARGA DE PRODUCTOS */}
      {productosBackend.length === 0 && currentStep === 3 && (
        <div style={{
          backgroundColor: '#fef3c7',
          border: '2px solid #f59e0b',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px',
          color: '#92400e',
          fontWeight: 'bold'
        }}>
          ⏳ Cargando productos desde el servidor...
        </div>
      )}

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

          {/* PASO 3: PRODUCTOS FAVORITOS - CON PRODUCTOS DEL BACKEND */}
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

              {/* Productos según categorías seleccionadas - DEL BACKEND */}
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
                            {/* Emoji por categoría */}
                            <div style={{ fontSize: '32px' }}>
                              {producto.categoria === 'alimento' && '🍖'}
                              {producto.categoria === 'snacks' && '🦴'}
                              {producto.categoria === 'juguetes' && '🎾'}
                              {producto.categoria === 'salud' && '💊'}
                              {producto.categoria === 'higiene' && '🧴'}
                              {producto.categoria === 'accesorios' && '🎒'}
                            </div>
                            <div style={{ flex: 1 }}>
                              <h4 style={{ margin: '0 0 4px 0', fontWeight: 'bold', fontSize: '14px' }}>
                                {producto.nombre}
                              </h4>
                              <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>
                                {producto.descripcion}
                              </p>
                              <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#9ca3af' }}>
                                Stock: {producto.stock}
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

        {/* BOTONES DE NAVEGACIÓN - CORREGIDOS */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '24px',
          gap: '16px'
        }}>
          {currentStep > 1 && (
            <Button 
              type="button" 
              onClick={prevStep} 
              variant="secondary" 
              icon={ArrowLeft}
              disabled={loading}
            >
              Anterior
            </Button>
          )}
          
          <div style={{ flex: 1 }} />

          {currentStep < 3 ? (
            <Button 
              type="button" 
              onClick={nextStep} 
              variant="primary" 
              icon={ArrowRight}
            >
              Siguiente
            </Button>
          ) : (
            <Button 
              type="submit" 
              variant="success" 
              icon={CheckCircle}
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Completar Registro'}
            </Button>
          )}
        </div>
      </form>

      {/* BOTÓN PARA VER USUARIOS REGISTRADOS */}
<div style={{
  marginTop: '30px',
  textAlign: 'center',
  paddingTop: '20px',
  borderTop: '2px solid #fed7aa'
}}>
  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '10px' }}>
    ¿Quieres ver los usuarios registrados?
  </p>
  <Button
    type="button"
    onClick={() => navigate('/usuarios')}
    variant="secondary"
    icon={Users}
  >
    Ver Usuarios Registrados
  </Button>
</div>
    </div>
  );
}

export default RegisterPage;