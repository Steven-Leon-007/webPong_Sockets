import { useEffect, useState } from 'react';
import socketManager from '../socketManager';

const useDiscActions = () => {
    const [discPosition, setDiscPosition] = useState({ posX: 500, posY: 300, isInGame: false, velX: 3, velY: 3 });

    useEffect(() => {
        socketManager.onUpdateDiscPosition(setDiscPosition);

        return () => {
            socketManager.onUpdateDiscPosition(null);
        };
    }, []);

    return { discPosition };
};

export default useDiscActions;
