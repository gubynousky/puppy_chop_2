const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');

require('dotenv').config();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('ERROR: Faltan variables de entorno EMAIL_USER y/o EMAIL_PASS');
    console.log('Asegurate de crear el archivo .env con las credenciales de Gmail');
    process.exit(1);
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.error('ERROR conectando con Gmail:', error.message);
        console.log('Verifica que:');
        console.log('1. Hayas habilitado la verificacion en 2 pasos en Gmail');
        console.log('2. Hayas creado una contraseña de aplicacion');
        console.log('3. Las credenciales en .env sean correctas');
    } else {
        console.log('✓ Servidor listo para enviar correos desde PuppyChop');
    }
});

app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'Servidor PuppyChop funcionando correctamente',
        timestamp: new Date()
    });
});

app.post('/api/contact', async (req, res) => {
    console.log('=== NUEVA PETICION DE CONTACTO PUPPYCHOP ===');
    console.log('Datos recibidos:', req.body);

    const { nombre, email, servicio, presupuesto, asunto, mensaje } = req.body;

    if (!nombre || !email || !servicio || !presupuesto || !asunto || !mensaje) {
        console.log('ERROR: Faltan campos requeridos');
        return res.status(400).json({
            success: false,
            message: 'Todos los campos son requeridos'
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        console.log('ERROR: Email invalido');
        return res.status(400).json({
            success: false,
            message: 'Email invalido'
        });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO || process.env.EMAIL_USER,
        subject: `🐕 PuppyChop - Nuevo mensaje de ${nombre}: ${asunto}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: #ea580c; color: white; padding: 20px; text-align: center;">
                    <h1 style="margin: 0;">🐕 PuppyChop</h1>
                    <p style="margin: 5px 0;">Nuevo mensaje desde el formulario de contacto</p>
                </div>
                
                <div style="background: #fff; padding: 30px; border: 2px solid #fed7aa;">
                    <h2 style="color: #ea580c; border-bottom: 2px solid #fed7aa; padding-bottom: 10px;">
                        Información del Cliente
                    </h2>
                    
                    <table style="width: 100%; margin: 20px 0;">
                        <tr>
                            <td style="padding: 10px; background: #ffedd5; font-weight: bold; width: 150px;">
                                👤 Nombre:
                            </td>
                            <td style="padding: 10px; background: #fff;">
                                ${nombre}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; background: #ffedd5; font-weight: bold;">
                                📧 Email:
                            </td>
                            <td style="padding: 10px; background: #fff;">
                                <a href="mailto:${email}" style="color: #ea580c;">${email}</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; background: #ffedd5; font-weight: bold;">
                                🛍️ Servicio:
                            </td>
                            <td style="padding: 10px; background: #fff;">
                                ${servicio}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; background: #ffedd5; font-weight: bold;">
                                💰 Presupuesto:
                            </td>
                            <td style="padding: 10px; background: #fff;">
                                ${presupuesto}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; background: #ffedd5; font-weight: bold;">
                                📋 Asunto:
                            </td>
                            <td style="padding: 10px; background: #fff;">
                                ${asunto}
                            </td>
                        </tr>
                    </table>

                    <h3 style="color: #ea580c; margin-top: 30px;">💬 Mensaje:</h3>
                    <div style="background: #ffedd5; padding: 20px; margin: 10px 0; border-left: 4px solid #ea580c; border-radius: 5px;">
                        ${mensaje.replace(/\n/g, '<br>')}
                    </div>
                </div>

                <div style="background: #f3f4f6; padding: 15px; text-align: center; border-top: 2px solid #fed7aa;">
                    <p style="margin: 0; color: #6b7280; font-size: 12px;">
                        📅 Mensaje enviado el ${new Date().toLocaleString('es-CL')}
                    </p>
                    <p style="margin: 5px 0; color: #6b7280; font-size: 12px;">
                        🐾 PuppyChop © 2025 - Todo para tu perrito
                    </p>
                </div>
            </div>
        `
    };

    try {
        console.log('Enviando correo desde PuppyChop...');
        const info = await transporter.sendMail(mailOptions);
        console.log('✓ Correo enviado exitosamente:', info.messageId);

        res.json({
            success: true,
            message: '¡Mensaje enviado correctamente! Te contactaremos pronto 🐕'
        });

    } catch (error) {
        console.error('ERROR enviando correo:', error);

        let errorMessage = 'Error al enviar el mensaje';

        if (error.code === 'EAUTH') {
            errorMessage = 'Error de autenticacion con Gmail. Verifica las credenciales';
        } else if (error.code === 'ENOTFOUND') {
            errorMessage = 'Error de conexion. Verifica tu conexion a internet';
        }

        res.status(500).json({
            success: false,
            message: errorMessage,
            debug: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

app.use((error, req, res, next) => {
    console.error('Error del servidor:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
});

app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
    console.log(`=== SERVIDOR PUPPYCHOP INICIADO ===`);
    console.log(`🐕 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📧 Email configurado: ${process.env.EMAIL_USER}`);
    console.log(`🌐 CORS habilitado para: http://localhost:3000`);
    console.log(`Presiona CTRL+C para detener`);
    console.log(`===================================`);
});
