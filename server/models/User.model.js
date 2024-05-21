import Board from './Board.model.js';

class User {
    constructor(nickName, type, score, board) {
        this.nickName = nickName;
        this.type = type;
        this.score = 0;
        this.board = board instanceof Board ? board : null;
    }
}

    function increaseScore() {
        this.score++;
    }
    
export default User;