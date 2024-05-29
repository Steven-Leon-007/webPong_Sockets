import React, { useRef, useState, useEffect } from 'react';
import './Home.scss';
import HomeFunctions from './HomeFunctions';
import Disc from './Disc/Disc';

import playerFieldImg from '../../assets/player_field.png';
import viewerFieldImg from '../../assets/viewer_field.png';
import bluePaletteImg from '../../assets/blue_pallete.png';
import orangePaletteImg from '../../assets/orange_pallete.png';
import socketManager from '../../socketManager';

function Home({ selectedUserId }) {
    const { useUpdateActions, useMouseMove, useScrollUsers, useScrollIntoView } = HomeFunctions();
    const userRefs = useRef([]);
    const boardRef = useRef(null);
    const [users, setUsers] = useState([]);
    const [absoluteScreen, setAbsoluteScreen] = useState({});
    const [discPosition, setDiscPosition] = useState({ posX: 0, posY: 0 });

    console.log(users);

    useEffect(() => {

        socketManager.onUpdateUsers((usersList) => {
            setUsers(usersList);
        });

        socketManager.onUpdateDiscCallback((discPosition) => {
            setDiscPosition(discPosition);
        });

        socketManager.onUpdateAbsoluteScreen((screen) => {
            setAbsoluteScreen(screen);
        });

    }, []);

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
                        width: "100%",
                        backgroundColor: user.board.background,
                        backgroundImage: (user.type === "player-left" || user.type === "player-right")
                            ? `url(${playerFieldImg})`
                            : `url(${viewerFieldImg})`
                    }}
                    className='user-screen'
                >
                    {(user.type === "player-left" || user.type === "player-right") ? (
                        <div
                            style={{
                                left: user.cursorPosition?.x || 30,
                                top: user.cursorPosition?.y || 30,
                            }} className='palette-container'>
                            <p className='nick-name-label'>
                                {user.nickName}
                            </p>
                            {user.type !== "viewer" && (
                                <img
                                    src={user.type === "player-left"
                                        ? bluePaletteImg
                                        : (user.type === "player-right" ? orangePaletteImg : null)}
                                    alt={user.nickName}
                                    className='user-palette'
                                />
                            )}
                        </div>
                    ) : null}
                </div>
            ))}
            <Disc discPosition={discPosition} />
        </div>
    );
}

export default Home;
