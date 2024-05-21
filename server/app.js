import express from 'express';
import router from './routes/Index.routes.js';

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Registrar el controlador de usuarios con prefijo /api
app.use('/', router);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
