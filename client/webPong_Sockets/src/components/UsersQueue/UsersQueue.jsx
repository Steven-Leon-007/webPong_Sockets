import React, { useState } from 'react';
import "./UsersQueue.scss";

const UsersQueue = () => {

    const user1 ={"name":"diegoschi", "score":0};
    const user2 = {"name":"Estivman", "score":0};
    const user3 = {"name":"AUUUUU", "score":0};
    const user4 = {"name":"Homosexuales varios", "score":0};


    const [isOpen, setIsOpen] = useState(false);
    const users = [user1, user2, user3, user4];    

    const toggleQueue = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="users-queue-container">
            <button className="users-queue-toggle" onClick={toggleQueue}>
                {isOpen ? "Hide Queue" : "Show Queue"}
            </button>
            <div className={`users-queue ${isOpen ? 'open' : 'closed'}`}>
                <ul>
                    {users.map((user, index) => (
                        <li key={index}>{user.name} - {user.score}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UsersQueue;
