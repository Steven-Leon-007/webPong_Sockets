import User from '../models/User.model.js';

class UserService {
    constructor() {
        this.users = [];
    }

    createUser(user) {
        const newUser = new User(user);
        const middleIndex = Math.ceil(this.users.length / 2);
        this.users.splice(middleIndex, 0, newUser);
    }

    deleteUser(socketId) {
        this.users = this.users.filter(user => user.socketId !== socketId);
    }

    getUserBySocketId(socketId) {
        return this.users.find(user => user.socketId === socketId);
    }

    updateUserCursor(socketId, cursorPosition) {
        const user = this.getUserBySocketId(socketId);
        if (user) {
            user.cursorPosition = cursorPosition;
        }
    }

    updateUserScore(socketId) {
        const user = this.getUserBySocketId(socketId);
        if (user) {
            user.increaseScore();
            return user;
        } else {
            throw new Error('User not found');
        }
    }
    getAllUsers() {
        return this.users;
    }

    calculatePositions() {
        let currentX = 0;

        this.users.forEach(user => {
            user.board.position = { x: currentX, y: 0 };
            currentX += user.board.width;
        });

        return { width: currentX, height: 600 };
    }
}

export default UserService;