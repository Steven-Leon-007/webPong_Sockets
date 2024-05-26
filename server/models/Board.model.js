class Board {
    constructor({ background, width, height, position = { x: 0, y: 0 } }) {
        this.background = background;
        this.width = width;
        this.height = height;
        this.position = position;
    }

    setPosition(position) {
        this.position = position;
    }

    getPosition() {
        return this.position;
    }
}

export default Board;