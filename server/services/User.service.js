import User from '../models/User.model.js';
import Board from '../models/Board.model.js';

class UserService {
    constructor() {
        this.users = [];
    }

    // Crear un nuevo usuario
    crearUsuario(nickName, type, score, board) {
        const nuevoUsuario = new User(nickName, type, score, board);
        this.users.push(nuevoUsuario);
        return nuevoUsuario;
    }

    // Obtener un usuario por su nickName
    obtenerUsuarioPorNickName(nickName) {
        return this.users.find(user => user.nickName === nickName);
    }

    // Actualizar el score de un usuario
    actualizarScoreUsuario(nickName, nuevoScore) {
        const usuario = this.obtenerUsuarioPorNickName(nickName);
        if (usuario) {
            usuario.actualizarScore(nuevoScore);
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