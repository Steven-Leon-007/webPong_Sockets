import io from 'socket.io-client';

const socket = io('/');
let allUsers = [];
let absoluteScreen = { width: 0, height: 0 };
let disc = null;
let updateUsersCallback = null;
let updateUserCursorCallback = null;
let updateAbsoluteScreenCallback = null;
let isDiscMoved = false;
let updateDiscPositionCallback = null;


const socketManager = {
    init() {
        socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        socket.on('userRegistered', ({ usersList, absoluteScreen: screen }) => {

            allUsers = usersList;
            absoluteScreen = screen;

            if (allUsers.length === 2 && !isDiscMoved) {
                socket.emit('startDiscMovement');
                isDiscMoved = true;
            }

            if (updateUsersCallback) updateUsersCallback(usersList);
            if (updateAbsoluteScreenCallback) updateAbsoluteScreenCallback(screen);
        });

        socket.on('userDisconnected', ({ usersList, absoluteScreen: screen }) => {
            allUsers = usersList;
            absoluteScreen = screen;
            if (updateUsersCallback) updateUsersCallback(usersList);
            if (updateAbsoluteScreenCallback) updateAbsoluteScreenCallback(screen);
        });

        socket.on('allUsers', (usersList) => {
            allUsers = usersList;
            if (updateUsersCallback) updateUsersCallback(usersList);
        });

        socket.on('cursorMoved', ({ socketId, cursorPosition }) => {
            allUsers = allUsers.map(user =>
                user.socketId === socketId ? { ...user, cursorPosition } : user
            );
            if (updateUserCursorCallback) updateUserCursorCallback(allUsers);
        });

        socket.on('updateDiscPosition', ({usersList, absoluteScreen: screen}) => {
            allUsers = usersList;
            absoluteScreen = screen;

            if (updateUsersCallback) updateUsersCallback(usersList);
            if (updateAbsoluteScreenCallback) updateAbsoluteScreenCallback(screen);

        });
    },

    registerUser(user) {
        const newUser = { ...user, socketId: socket.id };
        allUsers.push(newUser);
        const disc = {
            posX: 500,
            posY: 300,
            isInGame: false,
            velX: 3,
            velY: 3,
        }

        if (allUsers.length == 2) {
            const params = { newUser, disc };
            socket.emit('register', params);
        } else {
            const params = { newUser, disc: null };
            socket.emit('register', params);
        }
    },

    getAllUsers() {
        return allUsers;
    },

    onUpdateUsers(callback) {
        updateUsersCallback = callback;
    },

    onUpdateAbsoluteScreen(callback) {
        updateAbsoluteScreenCallback = callback;
    },

    getAbsoluteScreen() {
        return absoluteScreen;
    },

    getCurrentUser() {
        return allUsers.find(user => user.socketId === socket.id);
    },

    updateCursorPosition(cursorPosition) {
        socket.emit('moveCursor', { socketId: socket.id, cursorPosition });
    },

    onUpdateUserCursor(callback) {
        updateUserCursorCallback = callback;
    },

    onUpdateDiscPosition(callback) {
        updateDiscPositionCallback = callback;
    }


};

export default socketManager;
