import { useState, useEffect } from 'react';
import socketManager from '../../socketManager';

function HomeFunctions() {
    const [users, setUsers] = useState([]);
    const [absoluteScreen, setAbsoluteScreen] = useState({ width: 0, height: 600 });


    useEffect(() => {
        socketManager.onUpdateUsers(setUsers);
        socketManager.onUpdateAbsoluteScreen(setAbsoluteScreen);
        socketManager.onUpdateUserCursor(setUsers);
        
        setUsers(socketManager.getAllUsers());
        setAbsoluteScreen(socketManager.getAbsoluteScreen());
        
        return () => {
            socketManager.onUpdateUsers(null);
            socketManager.onUpdateAbsoluteScreen(null);
            socketManager.onUpdateUserCursor(null);
        };
    }, []);

    return { users, absoluteScreen };
}

export default HomeFunctions;
