import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Shield, HelpCircle } from 'lucide-react';
import Button from '../components/atoms/Button';
import CustomSelect from '../components/atoms/CustomSelect';


function ContactoPage() {
  console.log('ContactoPage montada');

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    servicio: '',
    presupuesto: '',
    asunto: '',
    mensaje: ''
  });

  const [charCount, setCharCount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'mensaje') {
      setCharCount(value.length);
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        alert('¡Mensaje enviado correctamente! 🐕 Te contactaremos pronto.');
        setFormData({
          nombre: '',
          email: '',
          servicio: '',
          presupuesto: '',
          asunto: '',
          mensaje: ''
        });
        setCharCount(0);
      } else {
        alert('Error al enviar el mensaje: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión. Verifica que el servidor esté corriendo en el puerto 5000.');
    }
  };

  // Opciones para los selects
  const servicioOptions = [
    { value: '', label: 'Selecciona un servicio...' },
    { value: 'alimento', label: 'Consulta sobre Alimentos' },
    { value: 'salud', label: 'Consulta Veterinaria' },
    { value: 'entrega', label: 'Información de Entregas' },
    { value: 'otro', label: 'Otro' }
  ];

  const presupuestoOptions = [
    { value: '', label: 'Selecciona tu presupuesto...' },
    { value: '10-50', label: 'Compra pequeña ($10.000 - $50.000)' },
    { value: '50-100', label: 'Compra mediana ($50.000 - $100.000)' },
    { value: '100-200', label: 'Compra grande ($100.000 - $200.000)' },
    { value: '200+', label: 'Pedido mayorista ($200.000+)' }
  ];

  return (
    <div>
      {/* HEADER */}
      <section style={{
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
          ¡Trabajemos Juntos!
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#6b7280'
        }}>
          Encuentra todo lo que tu perrito necesita y hazlo feliz 🐾
        </p>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <section>
        <h2 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#ea580c',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          Hablemos
        </h2>

        <div
          className="contact-form-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            marginBottom: '40px'
          }}
        >
          {/* COLUMNA IZQUIERDA: INFORMACIÓN DE CONTACTO */}
          <div>
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '12px',
                color: '#ea580c'
              }}>
                ¿Buscas juguetes, accesorios o snacks para tu mejor amigo?
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '8px' }}>
                Nos encanta ayudarte a consentir a tu peludo con productos de calidad.
              </p>
              <p style={{ color: '#16a34a', fontWeight: 'bold' }}>
                Tendrás una respuesta en menos de 24 horas
              </p>
            </div>

            {/* Tarjetas de contacto */}
            <div
              className="contact-info-cards"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}
            >
              {/* Email */}
              <div style={{
                display: 'flex',
                gap: '16px',
                padding: '16px',
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '2px solid #fed7aa'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#ea580c',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Mail size={24} color="white" />
                </div>
                <div>
                  <h4 style={{ fontWeight: 'bold', marginBottom: '4px' }}>Email</h4>
                  <p style={{ color: '#6b7280', fontSize: '14px' }}>
                    contacto@puppychop.com
                  </p>
                </div>
              </div>

              {/* Teléfono */}
              <div style={{
                display: 'flex',
                gap: '16px',
                padding: '16px',
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '2px solid #fed7aa'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#ea580c',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Phone size={24} color="white" />
                </div>
                <div>
                  <h4 style={{ fontWeight: 'bold', marginBottom: '4px' }}>Teléfono</h4>
                  <p style={{ color: '#6b7280', fontSize: '14px' }}>
                    +56 9 1234 5678
                  </p>
                </div>
              </div>

              {/* Ubicación */}
              <div style={{
                display: 'flex',
                gap: '16px',
                padding: '16px',
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '2px solid #fed7aa'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#ea580c',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <MapPin size={24} color="white" />
                </div>
                <div>
                  <h4 style={{ fontWeight: 'bold', marginBottom: '4px' }}>Ubicación</h4>
                  <p style={{ color: '#6b7280', fontSize: '14px' }}>
                    San Bernardo, Santiago<br />Chile
                  </p>
                  <a
                    href="https://maps.google.com/?q=San+Bernardo,+Santiago,+Chile"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#ea580c',
                      fontSize: '14px',
                      textDecoration: 'underline'
                    }}
                  >
                    Ver en Google Maps
                  </a>
                </div>
              </div>

              {/* Horario */}
              <div style={{
                display: 'flex',
                gap: '16px',
                padding: '16px',
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '2px solid #fed7aa'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#ea580c',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Clock size={24} color="white" />
                </div>
                <div>
                  <h4 style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                    Horario de respuesta
                  </h4>
                  <p style={{ color: '#6b7280', fontSize: '14px' }}>
                    Lun - Vie: 9:00 - 18:00<br />
                    Sáb: 10:00 - 14:00
                  </p>
                </div>
              </div>
            </div>

            {/* Estadísticas */}
            <div
              className="contact-stats"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px',
                marginTop: '30px'
              }}
            >
              <div style={{
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '8px',
                textAlign: 'center',
                border: '2px solid #fed7aa'
              }}>
                <div style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#ea580c',
                  marginBottom: '4px'
                }}>
                  150+
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  Clientes Satisfechos
                </div>
              </div>
              <div style={{
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '8px',
                textAlign: 'center',
                border: '2px solid #fed7aa'
              }}>
                <div style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#ea580c',
                  marginBottom: '4px'
                }}>
                  99%
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  Tasa de Satisfacción
                </div>
              </div>
              <div style={{
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '8px',
                textAlign: 'center',
                border: '2px solid #fed7aa'
              }}>
                <div style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#ea580c',
                  marginBottom: '4px'
                }}>
                  24h
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  Tiempo de Respuesta
                </div>
              </div>
              <div style={{
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '8px',
                textAlign: 'center',
                border: '2px solid #fed7aa'
              }}>
                <div style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#ea580c',
                  marginBottom: '4px'
                }}>
                  5 ★
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  Calificación Promedio
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: FORMULARIO */}
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            border: '2px solid #fed7aa'
          }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#ea580c',
                marginBottom: '8px'
              }}>
                Envíanos un mensaje
              </h2>
              <p style={{ color: '#6b7280', fontSize: '14px' }}>
                Completa el formulario y te contactaremos pronto
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Nombre y Email */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#1f2937',
                    fontSize: '14px'
                  }}>
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Tu nombre completo"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #fed7aa',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      backgroundColor: 'white',
                      minHeight: '44px'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#1f2937',
                    fontSize: '14px'
                  }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="email@example.com"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #fed7aa',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      backgroundColor: 'white',
                      minHeight: '44px'
                    }}
                  />
                </div>
              </div>

              {/* Servicio de interés */}
              <div>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#1f2937',
                  fontSize: '14px'
                }}>
                  Servicio de interés *
                </label>
                <CustomSelect
                  value={formData.servicio}
                  onChange={(value) => handleSelectChange('servicio', value)}
                  options={servicioOptions}
                  placeholder="Selecciona un servicio..."
                />
              </div>

              {/* Rango de presupuesto */}
              <div>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#1f2937',
                  fontSize: '14px'
                }}>
                  Rango de presupuesto *
                </label>
                <CustomSelect
                  value={formData.presupuesto}
                  onChange={(value) => handleSelectChange('presupuesto', value)}
                  options={presupuestoOptions}
                  placeholder="Selecciona tu presupuesto..."
                />
              </div>

              {/* Asunto */}
              <div>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#1f2937',
                  fontSize: '14px'
                }}>
                  Asunto *
                </label>
                <input
                  type="text"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  required
                  placeholder="Motivo del contacto"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #fed7aa',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    backgroundColor: 'white'
                  }}
                />
              </div>

              {/* Mensaje */}
              <div>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#1f2937',
                  fontSize: '14px'
                }}>
                  Mensaje *
                </label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Escribe tu mensaje aquí..."
                  maxLength="500"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #fed7aa',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    resize: 'vertical',
                    backgroundColor: 'white'
                  }}
                />
                <small style={{ color: '#6b7280', fontSize: '12px' }}>
                  {charCount}/500 caracteres
                </small>
              </div>

              {/* Botón enviar */}
              <Button type="submit" variant="primary" icon={Send}>
                Enviar Mensaje
              </Button>

              {/* Mensaje de seguridad */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px',
                backgroundColor: '#d1fae5',
                borderRadius: '8px'
              }}>
                <Shield size={16} color="#16a34a" />
                <small style={{ color: '#166534', fontSize: '12px' }}>
                  Tus datos están protegidos y nunca serán compartidos con terceros.
                </small>
              </div>
            </form>
          </div>
        </div>
      </section>

