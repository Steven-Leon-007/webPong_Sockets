import User from '../models/User.model.js';
import Board from '../models/Board.model.js';

class UserService {
    constructor() {
        this.users = [];
    }
    createUser(user) {
        const newUser = new User(user);
        this.users.push(newUser);
    }
    deleteUser(socketId) {
        this.users = this.users.filter(user => user.socketId !== socketId);
    }
    getUserBySocketId(socketId) {
        return this.users.find(user => user.socketId === socketId);
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
}

export default UserService;