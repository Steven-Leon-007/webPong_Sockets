import React, { useEffect, useRef, useState } from 'react';
import './Home.scss';
import Header from './Header/Header';
import HomeFunctions from './HomeFunctions';

import playerFieldImg from '../../assets/player_field.png'
import viewerFieldImg from '../../assets/viewer_field.png';
import bluePalleteImg from '../../assets/blue_pallete.png';
import orangePalleteImg from '../../assets/orange_pallete.png';

function Home({ selectedUserId }) {
    const { useUpdateActions, useMouseMove, useScrollUsers, useScrollIntoView } = HomeFunctions();
    const userRefs = useRef([]);
    const { users, absoluteScreen } = useUpdateActions();
    let field;

    if (users.map(user => user.type) == "player") {
        field = `url(${playerFieldImg})`;
    } else {
        field = `url(${viewerFieldImg})`;
    }

    useMouseMove();
    useScrollUsers(users, userRefs, absoluteScreen);
    useScrollIntoView(selectedUserId, users, userRefs);

    return (        
        <div style={{ width: absoluteScreen.width }} className='home'>
            {users.map((user, index) => (

                <div
                    ref={el => userRefs.current[index] = el}
                    key={index}
                    id={user.nickName}
                    style={{
                        width: user.board.width,
                        height: user.board.height,
                        backgroundColor: user.board.background,
                        backgroundImage: user.type === "player" ? `url(${playerFieldImg})` : `url(${viewerFieldImg})`
                    }}
                    className='user-screen'
                >
                    <div
                        style={{
                            left: user.cursorPosition?.x || 0,
                            top: user.cursorPosition?.y || 0,
                        }}
                    >
                        <p className='nick-name-label'>
                            {user.nickName}
                        </p>
                        {user.type !== "viewer" && (
                        <img
                            src={index % 2 === 0 ? orangePalleteImg : bluePalleteImg}
                            alt={user.nickName}
                            className='user-palette'
                        />
                    )}
                    </div>

                </div>
            ))}
            {/* <div className='disc'>
                <img src="../../assets/disc.png" alt="disc" />
            </div> */}        
        </div>
    );
}

export default Home;
