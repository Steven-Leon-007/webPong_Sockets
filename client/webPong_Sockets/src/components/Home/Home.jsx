import React, { useEffect, useRef, useState } from 'react';
import './Home.scss';
import Header from './Header/Header';
import HomeFunctions from './HomeFunctions';

function Home({ selectedUserId }) {
    const { useUpdateActions, useMouseMove, useScrollUsers, useScrollIntoView } = HomeFunctions();
    const userRefs = useRef([]);
    const { users, absoluteScreen } = useUpdateActions();

    useMouseMove();
    useScrollUsers(users, userRefs, absoluteScreen);
    useScrollIntoView(selectedUserId, users, userRefs);

    console.log(users);

    return (
        <div style={{ display: 'flex', overflowX: 'hidden', width: '100%' }} className='home'>
            {users.map((user, index) => (
                <div
                    ref={el => userRefs.current[index] = el}
                    key={index}
                    id={user.nickName}
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
