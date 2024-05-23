import React, { useEffect } from 'react';
import './Home.scss';
import Header from './Header/Header';
import HomeFunctions from './HomeFunctions';
import socketManager from '../../socketManager';

function Home() {
    const users = HomeFunctions();

    useEffect(() => {
        const handleMouseMove = (event) => {
            const cursorPosition = { x: event.clientX, y: event.clientY };
            socketManager.updateCursorPosition(cursorPosition);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="home">
            <Header />
            <main>
                <h2>Connected Users:</h2>
                <ul>
                    {users.map((user, index) => (
                        <div key={index}>
                            <li
                                style={{
                                    position: 'absolute',
                                    left: user.cursorPosition?.x || 0,
                                    top: user.cursorPosition?.y || 0,
                                    transform: 'translate(-50%, 250%)',
                                }}
                            >
                                {user.nickName}
                            </li>
                            <img src="https://avatars.githubusercontent.com/u/120030275?v=4" alt="test" style={{
                                position: 'absolute',
                                left: user.cursorPosition?.x || 0,
                                top: user.cursorPosition?.y || 0,
                                transform: 'translate(-50%, -50%)',
                                width: "80px",
                                height: "80px"
                            }} />
                        </div>
                    ))}
                </ul>
            </main>
        </div>
    );
}

export default Home;
