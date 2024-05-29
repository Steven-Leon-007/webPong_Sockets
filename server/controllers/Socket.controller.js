
import UserService from '../services/User.service.js';
import DiscService from '../services/Disc.service.js';
let discMovementInterval = null;
let isDiscCreated = false;

const discService = new DiscService();
const userService = new UserService(discService);

let disc = null;
const register = (socket, io) => ({ newUser, discColor }) => {

    userService.createUser(newUser);
    const absoluteScreen = userService.calculatePositions();
    const usersList = userService.getAllUsers();

    if (usersList.length == 1) {
        disc = discService.createDisc(discColor);
    }

    if (usersList.length === 2 && !isDiscCreated) {
        isDiscCreated = true;
        disc = discService.updateDiscVisibility();
        startDiscMovement(io);
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
            queue: userService.getQueue(),
            discInfo: {
                color: disc.color,
                visible: disc.visible
            }
        };
        io.to(user.socketId).emit('userRegistered', userSpecificData);
    });
};

const disconnect = (socket, io) => () => {
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
            absoluteScreen,
            queue: userService.getQueue()
        };
        io.to(user.socketId).emit('userDisconnected', userSpecificData);
    });
};

const moveCursor = (io) => ({ socketId, cursorPosition }) => {
    userService.updateUserCursor(socketId, cursorPosition);
    const updatedUser = userService.getUserBySocketId(socketId);
    io.emit('cursorMoved', { socketId: updatedUser.socketId, cursorPosition: updatedUser.cursorPosition });
};

const startDiscMovement = (io) => {
    discMovementInterval = setInterval(() => {
        const absoluteScreen = userService.calcBoardSize();
        const usersList = userService.getAllUsers();

        const score = discService.moveDiscAndCollision({ absoluteScreen, usersList });
        if (score !== false) {
            discService.createDisc();
            updatePlayerScore(io, score);
        }

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
    }, 1000 / 60);
};

const stopDiscMovement = () => {
    if (discMovementInterval) {
        clearInterval(discMovementInterval);
        discMovementInterval = null;
        isDiscCreated = false;
    }
};

const updatePlayerScore = (io, score) => {
    const queue = userService.updateUserScore(score);
    const usersList = userService.getAllUsers();
    usersList.forEach(user => {
        io.to(user.socketId).emit('updateScore', queue);
    });
};

export default { register, disconnect, moveCursor };
