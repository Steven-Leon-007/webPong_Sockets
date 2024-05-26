import io from 'socket.io-client';

const socket = io('/');
let allUsers = [];
let absoluteScreen = { width: 0, height: 0 };
let updateUsersCallback = null;
let updateUserCursorCallback = null;
let updateAbsoluteScreenCallback = null;


const socketManager = {
    init() {
        socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        socket.on('userRegistered', ({ usersList, absoluteScreen: screen }) => {
            allUsers = usersList;
            absoluteScreen = screen;
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
    },

    registerUser(user) {
        const newUser = { ...user, socketId: socket.id };
        allUsers.push(newUser);
        socket.emit('register', newUser);
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
    }
};

export default socketManager;
