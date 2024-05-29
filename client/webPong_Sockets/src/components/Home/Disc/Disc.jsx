import React, { useEffect, useRef } from "react";
import "./Disc.scss";
import SVGDisc from "./SVGDisc";

const Disc = ({ discPosition, discInfo }) => {
    if(!discInfo){
        return;
    }
    const { color, visible } = discInfo;
    const discRef = useRef(null);
    useEffect(() => {
        if (discRef.current && discPosition) {
            discRef.current.style.left = `${discPosition.posX}px`;
            discRef.current.style.top = `${discPosition.posY}px`;
        }
    }, [discPosition]);

    return (
        <SVGDisc color={color} visible={visible} reference={discRef} />
    );
};

export default Disc;
