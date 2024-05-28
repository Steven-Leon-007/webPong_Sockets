import React, { useEffect, useRef, useState } from "react";
import "./Disc.scss"
import useDiscMovement from "../../../hooks/useUpdateDisc";
import DiscImage from '../../../assets/disc.png';

const Disc = ({ absoluteScreen, boardRef }) => {
    const discRef = useRef(null);
  
    useDiscMovement(absoluteScreen, discRef, boardRef);

    return (
        <img id="disc" src={DiscImage} ref={discRef} />
    );
};

export default Disc;