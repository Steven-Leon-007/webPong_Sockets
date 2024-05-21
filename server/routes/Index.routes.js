import { Router } from 'express';
import UserService from '../services/User.service.js';
import Board from '../models/Board.model.js';

const router = Router();
const userService = new UserService();

// Ruta para crear un nuevo usuario

 router.post('/createUser', (req, res) => {
     const { socketId, nickName, type, score, background, width, height } = req.body;
     const board = new Board(background, width, height);
     const usuario = userService.crearUsuario(socketId, nickName, type, score, board);
     res.status(201).json(usuario);
 });


// Ruta para obtener todos los usuarios
router.get('/users', (req, res) => { // Asegúrate de incluir `req` como primer argumento
    const usuarios = userService.obtenerTodosLosUsuarios();
    res.status(200).json(usuarios);
});

// Ruta para obtener un usuario por su nickName
router.get('/users/:nickName', (req, res) => {
    const { nickName } = req.params;
    try {
        const usuario = userService.obtenerUsuarioPorNickName(nickName);
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Ruta para actualizar el score de un usuario
router.put('/users/:nickName/score', (req, res) => {
    const { nickName } = req.params;
    const { nuevoScore } = req.body;
    try {
        const usuario = userService.actualizarScoreUsuario(nickName, nuevoScore);
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;
