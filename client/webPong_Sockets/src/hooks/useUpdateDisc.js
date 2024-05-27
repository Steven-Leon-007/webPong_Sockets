import { useEffect } from 'react';
import socketManager from '../socketManager';
import useDiscActions from './useDiscActions';

const useDiscMovement = (absoluteScreen, discRef, boardRef) => {
    const { discPosition } = useDiscActions();

    useEffect(() => {
        const disc = discRef.current;
        const content = boardRef.current;

        let posX = discPosition.posX;
        let posY = discPosition.posY;
        let velX = discPosition.velX;
        let velY = discPosition.velY;
        const padding = 32;

        const moveDisc = () => {
            posX += velX;
            posY += velY;

            if (posX + disc.clientWidth >= absoluteScreen.width || posX <= 0) {
                velX *= -1;
            }

            if (posY + disc.clientHeight >= content.clientHeight - padding || posY <= 0 + padding) {
                velY *= -1;
            }

            disc.style.left = posX + 'px';
            disc.style.top = posY + 'px';

            socketManager.updateDiscPosition(posX, posY, velX, velY);
            requestAnimationFrame(moveDisc);
        };

        moveDisc();
    }, [absoluteScreen, discRef, boardRef, discPosition]);
};

export default useDiscMovement;
