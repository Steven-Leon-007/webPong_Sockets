import Board from './Board.model.js';

class User {
    constructor(nickName, type, score, board){
        this.nickName = nickName;
        this.type = type;
        this.score = score;
        this.board = board instanceof Board ? board : null;
    }
}

export default User;