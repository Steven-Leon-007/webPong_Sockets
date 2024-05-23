import io from 'socket.io-client';

const socket = io('/');
let allUsers = [];
let updateUsersCallback = null;

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
    }
};

export default socketManager;
