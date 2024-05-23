import { useState, useEffect } from 'react';
import socketManager from '../../socketManager'; 

function HomeFunctions() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        socketManager.onUpdateUsers(setUsers);

        setUsers(socketManager.getAllUsers());

        return () => {
            socketManager.onUpdateUsers(null);
        };
    }, []);

    return users;
}

export default HomeFunctions;
