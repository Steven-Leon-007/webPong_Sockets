import { useEffect } from "react";

const useScrollUsers = (users, userRefs, absoluteScreen) => {
    useEffect(() => {
        users.forEach((user, index) => {
            if (userRefs.current[index]) {
                userRefs.current[index].scrollLeft = user.board.position.x;
            }
        });
    }, [users, userRefs, absoluteScreen]);
};

export default useScrollUsers;