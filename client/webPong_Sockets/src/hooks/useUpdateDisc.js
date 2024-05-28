import { useEffect } from 'react';
import socketManager from '../socketManager';
import useDiscActions from './useDiscActions';

const useDiscMovement = (absoluteScreen, discRef, boardRef, user) => {
    const { discPosition } = useDiscActions();


    useEffect(() => {

        if(!user) return;

        const disc = discRef.current;
        const content = boardRef.current;

        let posX = user.discRelativePos.posX;
        let posY = content.offsetHeight / 2 - disc.offsetHeight / 2;
        let velX = discPosition.velX;
        let velY = discPosition.velY;
        const padding = 32;

        console.log(posX, posY, velX, velY);

        // const moveDisc = () => {
        //     posX += velX;
        //     posY += velY;

        //     if (posX + disc.clientWidth >= absoluteScreen.width || posX <= 0) {
        //         velX *= -1;
        //     }

        //     if (posY + disc.clientHeight >= content.clientHeight - padding || posY <= 0 + padding) {
        //         velY *= -1;
        //     }

        //     disc.style.left = posX + 'px';
        //     disc.style.top = posY + 'px';
        //     requestAnimationFrame(moveDisc);
        // };
        // moveDisc();


    }, [absoluteScreen, discRef, boardRef, discPosition]);
};

export default useDiscMovement;
