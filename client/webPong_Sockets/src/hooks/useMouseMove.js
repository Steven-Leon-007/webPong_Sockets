import { useEffect } from "react";
import socketManager from "../socketManager";

const useMouseMove = () => {
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
};

export default useMouseMove;