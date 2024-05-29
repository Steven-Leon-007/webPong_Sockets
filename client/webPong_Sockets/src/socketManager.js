import io from 'socket.io-client';

const socket = io('/');
let allUsers = [];
let absoluteScreen = { width: 0, height: 0 };
let disc = null;
let updateUsersCallback = null;
let updateUserCursorCallback = null;
let updateAbsoluteScreenCallback = null;
let updateDiscCallback = null;

const socketManager = {
    init() {
        socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        socket.on('userRegistered', (data) => {
            const { user, discPosition, absoluteScreen } = data;

            const existingUser = allUsers.find(u => u.socketId === user.socketId);
            if (!existingUser) {
                allUsers.push(user);
            } else {
                Object.assign(existingUser, user);
            }

            console.log(allUsers.length);


            if (updateUsersCallback) updateUsersCallback(allUsers);
            if (updateAbsoluteScreenCallback) updateAbsoluteScreenCallback(absoluteScreen);
            if (updateDiscCallback) updateDiscCallback(discPosition);
        });

        socket.on('userDisconnected', (userSpecificData) => {
            const { user, discPosition, absoluteScreen } = userSpecificData;

            allUsers = allUsers.filter(u => u.socketId !== user.socketId);
            absoluteScreen = screen;

            if (updateUsersCallback) updateUsersCallback(allUsers);
            if (updateAbsoluteScreenCallback) updateAbsoluteScreenCallback(screen);
        });

        socket.on('cursorMoved', ({ socketId, cursorPosition }) => {
            allUsers = allUsers.map(user =>
                user.socketId === socketId ? { ...user, cursorPosition } : user
            );
            if (updateUserCursorCallback) updateUserCursorCallback(allUsers);
        });

        socket.on('updateDiscPosition', (data) => {
            const { discPosition, absoluteScreen } = data;

            if (updateDiscCallback) updateDiscCallback(discPosition);
            if (updateAbsoluteScreenCallback) updateAbsoluteScreenCallback(absoluteScreen);
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

    onUpdateDiscCallback(callback) {
        updateDiscCallback = callback;
    },

    onUpdateAbsoluteScreen(callback) {
        updateAbsoluteScreenCallback = callback;
    },

    getAbsoluteScreen() {
        return absoluteScreen;
    },

    getDisc() {
        return disc;
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
        updateDiscCallback = callback;
    }
};

export default socketManager;
