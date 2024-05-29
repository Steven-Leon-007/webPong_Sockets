import Disc from "../models/Disc.model.js";

class DiscService {
    constructor() {
        this.disc = null;
    }

    createDisc() {
        const disc = {
            posX: 500,
            posY: 300,
            isInGame: true,
            velX: 5,
            velY: 5,
        }

        this.disc = new Disc(disc);
    }

    putDiscInPause() {
        this.disc.isInGame = false;
    }

    getDiscPosition() {
        if (this.disc) {
            const posX = this.disc.posX;
            const posY = this.disc.posY;
            return { posX: posX, posY: posY };
        }
        return { posX: 0, posY: 300 };
    }

    moveDiscAndCollision({ absoluteScreen }) {
        const paddingTop = 32;
        const paddingBottom = 54;

        this.disc.posX += this.disc.velX;
        this.disc.posY += this.disc.velY;

        if (this.disc.posX <= 0 || this.disc.posX >= absoluteScreen.width) {
            this.disc.velX *= -1;
        }

        if (this.disc.posY <= paddingTop || this.disc.posY >= (absoluteScreen.height - paddingBottom)) {
            this.disc.velY *= -1;
        }
    }


    getDisc() {
        return this.disc;
    }
}

export default DiscService;