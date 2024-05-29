// socketSetup.js
import SocketController from "./Socket.controller.js";

const SocketSetup = (io) => {

    const { register, disconnect, moveCursor } = SocketController;

    io.on('connection', (socket) => {
        console.log('a user connected:', socket.id);

        socket.on('register', register(socket, io));
        socket.on('disconnect', disconnect(socket, io));
        socket.on('moveCursor', moveCursor(socket, io));
    });
}


export default SocketSetup;