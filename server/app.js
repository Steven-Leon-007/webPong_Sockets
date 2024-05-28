import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import UserService from './services/User.service.js';
import DiscService from './services/Disc.service.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;
const userService = new UserService();
const discService = new DiscService();

app.use(express.json());

io.on("connection", (socket) => {

    io.emit('allUsers', userService.getAllUsers());

    socket.on("register", (params) => {
        const {newUser, disc } = params;
        userService.createUser(newUser);
        const absoluteScreen = userService.calculatePositions();

        const usersList = userService.getAllUsers();

        if(usersList.length == 2){
            discService.createDisc(disc);
        }

        io.emit('userRegistered', {usersList, absoluteScreen, disc});
    });

    socket.on('disconnect', () => {
        userService.deleteUser(socket.id);
        const absoluteScreen = userService.calculatePositions();
        const usersList = userService.getAllUsers();

        io.emit('userDisconnected', {usersList, absoluteScreen});
    });

    socket.on('moveCursor', ({ socketId, cursorPosition }) => {
        userService.updateUserCursor(socketId, cursorPosition);
        const updatedUser = userService.getUserBySocketId(socketId);
        io.emit('cursorMoved', { socketId: updatedUser.socketId, cursorPosition: updatedUser.cursorPosition });
    });

})

server.listen(PORT || 3000, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
