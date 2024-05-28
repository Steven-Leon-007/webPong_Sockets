import React, { useEffect, useRef, useState } from "react";
import "./Disc.scss"
import DiscImage from '../../../assets/disc.png';

const Disc = ({ absoluteScreen, boardRef, user }) => {
    const discRef = useRef(null);

    if (!user.discRelativePos) return;

    return (
        <img id="disc" src={DiscImage} ref={discRef}
            style={{ left: user.discRelativePos.posX, top: user.discRelativePos.posY }}
        />
    );
};

export default Disc;