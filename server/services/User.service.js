import User from '../models/User.model.js';
import Board from '../models/Board.model.js';

class UserService {
    constructor() {
        this.users = [];
    }

    // Crear un nuevo usuario
    createUser(user) {
        const newUser = new User(user);
        this.users.push(newUser);
    }

    // Obtener un usuario por su nickName
    getUserBySocketId(socketId) {
        return this.users.find(user => user.socketId === socketId);
    }

    // Actualizar el score de un usuario
    updateUserScore(socketId) {
        const user = this.getUserBySocketId(socketId);
        if (user) {
            user.increaseScore();
            return user;
        } else {
            throw new Error('User not found');
        }
    }

    // Obtener todos los usuarios
    getAllUsers() {
        return this.users;
    }
}

export default UserService;