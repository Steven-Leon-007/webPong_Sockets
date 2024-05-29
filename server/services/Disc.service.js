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

    moveDiscAndCollision({ absoluteScreen, usersList }) {
        const paddingTop = 32;
        const paddingBottom = 54;

        const usersFiltered = usersList.filter(user => (user.type === 'player-left' || user.type === 'player-right'));

        const collisionPadding = 20;


        usersFiltered.forEach(user => {
            const cursorPos = user.cursorPosition;

            if (cursorPos) {
                const paddleTop = cursorPos.y - collisionPadding;
                const paddleBottom = cursorPos.y + collisionPadding;
                const paddleLeft = cursorPos.x - collisionPadding;
                const paddleRight = cursorPos.x + collisionPadding;

                if (
                    user.discRelativePos.posX + 20 >= paddleLeft && user.discRelativePos.posX - 20 <= paddleRight &&
                    user.discRelativePos.posY + 20 >= paddleTop && user.discRelativePos.posY - 20 <= paddleBottom
                ) {
                    this.disc.velX *= -1;
                    this.disc.velY *= -1;
                }
            }
        });

        if (this.disc.posX <= 0 || this.disc.posX >= absoluteScreen.width) {
            if (this.disc.posX <= 0) {
                return ({winner: usersFiltered[1], loser: usersFiltered[0]});
            }
            else if (this.disc.posX >= absoluteScreen.width){
                return ({winner: usersFiltered[0], loser: usersFiltered[1]});;
            }
        }

        if (this.disc.posY <= paddingTop || this.disc.posY >= (absoluteScreen.height - paddingBottom)) {
            this.disc.velY *= -1;
        }

        this.disc.posX += this.disc.velX;
        this.disc.posY += this.disc.velY;

        return false;
    }


    getDisc() {
        return this.disc;
    }
}

export default DiscService;