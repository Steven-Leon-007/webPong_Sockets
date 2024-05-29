import React, { useRef } from 'react';
import './Home.scss';
import Header from './Header/Header';
import HomeFunctions from './HomeFunctions';
import Disc from './Disc/Disc';

import playerFieldImg from '../../assets/player_field.png'
import viewerFieldImg from '../../assets/viewer_field.png';
import bluePalleteImg from '../../assets/blue_pallete.png';
import orangePalleteImg from '../../assets/orange_pallete.png';

function Home({ selectedUserId }) {
    const { useUpdateActions, useMouseMove, useScrollUsers, useScrollIntoView } = HomeFunctions();
    const userRefs = useRef([]);
    const boardRef = useRef(null);
    const { users, absoluteScreen } = useUpdateActions();


    useMouseMove();
    useScrollUsers(users, userRefs, absoluteScreen);
    useScrollIntoView(selectedUserId, users, userRefs, boardRef);

    return (
        <div style={{ width: absoluteScreen.width }} className='home' ref={boardRef}>
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
                    {user.type === "player" ? <div
                        style={{
                            left: user.cursorPosition?.x || 0,
                            top: user.cursorPosition?.y || 0,
                        }} className='palette-container'>
                        <p className='nick-name-label'>
                            {user.nickName}
                        </p>
                        {user.type !== "viewer" && (
                            <img
                                src={user == users[0] ? bluePalleteImg : (user == users[users.length - 1] ? orangePalleteImg : null)}
                                alt={user.nickName}
                                className='user-palette'
                            />
                        )}
                    </div>
                        : null}
                    <Disc user={user} />
                </div>
            ))}
        </div>
    );
}

export default Home;
