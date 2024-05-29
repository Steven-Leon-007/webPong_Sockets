import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import UserService from './services/User.service.js';
import DiscService from './services/Disc.service.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;
const discService = new DiscService();
const userService = new UserService(discService);
let isDiscCreated = false;
let discMovementInterval = null;

app.use(express.json());

io.on("connection", (socket) => {

    socket.on("register", (newUser) => {
        userService.createUser(newUser);
        const absoluteScreen = userService.calculatePositions();

        const usersList = userService.getAllUsers();

        if (usersList.length == 2 && !isDiscCreated) {
            discService.createDisc();
            isDiscCreated = true;
            startDiscMovement();
        }

        usersList.forEach(user => {
            userService.calcDiscRelativePosition(user);
        });

        usersList.forEach(user => {
            const userSpecificData = {
                user,
                discPosition: {
                    posX: user.discRelativePos.posX,
                    posY: user.discRelativePos.posY
                },
                absoluteScreen,
                queue: userService.getQueue()
            };
            io.to(user.socketId).emit('userRegistered', userSpecificData);
        });
    });

    socket.on("disconnect", () => {
        userService.deleteUser(socket.id);
        const usersList = userService.getAllUsers();
        const absoluteScreen = userService.calculatePositions();

        if (usersList.length < 2) {
            stopDiscMovement();
        }

        usersList.forEach(user => {
            const userSpecificData = {
                user,
                discPosition: {
                    posX: user.discRelativePos.posX,
                    posY: user.discRelativePos.posY
                },
                absoluteScreen
            };
            io.to(user.socketId).emit('userDisconnected', userSpecificData);
        });
    });

    socket.on('moveCursor', ({ socketId, cursorPosition }) => {
        userService.updateUserCursor(socketId, cursorPosition);
        const updatedUser = userService.getUserBySocketId(socketId);
        io.emit('cursorMoved', { socketId: updatedUser.socketId, cursorPosition: updatedUser.cursorPosition });
    });

    const startDiscMovement = () => {
        discMovementInterval = setInterval(() => {
            const absoluteScreen = userService.calcBoardSize();
            const usersList = userService.getAllUsers();

            discService.moveDiscAndCollision({ absoluteScreen, usersList });

            usersList.forEach(user => {
                userService.calcDiscRelativePosition(user);
            });

            usersList.forEach(user => {
                const userSpecificData = {
                    discPosition: {
                        posX: user.discRelativePos.posX,
                        posY: user.discRelativePos.posY
                    },
                    absoluteScreen
                };
                io.to(user.socketId).emit('updateDiscPosition', userSpecificData);
            });
        }, 1000 / 30);
    };

    const stopDiscMovement = () => {
        if (discMovementInterval) {
            clearInterval(discMovementInterval);
            discMovementInterval = null;
            isDiscCreated = false;
        }
    };


})

server.listen(PORT || 3000, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
