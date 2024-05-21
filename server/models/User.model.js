import Board from './Board.model.js';

class User {

    constructor({ socketId, nickName, type, score, board }) {
        this.socketId = socketId;
        this.nickName = nickName;
        this.type = type;
        this.score = score;
        this.board = new Board(board);
    }
}

function increaseScore() {
    this.score++;
}

export default User;