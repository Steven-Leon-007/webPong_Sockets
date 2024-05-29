import React, { useState } from 'react';
import "./UsersQueue.scss";
import discImage from '../../assets/disc.png';

const UsersQueue = ({ usersQueue }) => {

    const [isOpen, setIsOpen] = useState(false);
    const users = usersQueue;

    const toggleQueue = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="users-queue-container">
            <button className="users-queue-toggle" onClick={toggleQueue}>
                {isOpen ? "Hide Scores" : "Show Scores"}
            </button>
            <div className={`users-queue ${isOpen ? 'open' : 'closed'}`}>
                <ul>
                    {users.map((user, index) => (
                        (user.type === "player-left" || user.type === "player-right") ? (
                            <li key={index} className={`player`}>
                                <img src={discImage} alt="" />
                                {user.nickName} - {user.score}
                            </li>
                        ) : (
                            <li key={index} className={`viewer`}>
                                {user.nickName} - {user.score}
                            </li>
                        )
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UsersQueue;
