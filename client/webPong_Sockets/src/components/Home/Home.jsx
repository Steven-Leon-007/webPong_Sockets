import React, { useEffect, useRef, useState } from 'react';
import './Home.scss';
import Header from './Header/Header';
import HomeFunctions from './HomeFunctions';
import socketManager from '../../socketManager';

function Home() {
    const { users, absoluteScreen } = HomeFunctions();
    const userRefs = useRef([]);

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

    useEffect(() => {
        users.forEach((user, index) => {
            if (userRefs.current[index]) {
                userRefs.current[index].scrollLeft = user.board.position.x;
            }
        });

    }, [users]);


    return (
        <div style={{ display: 'flex', overflowX: 'hidden', width: '100%' }}>
            {users.map((user, index) => (
                <div
                    ref={el => userRefs.current[index] = el}
                    key={index}
                    style={{
                        flex: '0 0 auto',
                        width: user.board.width,
                        height: '100vh',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        position: 'relative'
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            left: user.cursorPosition?.x || 0,
                            top: user.cursorPosition?.y || 0,
                        }}
                    >
                        <p
                            style={{
                                transform: 'translate(-50%, 350%)',
                            }}
                        >
                            {user.nickName}
                        </p>
                        <img
                            src="https://avatars.githubusercontent.com/u/120030275?v=4"
                            alt="test"
                            style={{
                                transform: 'translate(-50%, -50%)',
                                width: "80px",
                                height: "80px"
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;
