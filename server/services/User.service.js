import User from '../models/User.model.js';
import Board from '../models/Board.model.js';

class UserService {
    constructor() {
        this.users = [];
    }

    // Crear un nuevo usuario
    crearUsuario(user) {
        const nuevoUsuario = new User(user);
        this.users.push(nuevoUsuario);
    }

    // Obtener un usuario por su nickName
    obtenerUsuarioPorSocketId(socketId) {
        return this.users.find(user => user.socketId === socketId);
    }

    // Actualizar el score de un usuario
    actualizarScoreUsuario(socketId) {
        const usuario = this.obtenerUsuarioPorSocketId(socketId);
        if (usuario) {
            usuario.increaseScore();
            return usuario;
        } else {
            throw new Error('Usuario no encontrado');
        }
    }

    // Obtener todos los usuarios
    obtenerTodosLosUsuarios() {
        return this.users;
    }
}

export default UserService;