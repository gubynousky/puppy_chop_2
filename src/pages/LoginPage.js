import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, AlertCircle, User } from 'lucide-react';
import Button from '../components/atoms/Button';
import userService from '../services/userService';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error al escribir
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validaciones básicas
    if (!formData.email.trim()) {
      setError('Por favor ingresa tu email');
      setLoading(false);
      return;
    }

    if (!formData.password.trim()) {
      setError('Por favor ingresa tu contraseña');
      setLoading(false);
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor ingresa un email válido');
      setLoading(false);
      return;
    }

    try {
      console.log('🔐 Intentando login con:', formData.email);

      const response = await userService.login(formData.email, formData.password);
      
      console.log('✅ Login exitoso:', response);

      // Guardar usuario en localStorage
      localStorage.setItem('user', JSON.stringify(response.usuario));
      
      // Mostrar mensaje de éxito
      alert(`¡Bienvenido ${response.usuario.nombre}!`);

      // Redirigir a página principal
      navigate('/');

    } catch (err) {
      console.error('❌ Error en login:', err);
      
      if (err.error) {
        setError(err.error);
      } else if (err === 'Credenciales inválidas') {
        setError('Email o contraseña incorrectos');
      } else {
        setError('Error al iniciar sesión. Intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '450px',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        {/* HEADER */}
        <div style={{
          backgroundColor: '#ea580c',
          padding: '40px 30px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: 'white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}>
            <User size={40} color="#ea580c" />
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: 'white',
            margin: '0 0 8px 0'
          }}>
            Iniciar Sesión
          </h1>
          <p style={{
            fontSize: '16px',
            color: 'rgba(255, 255, 255, 0.9)',
            margin: 0
          }}>
            Bienvenido de vuelta a PuppyChop
          </p>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} style={{ padding: '40px 30px' }}>
          {/* MENSAJE DE ERROR */}
          {error && (
            <div style={{
              backgroundColor: '#fee2e2',
              border: '2px solid #ef4444',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <AlertCircle size={24} color="#dc2626" />
              <p style={{
                color: '#991b1b',
                margin: 0,
                fontSize: '14px',
                fontWeight: '500'
              }}>
                {error}
              </p>
            </div>
          )}

          {/* CAMPO EMAIL */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px'
            }}>
              <Mail size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@correo.cl"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '16px',
                border: error && !formData.email ? '2px solid #ef4444' : '2px solid #fed7aa',
                borderRadius: '8px',
                outline: 'none',
                transition: 'all 0.3s',
                backgroundColor: loading ? '#f3f4f6' : 'white',
                cursor: loading ? 'not-allowed' : 'text'
              }}
              onFocus={(e) => {
                if (!error) e.target.style.borderColor = '#ea580c';
              }}
              onBlur={(e) => {
                if (!error) e.target.style.borderColor = '#fed7aa';
              }}
            />
          </div>

          {/* CAMPO CONTRASEÑA */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px'
            }}>
              <Lock size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '16px',
                border: error && !formData.password ? '2px solid #ef4444' : '2px solid #fed7aa',
                borderRadius: '8px',
                outline: 'none',
                transition: 'all 0.3s',
                backgroundColor: loading ? '#f3f4f6' : 'white',
                cursor: loading ? 'not-allowed' : 'text'
              }}
              onFocus={(e) => {
                if (!error) e.target.style.borderColor = '#ea580c';
              }}
              onBlur={(e) => {
                if (!error) e.target.style.borderColor = '#fed7aa';
              }}
            />
          </div>

          {/* BOTÓN INICIAR SESIÓN */}
          <Button
            type="submit"
            variant="primary"
            icon={LogIn}
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '16px',
              fontWeight: 'bold',
              marginBottom: '20px'
            }}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>

          {/* SEPARADOR */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <div style={{
              flex: 1,
              height: '1px',
              backgroundColor: '#e5e7eb'
            }}></div>
            <span style={{
              padding: '0 12px',
              fontSize: '14px',
              color: '#6b7280'
            }}>
              o
            </span>
            <div style={{
              flex: 1,
              height: '1px',
              backgroundColor: '#e5e7eb'
            }}></div>
          </div>

          {/* BOTÓN REGISTRARSE */}
          <Button
            type="button"
            onClick={() => navigate('/register')}
            variant="secondary"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Crear nueva cuenta
          </Button>
        </form>

        {/* FOOTER */}
        <div style={{
          backgroundColor: '#f9fafb',
          padding: '20px 30px',
          textAlign: 'center',
          borderTop: '1px solid #e5e7eb'
        }}>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            margin: 0
          }}>
            ¿Problemas para iniciar sesión?{' '}
            <a
              href="mailto:puppychop@duocuc.cl"
              style={{
                color: '#ea580c',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              Contáctanos
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;