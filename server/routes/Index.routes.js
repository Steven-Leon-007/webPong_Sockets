import { Router } from 'express';
import UserService from '../services/User.service.js';
import Board from '../models/Board.model.js';

const router = Router();
const userService = new UserService();

router.post('/createUser', (req, res) => {
    const body = req.body;
    const user = userService.createUser(body);
    res.status(201).json(user);
});

router.get('/users', (req, res) => {
    const users = userService.getAllUsers();
    res.status(200).json(users);
});

router.get('/users/:socketId', (req, res) => {
    const { socketId } = req.params;
    try {
        const user = userService.getUserBySocketId(socketId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete('/users/:socketId', (req, res) => {
    const { socketId } = req.params;
    try {
        userService.deleteUser(socketId);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;
