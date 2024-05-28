import User from '../models/User.model.js';
import QueueUtil from '../utils/Queue.util.js';

class UserService {
    constructor(discService) {
        this.users = [];
        this.discService = discService;
        this.queue = new QueueUtil();
    }

    createUser(user) {
        const newUser = new User(user);
        const middleIndex = Math.ceil(this.users.length / 2);
        this.users.splice(middleIndex, 0, newUser);

        this.queue.enqueue(newUser);
        return newUser;
    }

    deleteUser(socketId) {
        this.users = this.users.filter(user => user.socketId !== socketId);
        this.queue.remove(this.queue.findUserBySocketId(socketId));
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
        const defeatedUser = this.users.filter(player => player.type == "player" && player != user);
        if (user) {
            user.increaseScore();
            this.queue.dequeue(defeatedUser[0]);
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

    calcBoardSize() {
        let width = 0;

        this.users.forEach(user => {
            width += user.board.width;
        });

        return { width, height: 600 };
    }

    calcDiscRelativePosition(user) {

        const { posX, posY } = this.discService.getDiscPosition();
        let relativePosX = posX - user.board.position.x;
        let relativePosY = posY;

        user.discRelativePos.posX = relativePosX;
        user.discRelativePos.posY = relativePosY;

    }
}

export default UserService;