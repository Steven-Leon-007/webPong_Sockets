class Disc {
    constructor({posX, posY, isInGame, velX, velY, color, visible}) {
        this.posX = posX;
        this.posY = posY;
        this.isInGame = isInGame;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.visible = visible;
    }
}

export default Disc;