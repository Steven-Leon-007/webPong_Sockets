import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import SocketSetup from './controllers/SocketSetup.controller.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;

SocketSetup(io);

server.listen(PORT || 3000, () => {
    console.log(`Server listening in: ${PORT}`);
});
