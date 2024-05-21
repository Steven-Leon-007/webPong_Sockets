import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import router from './routes/Index.routes.js';
import UserService from './services/User.service.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;
const userService = new UserService();

app.use(express.json());

app.use('/', router);

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
})

server.listen(PORT || 3000, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
