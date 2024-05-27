import { useEffect, useState } from 'react';
import socketManager from '../socketManager';

const useDiscActions = () => {
    const [discPosition, setDiscPosition] = useState({ posX: 500, posY: 300, isInGame: false, velX: 5, velY: 5 });

    useEffect(() => {
        socketManager.onUpdateDiscPosition(setDiscPosition);

        return () => {
            socketManager.onUpdateDiscPosition(null);
        };
    }, []);

    return { discPosition };
};

export default useDiscActions;
