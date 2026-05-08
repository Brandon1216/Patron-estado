const express = require('express');
const path = require('path');
const { fileURLToPath } = require('url');

// Crear aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Configurar directorio público
app.use(express.static(path.join(__dirname, 'public')));

// Configurar para servir módulos ES6
app.use(express.static(path.join(__dirname)));

// Ruta principal - servir la versión modular
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para los módulos del sistema
app.get('/PlumaControlador.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'PlumaControlador.js'));
});

app.get('/EstadoPluma.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'EstadoPluma.js'));
});

app.get('/Cerrada.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'Cerrada.js'));
});

app.get('/Abriendose.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'Abriendose.js'));
});

app.get('/Abierta.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'Abierta.js'));
});

app.get('/Cerrandose.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'Cerrandose.js'));
});


// Manejar errores 404
app.use((req, res) => {
    res.status(404).send('Página no encontrada');
});

// Manejar errores del servidor
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error del servidor');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor web iniciado en http://localhost:${PORT}`);
    console.log(`📁 Sirviendo archivos desde: ${path.join(__dirname, 'public')}`);
    console.log(`🎯 Sistema de Estacionamiento Inteligente listo para usar`);
    console.log(`⚡ Presiona Ctrl+C para detener el servidor`);
});

module.exports = app;