{/* PREGUNTAS FRECUENTES */}
<section style={{
  marginTop: '60px',
  padding: '40px 20px',
  backgroundColor: '#ffedd5',
  borderRadius: '8px'
}}>
  <h2 style={{
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#ea580c',
    marginBottom: '30px',
    textAlign: 'center'
  }}>
    Preguntas Frecuentes
  </h2>
  <div
    className="faq-grid"
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '24px'
    }}
  >
    <div 
      style={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '2px solid #fed7aa',
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
      <h4 style={{
        fontWeight: 'bold',
        marginBottom: '8px',
        color: '#ea580c',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <Clock size={20} />
        ¿Cuánto demora el envío?
      </h4>
      <p style={{ color: '#6b7280', fontSize: '14px' }}>
        Entregas en 24-48 horas en Santiago. Regiones 3-5 días hábiles.
      </p>
    </div>

    <div 
      style={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '2px solid #fed7aa',
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
      <h4 style={{
        fontWeight: 'bold',
        marginBottom: '8px',
        color: '#ea580c',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <Shield size={20} />
        ¿Los productos tienen garantía?
      </h4>
      <p style={{ color: '#6b7280', fontSize: '14px' }}>
        Sí, todos nuestros productos cuentan con garantía de satisfacción.
      </p>
    </div>

    <div 
      style={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '2px solid #fed7aa',
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
      <h4 style={{
        fontWeight: 'bold',
        marginBottom: '8px',
        color: '#ea580c',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <HelpCircle size={20} />
        ¿Puedo cambiar mi pedido?
      </h4>
      <p style={{ color: '#6b7280', fontSize: '14px' }}>
        Sí, tienes 30 días para cambios o devoluciones sin costo. Si se trata de un alimento este debe estar sellado.
      </p>
    </div>

    <div 
      style={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '2px solid #fed7aa',
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
      <h4 style={{
        fontWeight: 'bold',
        marginBottom: '8px',
        color: '#ea580c',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <Mail size={20} />
        ¿Cómo hago seguimiento?
      </h4>
      <p style={{ color: '#6b7280', fontSize: '14px' }}>
        Te enviamos un código de seguimiento por email al despachar tu pedido.
      </p>
    </div>
  </div>
</section>
    </div>
  );
}

export default ContactoPage;