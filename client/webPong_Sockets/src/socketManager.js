import io from 'socket.io-client';

const socket = io('/');
let allUsers = [];
let updateUsersCallback = null;
let updateUserCursorCallback = null;

const socketManager = {
    init() {
        socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        socket.on('userRegistered', (usersList) => {
            allUsers = usersList;
            if (updateUsersCallback) updateUsersCallback(usersList);
        });

        socket.on('userDisconnected', (usersList) => {
            allUsers = usersList;
            if (updateUsersCallback) updateUsersCallback(usersList);
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

    updateCursorPosition(cursorPosition) {
        socket.emit('moveCursor', { socketId: socket.id, cursorPosition });
    },

    onUpdateUserCursor(callback) {
        updateUserCursorCallback = callback;
    }
};

export default socketManager;
