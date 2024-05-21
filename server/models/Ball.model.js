class Ball {
    constructor(posX, posY, radius, color, angle, isInGame, paths, speed) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.color = color;
        this.angle = angle;
        this.isInGame = isInGame;
        this.paths = paths;
        this.speed = speed;
    }
}

export default Ball;