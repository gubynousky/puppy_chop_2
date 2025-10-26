// src/__tests__/puppychop.spec.jsx
// VERSIÓN ORIGINAL - JASMINE (para Karma)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CarritoPage from '../pages/CarritoPage';
import CatalogoPage from '../pages/CatalogoPage';
import ContactoPage from '../pages/ContactoPage';

describe('PuppyChop - Pruebas Unitarias Completas', () => {
  let container;
  let root;

  const fillInput = (input, value) => {
    // Simular escritura en React
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value'
    ).set;
    nativeInputValueSetter.call(input, value);

    // Disparar eventos de React
    const inputEvent = new Event('input', { bubbles: true });
    input.dispatchEvent(inputEvent);
    
    const changeEvent = new Event('change', { bubbles: true });
    input.dispatchEvent(changeEvent);
  };

  const submitForm = () => {
    const form = container.querySelector('form');
    if (form) {
      const event = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(event);
    }
  };

  afterEach(() => {
    if (root) {
      root.unmount();
    }
    if (container && document.body.contains(container)) {
      document.body.removeChild(container);
      container = null;
    }
  });

  // ========================================
  // TEST 1: HOMEPAGE - Título
  // ========================================
  describe('HomePage - Renderizado inicial', () => {
    beforeEach((done) => {
      container = document.createElement('div');
      document.body.appendChild(container);
      root = ReactDOM.createRoot(container);
      root.render(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      );
      setTimeout(done, 300);
    });

    it('debe renderizar el título "Bienvenido a PuppyChop"', () => {
      const title = container.querySelector('h1');
      expect(title).toBeTruthy();
      // toBe() - Compara con igualdad estricta (===)
      expect(title.textContent).toBe('Bienvenido a PuppyChop');
    });
  });

  // ========================================
  // TEST 2: HOMEPAGE - Botones
  // ========================================
  describe('HomePage - Botones de navegación', () => {
    beforeEach((done) => {
      container = document.createElement('div');
      document.body.appendChild(container);
      root = ReactDOM.createRoot(container);
      root.render(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      );
      setTimeout(done, 300);
    });

    it('debe renderizar 3 botones de navegación', () => {
      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBe(3);
      expect(buttons[0].textContent).toContain('Ver Catálogo');
      expect(buttons[1].textContent).toContain('Ver Carrito');
      expect(buttons[2].textContent).toContain('Contáctanos');
    });
  });

  // ========================================
  // TEST 3: CARRITOPAGE - Mensaje vacío
  // ========================================
  describe('CarritoPage - Estado vacío', () => {
    beforeEach((done) => {
      container = document.createElement('div');
      document.body.appendChild(container);
      root = ReactDOM.createRoot(container);
      root.render(
        <BrowserRouter>
          <CarritoPage 
            carrito={[]} 
            onIncrement={() => {}}
            onDecrement={() => {}}
            onRemove={() => {}}
            onVaciar={() => {}}
          />
        </BrowserRouter>
      );
      setTimeout(done, 300);
    });

    it('debe mostrar mensaje de carrito vacío cuando no hay productos', () => {
      const message = container.querySelector('h2');
      expect(message).toBeTruthy();
      // toContain() - Verifica que un string contiene otro
      expect(message.textContent).toContain('Tu carrito está vacío');
    });
  });

  // ========================================
  // TEST 4: CATALOGOPAGE - Título
  // ========================================
  describe('CatalogoPage - Renderizado', () => {
    beforeEach((done) => {
      container = document.createElement('div');
      document.body.appendChild(container);
      root = ReactDOM.createRoot(container);
      root.render(
        <BrowserRouter>
          <CatalogoPage onAgregarAlCarrito={() => {}} />
        </BrowserRouter>
      );
      setTimeout(done, 300);
    });

    it('debe renderizar el título "Catálogo de Productos"', () => {
      const title = container.querySelector('h1 span');
      expect(title).toBeTruthy();
      // toBe() - Compara con igualdad estricta (===)
      expect(title.textContent).toBe('Catálogo de Productos');
    });
  });

  // ========================================
  // TEST 5: CONTACTOPAGE - Campos requeridos
  // ========================================
  describe('ContactoPage - Campos del formulario', () => {
    beforeEach((done) => {
      container = document.createElement('div');
      document.body.appendChild(container);
      root = ReactDOM.createRoot(container);
      root.render(
        <BrowserRouter>
          <ContactoPage />
        </BrowserRouter>
      );
      setTimeout(done, 300);
    });

    it('debe tener todos los campos requeridos del formulario', () => {
      const nombreInput = container.querySelector('input[name="nombre"]');
      const emailInput = container.querySelector('input[name="email"]');
      const asuntoInput = container.querySelector('input[name="asunto"]');
      const mensajeTextarea = container.querySelector('textarea[name="mensaje"]');
      
      // toBeDefined() - Verifica que los elementos existen
      expect(nombreInput).toBeDefined();
      expect(emailInput).toBeDefined();
      expect(asuntoInput).toBeDefined();
      expect(mensajeTextarea).toBeDefined();
      
      // Verificar atributo required
      expect(nombreInput.hasAttribute('required')).toBe(true);
      expect(emailInput.hasAttribute('required')).toBe(true);
      expect(asuntoInput.hasAttribute('required')).toBe(true);
      expect(mensajeTextarea.hasAttribute('required')).toBe(true);
    });
  });

  // ========================================
  // TEST ORIGINAL: CONTACTOPAGE - Validación Email
  // ========================================
  describe('ContactoPage - Validación de Email', () => {
    beforeEach((done) => {
      container = document.createElement('div');
      document.body.appendChild(container);

      root = ReactDOM.createRoot(container);
      root.render(
        <BrowserRouter>
          <ContactoPage />
        </BrowserRouter>
      );

      setTimeout(done, 300);
    });

    // VERSIÓN ORIGINAL JASMINE (sin jest.)
    it('debe mostrar error con email sin @', (done) => {
      spyOn(window, 'fetch').and.returnValue(
        Promise.resolve({
          json: () => Promise.resolve({ 
            success: false, 
            message: 'Email invalido' 
          })
        })
      );
      spyOn(window, 'alert');

      const emailInput = container.querySelector('input[name="email"]');
      expect(emailInput).toBeTruthy();

      fillInput(emailInput, 'testemail.com');

      // Verificar que el valor se seteo correctamente
      setTimeout(() => {
        expect(emailInput.value).toBe('testemail.com');
        
        submitForm();

        setTimeout(() => {
          expect(window.fetch).toHaveBeenCalled();
          expect(window.alert).toHaveBeenCalled();
          done();
        }, 500);
      }, 100);
    });
  });
});