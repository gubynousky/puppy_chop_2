import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Shield } from 'lucide-react';
import Button from '../components/atoms/Button';

function ContactoPage() {
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
    setFormData({ ...formData, [name]: value });
    if (name === 'mensaje') setCharCount(value.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        alert('¡Mensaje enviado correctamente! 🐕');
        setFormData({ nombre: '', email: '', servicio: '', presupuesto: '', asunto: '', mensaje: '' });
        setCharCount(0);
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      alert('Error de conexión. Verifica que el servidor esté corriendo.');
    }
  };

  return (
    <div>
      <section style={{
        textAlign: 'center',
        padding: '40px 20px',
        backgroundColor: '#fed7aa',
        borderRadius: '8px',
        marginBottom: '40px'
      }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#ea580c', marginBottom: '12px' }}>
          ¡Hablemos!
        </h2>
        <p style={{ fontSize: '18px', color: '#6b7280' }}>
          Comentanos tus temas de interés 🐾
        </p>
      </section>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '40px'
      }}>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#ea580c' }}>
            ¿Tienes una consulta?
          </h3>
          <p style={{ color: '#16a34a', fontWeight: 'bold', marginBottom: '20px' }}>
            Respuesta en menos de 24 horas
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              display: 'flex',
              gap: '16px',
              padding: '16px',
              backgroundColor: '#ffedd5',
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
                <p style={{ color: '#6b7280', fontSize: '14px' }}>contacto@puppychop.com</p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '16px',
              padding: '16px',
              backgroundColor: '#ffedd5',
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
                <p style={{ color: '#6b7280', fontSize: '14px' }}>+56 9 1234 5678</p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '16px',
              padding: '16px',
              backgroundColor: '#ffedd5',
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
                <p style={{ color: '#6b7280', fontSize: '14px' }}>San Bernardo, Santiago, Chile</p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '16px',
              padding: '16px',
              backgroundColor: '#ffedd5',
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
                <h4 style={{ fontWeight: 'bold', marginBottom: '4px' }}>Horario</h4>
                <p style={{ color: '#6b7280', fontSize: '14px' }}>Lun - Vie: 9:00 - 18:00</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          border: '2px solid #fed7aa'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ea580c', marginBottom: '8px' }}>
            Envíanos un mensaje
          </h2>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>
            Completa el formulario y te contactaremos pronto
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#1f2937' }}>
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
                    padding: '10px',
                    border: '2px solid #fed7aa',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#1f2937' }}>
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
                    padding: '10px',
                    border: '2px solid #fed7aa',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#1f2937' }}>
                Servicio de interés *
              </label>
              <select
                name="servicio"
                value={formData.servicio}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px solid #fed7aa',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              >
                <option value="">Selecciona...</option>
                <option value="alimento">Consulta sobre Alimentos</option>
                <option value="salud">Consulta Veterinaria</option>
                <option value="entrega">Información de Entregas</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#1f2937' }}>
                Presupuesto *
              </label>
              <select
                name="presupuesto"
                value={formData.presupuesto}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px solid #fed7aa',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              >
                <option value="">Selecciona...</option>
                <option value="10-50">$10.000 - $50.000</option>
                <option value="50-100">$50.000 - $100.000</option>
                <option value="100-200">$100.000 - $200.000</option>
                <option value="200+">$200.000+</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#1f2937' }}>
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
                  padding: '10px',
                  border: '2px solid #fed7aa',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
}}
/>
</div>
        <div>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#1f2937' }}>
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
              padding: '10px',
              border: '2px solid #fed7aa',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              resize: 'vertical'
            }}
          />
          <small style={{ color: '#6b7280', fontSize: '12px' }}>
            {charCount}/500 caracteres
          </small>
        </div>

        <Button type="submit" variant="primary" icon={Send}>
          Enviar Mensaje
        </Button>

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
            Tus datos están protegidos y nunca serán compartidos.
          </small>
        </div>
      </form>
    </div>
  </div>
</div>
);
}
export default ContactoPage;