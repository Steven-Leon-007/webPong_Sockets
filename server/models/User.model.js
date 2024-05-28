import Board from './Board.model.js';

class User {

    constructor({ socketId, nickName, type, score, board, cursorPosition, discRelativePos }) {
        this.socketId = socketId;
        this.nickName = nickName;
        this.type = type;
        this.score = score;
        this.board = new Board(board);
        this.cursorPosition = {x: 0, y: 0};
        this.discRelativePos = {posX: 0, posY: 0};
    }
}

function increaseScore() {
    this.score++;
}

export default User;