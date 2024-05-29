import io from 'socket.io-client';

const socket = io('/');
let allUsers = [];
let absoluteScreen = { width: 0, height: 0 };
let disc = null;
let updateUsersCallback = null;
let updateUserCursorCallback = null;
let updateAbsoluteScreenCallback = null;
let updateDiscCallback = null;
let updateQueueCallback = null;
let updateDiscInfoCallback = null;

const socketManager = {
    init() {
        socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        socket.on('userRegistered', (data) => {
            const { user, discPosition, absoluteScreen, queue, discInfo } = data;
            
            const existingUser = allUsers.find(u => u.socketId === user.socketId);
            if (!existingUser) {
                allUsers.push(user);
            } else {
                Object.assign(existingUser, user);
            }

            if (updateUsersCallback) updateUsersCallback(allUsers);
            if (updateAbsoluteScreenCallback) updateAbsoluteScreenCallback(absoluteScreen);
            if (updateDiscCallback) updateDiscCallback(discPosition);
            if(updateQueueCallback) updateQueueCallback(queue);
            if(updateDiscInfoCallback) updateDiscInfoCallback(discInfo);
        });

        socket.on('userDisconnected', (userSpecificData) => {
            const { user, discPosition, absoluteScreen: screen, queue } = userSpecificData;
            absoluteScreen = screen;
            if(updateQueueCallback) updateQueueCallback(queue);
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

        socket.on("updateScore", (queue) => {
            if(updateQueueCallback) updateQueueCallback(queue);
        })
    },

    registerUser(user) {
        const { discColor, ...userWithoutDiscColor } = user;
        const newUser = { ...userWithoutDiscColor, socketId: socket.id };
        allUsers.push(newUser);
        socket.emit('register',  {newUser, discColor});
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
        const sender = allUsers.find(user => user.socketId === socket.id);
        if(sender.type === "viewer"){
            return;
        }
        socket.emit('moveCursor', { socketId: socket.id, cursorPosition });
    },

    onUpdateUserCursor(callback) {
        updateUserCursorCallback = callback;
    },

    onUpdateDiscPosition(callback) {
        updateDiscCallback = callback;
    },

    onUpdateQueue(callback){
        updateQueueCallback = callback;
    },

    onUpdateDiscInfo(callback){
        updateDiscInfoCallback = callback;
    }
};

export default socketManager;
