import User from '../models/User.model.js';
import Board from '../models/Board.model.js';

class UserService {
    constructor() {
        this.users = [];
    }

    // Crear un nuevo usuario
    crearUsuario(socketId, nickName, type, score, board) {
        const nuevoUsuario = new User(socketId, nickName, type, score, board);
        this.users.push(nuevoUsuario);
        return nuevoUsuario;
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