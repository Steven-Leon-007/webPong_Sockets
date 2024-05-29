import React, { useEffect, useRef } from "react";
import "./Disc.scss";
import DiscImage from '../../../assets/disc.png';

const Disc = ({ discPosition }) => {
    const discRef = useRef(null);
    useEffect(() => {
        if (discRef.current && discPosition) {
            discRef.current.style.left = `${discPosition.posX}px`;
            discRef.current.style.top = `${discPosition.posY}px`;
        }
    }, [discPosition]);

    return (
        <img id="disc" src={DiscImage} ref={discRef} className="disc" style={{ position: 'absolute' }} />
    );
};

export default Disc;
